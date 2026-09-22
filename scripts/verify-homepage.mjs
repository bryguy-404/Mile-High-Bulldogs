import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

// Optional URL verifies the deployed preview; otherwise serve the built dist.
// CMS_BASELINE_DIR adds an approved-build visual comparison, outside Git.
const servers = [];
async function serve(directory) {
  const root = resolve(directory);
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.pdf': 'application/pdf', '.ico': 'image/x-icon' };
  const server = createServer(async (req, res) => {
    try {
      const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = resolve(root, `.${path === '/' ? '/index.html' : path}`);
      assert.ok(file.startsWith(root + sep));
      const info = await stat(file);
      assert.ok(info.isFile());
      res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
      res.end(await readFile(file));
    } catch { res.writeHead(404); res.end('Not found'); }
  });
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  servers.push(server);
  return `http://127.0.0.1:${server.address().port}`;
}
const output = '.loop/cms-verification';
mkdirSync(output, { recursive: true });
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const errors = [];
try {
  const url = process.argv[2] || await serve('dist');
  const baseline = process.env.CMS_BASELINE_DIR ? await serve(process.env.CMS_BASELINE_DIR) : null;
  for (const [name, width, height] of [['desktop',1440,1000],['mobile',390,844],['tablet',768,1024]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    async function capture(target, suffix) {
      const response = await page.goto(target, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200);
      await page.evaluate(async () => {
        document.querySelectorAll('video').forEach(video => video.pause());
        await document.fonts.ready;
        document.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
        await Promise.all([...document.images].map(img => img.decode()));
      });
      assert.equal(await page.locator('h1').getAttribute('aria-label'), 'Colorado Bulldogs. Game On.');
      assert.equal(await page.locator('#gallery figure').count(), 15);
      assert.equal(await page.locator('#event figure img').getAttribute('src'), '/uploads/event-avalanche-red-wings-fans.jpg');
      assert.ok(!(await page.locator('body').innerText()).includes('See you at the game!'));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.ok(await page.evaluate(() => [...document.images].every(img => img.complete && img.naturalWidth > 0)));
      const boxes = await page.evaluate(() => Object.fromEntries(['top','event','story','origin','gallery','social'].map(id => {
        const rect = document.getElementById(id).getBoundingClientRect();
        return [id, {x:rect.x,y:rect.y,width:rect.width,height:rect.height}];
      })));
      await page.screenshot({ path: `${output}/${name}-${suffix}.png`, fullPage: true, animations: 'disabled' });
      if (suffix === 'current') {
        await page.locator('#event').screenshot({path: `${output}/${name}-event.png`, animations: 'disabled'});
        await page.evaluate(() => scrollTo(0, 0));
      }
      return boxes;
    }
    const current = await capture(url, 'current');
    if (width < 1024) {
      const menu = page.locator('#menu-button');
      await menu.click(); assert.equal(await menu.getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape'); assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      await menu.click(); await page.locator('#mobile-menu a[href="#gallery"]').click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      assert.ok(page.url().endsWith('#gallery'));
    } else {
      await page.locator('nav[aria-label="Primary navigation"] a[href="#event"]').click();
      assert.ok(page.url().endsWith('#event'));
    }
    const event = JSON.parse(readFileSync('src/content/featured-event.json'));
    const shared = JSON.parse(readFileSync('src/content/shared.json'));
    assert.equal(await page.locator(`a[href="${event.ticketUrl}"]`).count(), 5);
    assert.equal(await page.locator(`a[href="${shared.facebookUrl}"]`).count(), 3);
    assert.equal(await page.locator(`a[href="${shared.instagramUrl}"]`).count(), 2);
    assert.equal((await page.request.get(new URL(event.flyerUrl, url).href)).status(), 200);
    assert.equal(await page.locator('video source').getAttribute('src'), '/media/mile-high-bulldogs-hero-loop.mp4');
    assert.equal((await page.request.get(new URL('/media/mile-high-bulldogs-hero-loop.mp4', url).href)).status(), 200);
    if (baseline) {
      const before = await capture(baseline, 'baseline');
      assert.deepEqual(current, before, `${name}: section geometry stays unchanged`);
      const a = PNG.sync.read(readFileSync(`${output}/${name}-baseline.png`));
      const b = PNG.sync.read(readFileSync(`${output}/${name}-current.png`));
      assert.equal(a.width,b.width); assert.equal(a.height,b.height);
      const diff = new PNG({width:a.width,height:a.height});
      const changed = pixelmatch(a.data,b.data,diff.data,a.width,a.height,{threshold:0.1});
      writeFileSync(`${output}/${name}-diff.png`,PNG.sync.write(diff));
      const percent = changed/(a.width*a.height)*100;
      assert.ok(percent < 0.1, `${name}: visual change ${percent.toFixed(4)}% exceeds tolerance`);
      console.log(`PASS ${name}: identical section geometry; ${percent.toFixed(4)}% visual change`);
    } else console.log(`PASS ${name}: images, links, media, navigation, and no overflow`);
    await context.close();
  }
  assert.deepEqual(errors, [], 'No page, console, or HTTP errors');
  console.log('PASS: no page, console, or HTTP errors');
} finally {
  await browser.close();
  for (const server of servers) server.closeAllConnections();
  await Promise.all(servers.map(server => new Promise(done => server.close(done))));
}
