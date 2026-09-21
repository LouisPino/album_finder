# CLAUDE.md

## What this is

**ListenTO** (listentoronto.com) — a community catalogue of experimental music releases from
Toronto. Signed-in users upload albums (title, artists, cover image URL, link to the music,
year, genre categories), heart favourites, and comment. Anyone can browse, filter by category,
shuffle, or hit Random.

Two independent apps in one repo, deployed separately:

- `backend/` — Express 4 + Mongoose/MongoDB JSON API (Heroku-style `Procfile`)
- `frontend/` — Create React App (react-scripts 5) SPA (Netlify — `public/_redirects` does the
  SPA rewrite)

The root `package-lock.json` is an empty stub; there is no workspace tooling. Always run npm
commands from inside `backend/` or `frontend/`, never the root.

## Commands

```bash
# backend  (http://localhost:5000)
cd backend && npm install && npm start        # node ./bin/www
npx nodemon ./bin/www                          # nodemon is a dep but has no script

# frontend (http://localhost:3000)
cd frontend && npm install && npm start
npm run build                                  # -> frontend/build, what Netlify publishes
npm test                                       # CRA/Jest; only the stock App.test.js exists
```

There is no linter, formatter, or real test suite. `frontend/src/App.test.js` is the unmodified
CRA sample and does not match the current `App.js`, so it fails — don't treat it as a signal.

`backend/package.json` pins `engines.node` to 21.7.0; local node is newer, which is fine for dev.

## Environment

Both apps read `.env` (gitignored, never commit).

`backend/.env`:

| var | use |
| --- | --- |
| `DATABASE_URI` | MongoDB connection string (`config/database.js`) |
| `PORT` | defaults to 5000 |
| `FRONTEND_URL` | added to the CORS allowlist |
| `GOOGLE_CLIENT_ID`, `CLIENT_SECRET` | Google OAuth code exchange |
| `JWT_SECRET`, `BASE_URL` | read in `controllers/users.js` but currently unused |

`frontend/.env`: `REACT_APP_BASE_URL` (backend origin, no trailing slash) and
`REACT_APP_GOOGLE_CLIENT_ID`. CRA inlines these at build time — changing them requires a
restart/rebuild.

The CORS allowlist in `backend/app.js` is hardcoded alongside `FRONTEND_URL`
(`localhost:3000`, `listento.netlify.app`, `listentoronto.com`). New origins go there.

## Backend layout

Classic route → controller → model split; every file is CommonJS.

```
app.js            express setup, CORS, routers, jade error view
bin/www           http server bootstrap
config/database.js  mongoose.connect, imported for side effects
models/index.js   barrel: { Album, User, Comment }
routes/*.js       thin, just wire paths to controller fns
controllers/*.js  all logic; export an object of named async fns
```

Controller convention, followed everywhere — match it:

```js
async function getAlbumById(req, res) {
    try {
        res.status(200).json(await Album.findById(req.params.id).populate('comments'));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
```

The `await` goes inside `res.json(...)`; success is 200 (201 on create), failure is 400 with
`{ error }`.

### Data model

- **Album** — `title, description, artist: [String], uploader, email, link, image,
  release_year, categories: [String]`, timestamps. Has a **virtual** `comments` populated from
  `Comment.album_id`; `toJSON`/`toObject` have `virtuals: true`, so list endpoints call
  `.populate('comments')` and the frontend reads `album.comments.length` straight off the card.
- **User** — `email` (unique), `name`, `favorites: [ObjectId → Album]`, `authSource`.
- **Comment** — `content`, `user_id`, `user_name` (denormalized), `album_id`.

Album ownership is by **email string**, not by ObjectId ref — `/albums/:email` and the
`user.email === profile.email` checks in `MyAlbums` both rely on that. Artists are plain strings
inside `Album.artist`; there is no Artist collection — `/artists` is `Album.distinct("artist")`.

### Routes

```
GET    /                      jade index page
GET    /oauth                 OAuth code callback (legacy; the SPA uses POST /users)
GET    /albums                all albums + comments
GET    /albums/:email         albums uploaded by that email
GET    /albums/saved/:id      albums in that user's favorites
GET    /albums/id/:id         one album
POST   /albums/create
PUT    /albums/edit/:id
DELETE /albums/:id
GET    /artists               distinct artist names
GET    /artists/albums        bulk: ?artist=A&artist=B -> { results, notFound } (read by earlobe.ca)
GET    /artists/:artist       albums by that artist
POST   /users                 Google sign-in: exchanges code, finds-or-creates user
GET    /users/:id
PUT    /users/:id
GET    /comments/:id          comments for album :id
POST   /comments
DELETE /comments/:id
```

