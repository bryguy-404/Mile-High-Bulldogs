# Mile High Bulldogs — Design Blueprint

## Overall direction & vibe
A loud, brutalist game-day poster translated to the web: zero border-radius, thick black rules, slab-color buttons, and huge condensed uppercase type over a warm cream base hit with crimson, gold, and near-black. It speaks to Ferris State alumni, transplants, families, and fans in Colorado, blending collegiate merch-table energy with mountain motifs, ticket-stub details, and grain texture. The personality is blunt, high-energy, and proudly analog — everything feels stamped, clipped, or taped on.

## Section-by-section breakdown

### Accessibility shell
- A visually hidden skip-to-content link (sr-only, revealed on focus) precedes everything and targets the main landmark.
- Global focus-visible treatment: 3px solid #FFD043 outline with 3px offset. The html element uses smooth scroll behavior.

### Header (sticky)
- Sticky top-0, z-50, cream #F7F5EF background with a 4px solid #111 bottom border. Inner bar: max-w-7xl, h-20 (5rem), px-4 sm:px-6, flex with space-between.
- Logo sits inside a white chip (bg-white, px-2 py-1); logo image is h-11 with max-w-[170px], object-contain. The logo asset is a client-supplied placeholder.
- Desktop nav (md+): links Event, About, Gallery, Hype Reel — text-xs, font-extrabold, uppercase, tracking .16em, hover text turns crimson #BA0C2F. Final item is a Get Tickets CTA rendered as a solid crimson slab (px-5 py-3, white text) that darkens to #65051A on hover. Square corners throughout.
- Mobile (below md): an h-11 w-11 hamburger button with a 2px #111 border containing three 2px bars. It toggles a dropdown panel: gold #FFD043 background, 2px #111 top border, px-4 py-5, stacked (grid gap-3) extrabold uppercase tracking-wider links, including an extra Facebook + Instagram link. JS syncs aria-expanded, closes on link click and on Escape.

