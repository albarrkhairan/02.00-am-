# 2:17 AM — how to run and update it (no coding needed)

Open `index.html` by double-clicking it. That’s the whole website.

## Easiest way: fill it in inside the website (no files)
Open the site, step into any room, press **[ ✎ add to this room ]** in the menu, fill the boxes, press **[ save ]**. It appears right away. Every room has its own form.
- Entries are saved **in your browser**. To make them show for everyone: press **[ download my-content.js ]**, put that file in the `content` folder (replace the old one), then upload the site again.
- **[ hide sample content ]** removes my example items from that room.
- To hide the ✎ button from visitors: open `editor.js` and change `SHOW_EDIT=true` to `SHOW_EDIT=false`.

## Change the whole website’s theme (skins)
In the menu press **[ ◐ skin ]** (or press the **t** key) and pick one: dial-up diary, win98 night shift, strawberry milk, matcha library, vhs rental, convenience store 3am, sepia library card. To make your own, open `content/skins.js`, copy one line, change the name and the #hex colors.

## Worlds (4 full visual themes)
Menu top right → **[ ◈ world ]** (or press **w**): the writer, the lost internet, the film, the bedroom, or "the usual". A world changes fonts, layout, textures, cards, buttons, motion and hover states for every room, but not the content. Colour skins (◐) are paused while a world is on. Visuals live in `themes.css` (one block per world), the switcher in `themes.js`.

## The other way: edit the files
## Where things live
- `content/` = **your stuff** (the only folder you need to edit)
- `style.css` = colors and looks, `app.js` = the engine (leave it alone)

Open any file in `content/` with Notepad / TextEdit / VS Code. Each item is one `{ ... },` block.

**Rules:** keep the "quotes" and the comma at the end of each block. Inside text, use ’ instead of ' or ". Save, then refresh the page.

## 1–7: add things
1. **Book:** open `books.js`, copy a `{title... },` line, paste below the last one, change the words.
2. **Film:** same in `films.js` (`score` = 0–100 for the brain chemistry bar).
3. **Character:** same in `characters.js` (`cat` is the group, e.g. "people i’d have coffee with").
4. **Quote:** same in `quotes.js`.
5. **Fictional life:** same in `fictionalLives.js` (`g1`/`g2` = background colors).
6. **Thought or question:** `thoughts.js` (thoughts at the top, questions below).
7. **Current obsession:** open `current.js` and change each `value`.

Add `hour:"02:47"` to anything to file it under that hour. Songs live in `songs.js`.

## 8. Add images
Put a picture in a new `images` folder. In `style.css`, find `.ph{` and add `background-image:url(images/jesse.jpg);background-size:cover;`.

## 9. Change colors
In `style.css`, find `ROOM COLORS`. Each room is one line, e.g. `--bg` = background, `--ink` = text, `--ac` = accent. Change the `#hex` codes.

## 10. Put it online (free)
Drag the whole folder onto **app.netlify.com/drop** and you get a link. (GitHub Pages works too.)

## Niches (new)
Menu → **[ ✦ niche ]** switches the whole site: name, door text, room names, sample content and skin. Included: 2am (original), watchlist (vhs rental), music (dial-up diary). Add your own by copying a block in `content/niches.js`. Entries you add with ✎ are saved separately per niche. Skins (◐) still work on top of any niche.

## Add photos
1. **Inside the website:** press ✎, pick *a photo for something already here* (or use the photo box when you add something new), choose a picture, save. Saved in your browser; **[ download my-content.js ]** keeps it.
2. **In the folder:** put pictures in `images/` named after the item, lowercase with dashes: `before-sunrise.jpg`, `jesse.jpg`, `celine.jpg`, `paris-1960s.jpg`. jpg, png and webp all work. No code.

Photos show on people (polaroids), brain chemistry cards, fictional lives (backgrounds), and in hours + the archive pull. Use pictures you own or have the right to use.

## Sound, share card, phone
- **Sound:** the floating disc at the bottom right opens rain / night hum / static / off, plus a volume slider. It starts off, so nobody gets surprised.
- **Theme & niche:** the two buttons at the top right.
- **Share card:** pull something from the archive → **[ save as image ]**. On a phone it opens the share sheet; on a computer it downloads a story-sized picture.
- **Phone:** the menu becomes a ☰ button, **✦ pull** sits where your thumb is, and you can swipe left/right to change rooms.

## Together mode (live collaboration)
- `node server.js` → open http://localhost:3000 (serves the site AND relays live events; no npm install needed).
- Everyone on that address sees each other's cursors, fireflies (tap empty space) and dragged windows in "currently".
- Without the server it still works between tabs of the same browser.
- Site hosted elsewhere? Host server.js on any Node host and put its address in content/collab.js.
- Turn it off anytime with the "● n awake here" button.

## Ambient sound
Sound button (bottom right): rain, night hum, static, ocean, wind, crackling fire, crickets, store hum. All made in the browser.