Note the ordering hazard in `routes/albums.js`: `/:email` is registered before the more specific
paths, so new `GET /albums/<literal>` routes must be declared above it or be nested
(`/saved/:id`, `/id/:id`).

**There is no auth middleware.** Sign-in only identifies the user; every write endpoint is open
and trusts the body. Don't assume `req.user` exists, and don't claim an endpoint is protected.

## Frontend layout

```
src/App.js            BrowserRouter + all routes; owns the `user` state
src/components/*.jsx  Header, Footer, AlbumCard, Heart, Comments, Comment,
                      GoogleAuth, YouSure, YouSureComment
src/pages/<Name>/     index.jsx (+ show.jsx, add_album.jsx, edit_album.jsx) and a co-located css
src/utilities/*-api.js       raw fetch wrappers
src/utilities/*-service.js   try/catch wrappers the components import
src/styles/*.css      shared css for header/footer/comments/yousure
```

Conventions worth keeping consistent with:

- **Two-layer data access.** Components import from `*-service.js`; only `*-api.js` calls
  `fetch`. Adding an endpoint means adding a function to both files.
- `*-api.js` functions return `res.json()` on ok and **return** (not throw) `new Error(...)`
  otherwise, so callers check for the shape they expect (`if (resp._id)`, `if (resp.length)`)
  rather than catching.
- CSS is loaded with bare dynamic `import("./style.css")` calls at module top level. Unusual,
  but it's the pattern throughout — keep it rather than converting one file.
- Loading state is `null` and renders `<h4 className="loading">HACKIN' A DART BE RIGHT BACK</h4>`.
- Auth state lives only in `App.js` `useState` — **it is not persisted**, so a refresh logs you
  out and "Log Out" is just `setUser(null)`.
- Several handlers reach for the DOM directly (`document.querySelectorAll(".artist-input")`,
  `e.target.previousSibling.value`, header nav listeners attached by `getElementById` in
  `Albums` and `Random` to make the nav link shuffle/reroll). Be careful when renaming those
  classes and ids — they're load-bearing.
- The category list `["noise", "ambient", "improvisation", "acoustic", "electronic", "vocal",
  "pop", "jazz", "live performance", "hip hop"]` is duplicated in `pages/Albums/index.jsx`,
  `add_album.jsx`, and `edit_album.jsx`. Change all three together.
- `toTitleCase` is likewise copy-pasted in those same three files.

## Auth flow

1. `Header` wraps `GoogleAuth` in `GoogleOAuthProvider` with `REACT_APP_GOOGLE_CLIENT_ID`.
2. `useGoogleLogin({ flow: "auth-code" })` returns a `code`; `GoogleAuth` attaches `client_id`
   and POSTs it to `/users`.
3. `controllers/users.js#signIn` exchanges the code (`redirectUri: "postmessage"`), verifies the
   id token, finds-or-creates the `User`, and returns `{ user, tokens }`.
4. The frontend keeps only `res.user` in state; the tokens are dropped.

Instagram's in-app browser blocks Google sign-in — `Header#isInAppBrowser` detects it and alerts
instead. That guard exists for a reason; leave it in place.

## Gotchas

- Images are hotlinked remote URLs (album covers are user-supplied links; the heart icons are
  istockphoto URLs hardcoded in `Heart.jsx`). No uploads, no blob storage.
- `Heart.jsx` mutates `user.favorites` in place with `push`/`splice` and then PUTs the user —
  React doesn't re-render from that mutation, the local `liked` state does the visual work.
- Jade/`views/` and `public/stylesheets/` in the backend are leftover express-generator scaffold;
  only the error view is really used.
- `mongodb` and `crypto` are listed in `frontend/package.json` but never imported — the frontend
  never talks to Mongo directly.
- `Procfile` declares `worker: node app.js`, which exports the app without listening;
  `npm start` (`./bin/www`) is the real entry point.

## Working here

- Commit style is terse and lowercase (`donate`, `home text`, `login ig fix`). Match it.
- No CI, no pre-commit hooks — nothing runs automatically on commit.
- Verify changes by running both dev servers and clicking through; there are no tests to lean on.