### Hero
- Full-bleed near-black #111 section, white text, relative + isolate, overflow hidden.
- Two decorative layers: (1) a grain overlay across the section — radial-gradient white dots at low alpha (#fff2 1px on a 5px x 5px tile) at 40 percent opacity; (2) an aria-hidden SVG mountain skyline pinned to the bottom edge, full width and 12rem tall (viewBox 0 0 1200 220, preserveAspectRatio none): a jagged crimson #BA0C2F filled range plus a separate 3px gold #FFD043 stroked ridge polyline floating above it.
- Content grid: max-w-7xl, px-4 sm:px-6, py-16 sm:py-24, gap-12, lg:grid-cols-[1.1fr_.9fr] items-center.
- Left column: eyebrow badge (inline-flex, 2px gold border, gold text, text-xs font-extrabold uppercase tracking .2em) reading Ferris alumni + fans · Colorado. H1 in the display face, three stacked lines — Colorado / Bulldogs. / Game On. — uppercase, font-black, fluid size text-[19vw] then sm:text-8xl then lg:text-[8.6rem], leading .76, tracking -0.035em; the word Bulldogs. is crimson. Supporting paragraph: max-w-xl, font-semibold, leading-relaxed, white at 75 percent, text-base sm:text-lg. CTA row (stacked on mobile, row from sm): primary is a solid gold slab (px-7 py-4, text-sm font-black uppercase tracking .16em, #111 text, hover bg white); secondary is a 2px white outline slab that inverts to white bg + #111 text on hover.
- Right column: the ticket-stub card, w-full max-w-md, centered. Outer: crimson #BA0C2F, p-2, corners clipped with clip-path polygon(0 0, 94% 0, 100% 10%, 100% 100%, 6% 100%, 0 90%), plus a hard offset shadow 18px 18px 0 #FFD043. Inner frame: 2px border white at 60 percent, p-7 sm:p-10. Contents top to bottom: gold eyebrow Featured event (text-xs, tracking .25em); giant date 11.07 in display type at 6.5rem, leading .7, tracking-tighter, with the period rendered gold; 2026 below in display text-5xl; a 4px-tall solid white divider with my-7; matchup lines Avalanche and Red Wings in display text-4xl uppercase, separated by a small gold vs. label (text-sm, font-black, tracking .3em).

### Marquee ticker band
- Full-width gold #FFD043 strip, py-5, overflow hidden, with a perforated ticket edge: repeating black dots (radial-gradient circle #111 2px fading by 3px, background-size 14px 14px, background-position 0 -7px) so half-dot notches bite into the top and bottom edges.
- Single centered line of display type, whitespace-nowrap: 11.07.26 / Bring the Bulldog Energy — text-5xl sm:text-7xl, font-black, uppercase, tracking-tight.

### Featured event
- White background, px-4 py-20 sm:px-6. Container max-w-6xl, grid gap-10, lg:grid-cols-[.75fr_1.25fr] with columns aligned to the bottom edge (items-end).
- Left column: crimson eyebrow First on the calendar (text-xs font-black uppercase tracking .25em), then a stacked display date NOV 7 / 2026 at text-7xl, leading-none, in deep maroon #65051A with the year in crimson.
- Right column: near-black #111 panel with an 8px solid gold left border, p-7 sm:p-10, white text. Eyebrow at white 55 percent (tracking .2em); H2 in display type, text-5xl sm:text-6xl, uppercase — Avalanche vs. Red Wings with vs. in gold; paragraph max-w-2xl at white 70 percent. CTA row: solid crimson Get Tickets slab (px-7 py-4, text-sm font-black uppercase tracking .16em) whose hover flips to gold bg with #111 text, next to a text-xs white 50 percent note (max-w-sm) stating that ticket URL, venue, time, and pricing will be added when supplied. Only the matchup and date are confirmed content — keep the placeholder note.

### About the club
- Cream #F7F5EF, px-4 py-20, container max-w-6xl.
- Intro: lg 2-column grid, gap-10. Left: crimson eyebrow About the club + display headline Ferris pride, raised higher. across two lines, text-5xl sm:text-7xl, leading .9. Right: text-lg leading-relaxed body at 70 percent black describing the club (Colorado-based Ferris alumni, transplants, families, and fans connected through school pride, social community, and game-day events), ending with a font-extrabold full-black rally line.
- Audience cards: mt-12, grid gap-3, sm:grid-cols-3. Each card: 2px #111 border, p-5, square corners; display text-3xl uppercase label (Alumni / Transplants / Families + Fans) with a text-sm caption at 60 percent black.
- Testimonial slab: mt-3, full-width crimson bar, p-7, white text; on sm it becomes a flex row with space-between and gap-8. Left: placeholder quote in display text-3xl font-bold uppercase (client must supply an approved member quote). Right: tiny gold label — 10px, bold, uppercase, tracking .2em — reading Client-supplied testimonial.

### Gallery — The Bulldog Roll
- Deep maroon #65051A section, white text, px-4 py-20, container max-w-7xl.
- Header row (mb-9, stacks on mobile, row with bottom alignment on sm): gold eyebrow Real people only (tracking .25em) + display headline The Bulldog Roll (text-5xl sm:text-7xl); opposite it a max-w-md, text-sm note at white 60 percent stating the final gallery must use client-supplied or approved real alumni photography, never stock.
- Grid: gap-3, md:grid-cols-12. Four placeholder tiles spanning 7, 5, 5, 7 columns with min-heights 18rem, 18rem, 15rem, 15rem. Each tile uses the photo placeholder treatment (see Unique visual treatments), lays out as flex items-end with p-6, and carries role=img plus a descriptive aria-label. Captions: text-xs font-black uppercase tracking .2em, first line Photo 01–04 in gold, second line the description in white.

### Hype reel
- Near-black #111 section, px-4 py-20, container max-w-6xl.
- One large video placeholder panel: crimson background, 4px gold border, min-height 390px, grain overlay, relative, overflow hidden, centered content (grid place-items-center), p-8, text-center; role=img with an aria-label describing the pending video.
- A full-width black banner strip is absolutely positioned near the top (inset-x-0, top-8) and rotated -3 degrees, reading Hype Reel · Video Placeholder in text-sm font-black uppercase tracking .35em.
- Centered stack: a 6rem square play glyph (▶ at text-4xl) inside a 4px white border; display headline Turn It Up. at text-5xl sm:text-7xl; text-sm note at white 70 percent that approved alumni footage and the final video asset are to be supplied.

### Social CTA
- Crimson #BA0C2F band, px-4 py-16, container max-w-6xl; column layout with gap-8 that becomes an lg flex row with items-center and space-between.
- Left: gold eyebrow Keep the rally going (text-xs, bold, tracking .25em) + display headline Find your Bulldogs. at text-5xl sm:text-6xl.
- Right: three slab buttons (stack on mobile, row from sm, gap-3), all px-6 py-4, text-sm, font-black, uppercase, tracking-wider: white solid Facebook Group ↗ with #111 text; 2px white outline Instagram ↗; gold solid Get Tickets with #111 text.
- Beneath the row: text-xs note at white 55 percent that Facebook and Instagram URLs/handles are link placeholders pending client supply.

### Footer
- Near-black #111, px-4 py-9, text-xs at white 55 percent. Container max-w-7xl: column with gap-2 on mobile, row with space-between from sm. Left: © 2026 Mile High Bulldogs. Right: A Colorado community for Ferris State alumni and fans.

### Mobile sticky ticket bar
- Visible only below md: fixed, inset-x-3 bottom-3, z-50, solid gold slab, px-5 py-4, text-sm font-black uppercase tracking .18em, #111 text, shadow-2xl, centered label Get Tickets · Nov 7, 2026, linking to the featured event section. The body carries pb-16 below md (pb-0 at md+) so content is never hidden behind it.

## Typography
- Display/headings: Barlow Condensed (Google Fonts, weights 700, 800, 900), applied to every headline, big numeral, marquee line, card label, and quote. Always uppercase, usually font-black, with severely tight leading (.7 to .9 — the hero uses .76, big H2s use .9 or leading-none) and negative tracking at the largest sizes (hero -0.035em; jumbo numerals tracking-tighter; marquee tracking-tight).
- Body/UI: Inter (Google Fonts, weights 400, 600, 700, 800) as the global body font. Body copy sits at text-base to text-lg with leading-relaxed; the hero paragraph is font-semibold; muted copy uses alpha-reduced ink or white rather than separate gray hexes.
- Label system: eyebrows and micro-labels are text-xs (occasionally 10px), font-extrabold or font-black, uppercase, with wide letter-spacing from .16em to .35em (nav .16em, eyebrows .2em–.25em, the vs. divider .3em, the reel banner .35em).
- Buttons: text-sm, font-black, uppercase, tracking .16em–.18em (or tracking-wider), generous slab padding (px-5/6/7, py-3/4), square corners.
- Scale highlights: section H2s run text-5xl to sm:text-7xl; the hero H1 is fluid — text-[19vw] on mobile, text-8xl at sm, 8.6rem at lg; the ticket-stub date hits 6.5rem.
- Load via Google Fonts with preconnect and display=swap: Barlow Condensed 700/800/900 + Inter 400/600/700/800.

## Color palette
- #BA0C2F — Primary crimson (Ferris crimson): brand CTAs, hero highlight word, ticket-stub card, testimonial slab, social band, reel panel, nav hover color, mountain fill.
- #65051A — Secondary deep maroon: gallery section background, big event date, photo-placeholder base color, hover state for crimson buttons.
- #FFD043 — Accent gold: marquee band, mobile menu panel, primary hero CTA, mobile sticky bar, hard offset shadow, 4px/8px accent borders, eyebrows and highlights on dark surfaces, focus outline.
- #F7F5EF — Background cream: page background, header, about section.
- #111111 — Foreground ink/near-black: all light-surface text, dark section backgrounds (hero, event panel, reel, footer), 2px–4px structural borders, perforation dots, rotated banner.
- #FFFFFF — Surface white: event section background, logo chip, light buttons, ticket-stub inner frame (at 60 percent alpha), hero card divider.
- Muted tones are produced with alpha, not separate hexes: ink at /70 and /60 over cream (about #6D6C6A as a solid equivalent) and white at /75, /70, /60, /55, /50 over dark surfaces.

## Spacing & layout
- Containers: max-w-7xl (80rem) for header, hero, gallery, and footer; max-w-6xl (72rem) for event, about, reel, and social. Horizontal padding px-4, stepping to sm:px-6.
- Vertical rhythm: standard sections use py-20 (5rem); hero py-16 to sm:py-24; social py-16; marquee py-5; footer py-9. The header bar is a fixed 5rem tall.
- Grids: hero lg:grid-cols-[1.1fr_.9fr]; event lg:grid-cols-[.75fr_1.25fr] with items-end; about is an lg 2-col intro plus an sm 3-col card row; gallery is md 12-col with 7/5/5/7 spans. Major column gaps are gap-10 to gap-12; tile/card/button gaps are gap-3.
- Breakpoints (Tailwind defaults): sm 640px — padding bump, CTA stacks become rows, 3-col about cards, type-size bumps; md 768px — desktop nav replaces the hamburger, mobile menu and sticky bottom bar disappear, gallery becomes 12-col, body bottom padding drops; lg 1024px — hero, event, and about go two-column and the social band becomes a row.
- Depth model: almost no soft shadows — structure comes from heavy borders (2px on cards/buttons/frames, 4px header rule and reel frame, 8px event accent border) with two exceptions: the hard 18px gold offset shadow on the ticket stub and shadow-2xl under the mobile bar.
- Border-radius: zero everywhere. Every button, card, image tile, and panel is hard-cornered.

## Unique visual treatments
- Ticket-stub clip: clip-path polygon(0 0, 94% 0, 100% 10%, 100% 100%, 6% 100%, 0 90%) slices the top-right and bottom-left corners of the hero card; combine with p-2 crimson padding, an inner 2px white/60 frame, and the hard shadow 18px 18px 0 #FFD043.
- Grain texture: radial-gradient(#fff2 1px, transparent 1px) on a 5px x 5px tile, applied as an overlay (about 40 percent opacity in the hero, direct on the reel panel) to give dark and crimson surfaces a printed feel.
- Perforated ticket edge: radial-gradient(circle, #111 2px, transparent 3px), background-size 14px 14px, background-position 0 -7px on the gold marquee so half dots notch both edges.
- Photo placeholder recipe: background-color #65051A layered with linear-gradient(135deg, #BA0C2Fdd, #1118) plus repeating-linear-gradient(-45deg, transparent 0 12px, #FFD04322 12px 14px) — a crimson-to-dark wash with faint diagonal gold pinstripes. Keep role=img aria-labels and bottom-left captions until real photography is supplied.
- Mountain skyline SVG: decorative full-width, 12rem-tall jagged range in crimson with a separate 3px gold stroked ridge line, pinned to the hero bottom, aria-hidden, preserveAspectRatio none so it stretches.
- Rotated banner: a -3 degree rotated, full-width black strip labels the video placeholder — tape/sticker energy.
- Hard offset shadow is the signature depth cue (18px 18px 0 #FFD043); never use soft blurred card shadows.
- Interaction and motion: smooth in-page scrolling; hovers are flat color swaps (crimson to maroon, gold to white, outline buttons invert); focus-visible shows a 3px gold outline offset 3px; the mobile menu is a show/hide with aria-expanded sync that closes on link tap and Escape.
- Placeholder discipline: client assets are explicitly stubbed — logo (data URL slot), ticket URL/venue/time/pricing, member testimonial, all gallery photos, hype-reel video, and social URLs. Reproduce the visible placeholder notes rather than inventing content.