## Shared entries (Supabase)
Files: `supabase.js` (creates `window.sb`), `cloud.js` (anonymous login, display name, shared entries). Marked `CLOUD` in `editor.js` and `app.js`.
1. Open `supabase.js` and paste your **Publishable key** (Supabase → Project Settings → API Keys). Never the secret/service_role key.
2. Already have your own working `supabase.js`? Keep it, but it must NOT call `signInAnonymously()` on every page load (that creates a new user each visit and breaks ownership). `cloud.js` already reuses the saved session.
3. Deploy: push to GitHub → Vercel (no build settings needed, it's a static site).
- Name: asked on the door, right before [ enter ] (returning visitors see "welcome back." with their name filled in). Landing straight inside a room or trying to add while still "anonymous" opens a small popup instead.
- Every entry shows "✎ added by NAME" in every room. "currently" is one shared board: the newest update wins and says "last updated by NAME".
- If Supabase is unreachable the site works locally exactly as before.
- Photos stay on the device for now (Supabase Storage is a later step).
- Entries store the editor's own kind as `type` (books, films, songs, quotes, characters, fictionalLives, thoughts, feelings, hours, questions) and the niche in `data._niche`.

### Test that RLS blocks other people (browser console, as user B)
    await sb.from('entries').delete().eq('id', ID_OF_A_ROW_FROM_USER_A).select()   // → data: [] (nothing deleted)
    await sb.from('entries').insert({user_id:'SOMEONE-ELSE', type:'films', data:{}}) // → error (RLS)

### Optional hardening (Supabase → SQL editor)
    alter table public.entries add constraint entries_data_size check (pg_column_size(data) < 8000);
    alter table public.profiles add constraint display_name_len check (char_length(display_name) between 1 and 24);

## Examples vs. your stuff (new)
Every room now has an **examples** drawer at the bottom. The few sample items live there (dashed, with an *example* tag), apart from what you add. It's open while a room is empty and folds away once you add something; the choice is remembered per room. Samples are also trimmed to 2–3 per kind. To delete them for good: ✎ → **[ remove examples ]**. To edit them: `content/*.js`.

## Music: cassette player (new)
Every **song** card has a cassette with spinning reels, an equalizer, a seek bar and a play button; a small "now playing" pill at the bottom keeps the song going while you walk between rooms (ambient sound pauses by itself).
1. **Inside the website:** brain chemistry / records room → ✎ → *an mp3 for a song already here* (or the mp3 box when adding a song). Saved in that browser only (max 30 MB).
2. **For everyone:** put `holocene.mp3` (the song title, lowercase, dashes) in the `music/` folder. Or write `audio:"music/anything.mp3"` in `content/songs.js`.
Songs without an mp3 show a dimmed cassette and a **＋ mp3** button. Use music you own or have the right to share.

## Deleting (new)
Every card you added has a small **×** in its corner: tap it, then tap **sure?** within 3 seconds. The example cards have one too (it hides just that example; **[ bring back examples ]** in ✎ restores them). On a life slide it's the **× delete this life** button. A song with an mp3 added in the browser has **× mp3** to remove just the audio; an mp3 sitting in the `music/` folder has to be deleted from the folder. Cards other people added (shared mode) can't be deleted by you.

## The opening (new): skena version per niche
The door (first screen) now has its own look for each niche: **2am** = calm midnight blue with a soft glow, thin quiet strips and small pill labels, **video club** = rental-store red with VHS on-screen text and tracking lines, **tracklist** = photocopied gig flyer with a ransom-note title and a live equalizer. A world (◈) still replaces it with the world's own door.
- Words: `content/niches.js` → each niche has `door:{ ticker, ticker2, stickers, enter, fx }`. `ticker` = the running text strips (separate items with `|`), `stickers` = up to 4 labels (start one with `osd:` for the VHS-style text), `enter` = the button words.
- Colors, fonts, positions: `door.css` (one block per niche). Decorations are built by `door.js`.
- The 2am door copy itself is in `index.html` (`d1`, `d2`, `dtag`); its strips and labels are in `content/niches.js` like the others.

## Photos, tidied (new)
`polish.css`: every photo now gets the same frame (people = square, records/scores = 16:10, archive = 4:3), the crop leans toward the top so faces aren't cut off, long titles wrap inside their card, and the EXAMPLE tag / × sit on one line. Want a different shape? Change `aspect-ratio` in `polish.css`.

## Calmer openings + loading on niche switch (new)
- **Video club** and **tracklist** openings are now calm like the 2am one: soft colours, thin quiet strips, small pill labels, slow movement. The title letters of tracklist sit flat in one colour (the equalizer is small and slow).
- **Loading:** each time you pick another niche (✦ niche), the site goes back to the opening and holds it for about 4.5 seconds with a small progress bar and a few quiet lines. [ enter ] fades in when it reaches 100%. The very first visit, or reloading the page yourself, does not show it. Picking the niche you are already on just closes the menu.
- Change the time: `content/niches.js` → `door:{ loadMs:4500 }` (milliseconds). Change the words: `door:{ load:["…","…","…"] }` (the lines swap evenly while the bar fills). Logic is in `door.js`, looks are at the bottom of `door.css`.
- With *reduce motion* turned on in the phone/computer, the loading is shortened to 1.5 s and does not animate.
