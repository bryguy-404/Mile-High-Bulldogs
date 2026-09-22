import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, copyFileSync, unlinkSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { parse } from 'yaml';

// Run in an isolated checkout: these integration checks temporarily edit CMS
// content, build it, and always restore the original files in finally.
const config = parse(readFileSync('.pages.yml', 'utf8'));
assert.deepEqual(config.media, {
  input: 'public/uploads', output: '/uploads',
  extensions: ['jpg', 'jpeg', 'png', 'webp', 'avif'], rename: 'random',
});
assert.equal(config.content.length, 7);
const originals = new Map(config.content.map(entry => [entry.path, readFileSync(entry.path, 'utf8')]));
const get = name => JSON.parse(originals.get(`src/content/${name}.json`));
const save = (name, data) => writeFileSync(`src/content/${name}.json`, JSON.stringify(data, null, 2) + '\n');
const reset = () => { for (const [path, data] of originals) writeFileSync(path, data); };
const encode = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
function build(success = true) {
  const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], { encoding: 'utf8' });
  assert.equal(result.status === 0, success, result.stdout + result.stderr);
  return success ? readFileSync('dist/index.html', 'utf8') : result.stdout + result.stderr;
}
function fieldsMatch(fields, data, path) {
  assert.deepEqual(Object.keys(data).sort(), fields.map(field => field.name).sort(), `${path}: every saved key must survive a CMS save`);
  for (const field of fields) {
    assert.ok(!field.list && !field.hidden && !field.readonly, `${path}.${field.name}: fixed editable slot`);
    assert.equal(field.required, true);
    assert.ok(['object', 'text', 'string', 'date', 'image'].includes(field.type));
    if (field.type === 'object') fieldsMatch(field.fields, data[field.name], `${path}.${field.name}`);
    else {
      assert.equal(typeof data[field.name], 'string');
      if (field.pattern) assert.match(data[field.name], new RegExp(field.pattern.regex));
      if (field.type === 'image') assert.ok(existsSync(`public${data[field.name]}`));
    }
  }
}
for (const entry of config.content) {
  assert.equal(entry.type, 'file');
  assert.deepEqual(entry.operations, { create: false, rename: false, delete: false });
  fieldsMatch(entry.fields, JSON.parse(originals.get(entry.path)), entry.name);
}
console.log('PASS: all editor fields match saved content; no page/list/layout operations');

const upload = 'public/uploads/cms-verification-photo.jpg';
assert.ok(!existsSync(upload), 'Test fixture must not replace a real upload');
const expected = [];
let serial = 0;
function editEveryField(fields, data, path) {
  for (const field of fields) {
    const key = `${path}.${field.name}`;
    if (field.type === 'object') { editEveryField(field.fields, data[field.name], key); continue; }
    if (field.type === 'date') { data[field.name] = field.name === 'date' ? '2028-02-29' : '2028-02-01'; continue; }
    if (field.type === 'image') { data[field.name] = '/uploads/cms-verification-photo.jpg'; continue; }
    if (field.name === 'email') data[field.name] = 'cms-check@example.com';
    else if (field.name === 'phone') data[field.name] = '+44 20 7946 0958';
    else if (/Url$/.test(field.name) || field.name === 'href') data[field.name] = `https://example.com/cms-check-${++serial}`;
    else data[field.name] = `CMS field ${++serial} <safe> & editable`;
    expected.push([key, data[field.name]]);
  }
}
try {
  copyFileSync('public/uploads/event-avalanche-red-wings-fans.jpg', upload);
  for (const entry of config.content) {
    const data = JSON.parse(originals.get(entry.path));
    editEveryField(entry.fields, data, entry.name);
    save(entry.name, data);
  }
  const html = build();
  for (const [key, value] of expected) assert.ok((html.includes(encode(value)) || html.includes(value.replaceAll('&', '&amp;').replaceAll('"', '&quot;'))), `${key} must affect rendered HTML`);
  assert.ok(!html.includes(' <safe> & editable</'), 'Text edits must remain escaped, not executable markup');
  assert.ok(html.includes('Tuesday, February 29, 2028'));
  assert.ok(html.includes('Feb 29, 2028'));
  assert.ok(html.includes('02.29.28'));
  assert.ok(html.includes('February 1, 2028'));
  assert.ok(html.includes('tel:+442079460958'));
  assert.equal(html.split(`href="${getEditedTicket()}"`).length - 1, 5, 'All five ticket links stay synchronized');
  assert.ok(html.includes('cms-verification-photo'), 'Uploaded images reach the built page');
  assert.ok(html.includes('srcset='), 'Responsive image optimization is retained');
  console.log(`PASS: all ${expected.length} text/link fields, dates, contact links, and uploaded image slots reach HTML`);
  const firstTransform = html.match(/src="([^"]*cms-verification-photo[^"?]*\.webp)"/)[1];
  copyFileSync('public/uploads/bulldogs-outdoor-group.jpg', upload);
  const replaced = build();
  assert.ok(!replaced.includes(firstTransform), 'Overwriting the same upload path must invalidate optimized images');
  console.log('PASS: same-path image replacement invalidates the transformation cache');
  reset();
  const cases = [
    ['featured-event', d => { d.date = '2026-02-30'; }, 'invalid event date'],
    ['featured-event', d => { d.ticketDeadline = '2026-13-01'; }, 'invalid deadline'],
    ['featured-event', d => { d.ticketUrl = 'javascript:alert(1)'; }, 'unsafe ticket URL'],
    ['featured-event', d => { d.contact.email = 'not an email'; }, 'invalid contact email'],
    ['featured-event', d => { d.contact.phone = 'Call us'; }, 'invalid phone'],
    ['featured-event', d => { d.flyerUrl = '/downloads/missing.pdf'; }, 'missing flyer'],
    ['hero', d => { d.heading.line1 = ' '; }, 'empty heading'],
    ['hero', d => { d.poster = '/uploads/../media/mile-high-bulldogs-hype-reel-poster.jpg'; }, 'image path traversal'],
    ['gallery', d => { d.featured.photo1.image = '/uploads/missing.jpg'; }, 'missing photo'],
    ['gallery', d => { delete d.moments.photo11; }, 'deleted gallery slot'],
    ['shared', d => { d.navigation.story.href = '#missing'; }, 'broken section anchor'],
    ['shared', d => { d.facebookUrl = 'data:text/html,bad'; }, 'unsafe social URL'],
  ];
  for (const [name, edit, label] of cases) {
    const data = get(name); edit(data); save(name, data);
    build(false); reset(); console.log(`PASS: build rejects ${label}`);
  }
} finally {
  reset();
  if (existsSync(upload)) unlinkSync(upload);
}
const final = build();
assert.ok(!final.includes('CMS field') && !final.includes('See you at the game!') && !final.includes('mud13q7t'));
console.log('PASS: approved content restored and production build passes');
function getEditedTicket() { return JSON.parse(readFileSync('src/content/featured-event.json', 'utf8')).ticketUrl; }
