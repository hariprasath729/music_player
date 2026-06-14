# 🎵 Music Streaming Backend

A lightweight Express API that manages **song metadata only**.
It does **not** stream or transcode audio — clients receive a CDN
`file_url` and stream the `.mp3` directly via the browser `<audio>`
element using native HTTP range requests.

## Architecture

```
server/
├── index.js                      # Express app entry point
├── routes/
│   └── songs.js                  # Endpoint → controller mapping
├── controllers/
│   └── songController.js         # Request/response handlers
├── middleware/
│   └── validateSong.js           # Validation rules
├── storage/
│   └── songRepository.js         # Storage abstraction (JSON now, DB later)
└── data/
    └── songs.json                # Metadata store (NO audio files)
```

**Why this is scalable:** the `songRepository` is the only file that
knows *how* data is stored. To migrate to PostgreSQL/MySQL/MongoDB,
replace its internals — the routes, controllers, and validation stay
identical.

## Running

```bash
node server/index.js
# 🎵 Music metadata API running at http://localhost:4000
```

Set a custom port with `PORT=5000 node server/index.js`.

## API Endpoints

| Method | Endpoint      | Description                         |
|--------|---------------|-------------------------------------|
| GET    | `/songs`      | List all songs (`?search=` optional)|
| GET    | `/songs/:id`  | Get a single song                   |
| POST   | `/songs`      | Add a song (metadata only)          |
| PUT    | `/songs/:id`  | Update a song                       |
| DELETE | `/songs/:id`  | Remove a song                       |
| GET    | `/health`     | Service health check                |

## Data Model

```json
{
  "id": 1,
  "title": "Neon Sunset",
  "artist": "Lazerhawk & The Midnight",
  "album": "Outrun Chronicles",
  "duration": 214,
  "file_url": "https://cdn.jsdelivr.net/gh/<user>/<repo>/songs/song.mp3",
  "cover_url": "https://cdn.jsdelivr.net/gh/<user>/<repo>/covers/song.jpg",
  "created_at": "2026-01-15T09:00:00.000Z"
}
```

## Validation Rules

- `title` — required, must not be empty
- `file_url` — required, valid URL ending in `.mp3`
- `cover_url` — optional, valid URL ending in `.jpg`, `.jpeg`, or `.png`
- `duration` — optional, positive number (seconds)

Invalid payloads return `400` with a `details[]` array.

## Example Requests

```bash
# List songs
curl http://localhost:4000/songs

# Search
curl "http://localhost:4000/songs?search=neon"

# Get one
curl http://localhost:4000/songs/1

# Create
curl -X POST http://localhost:4000/songs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Dude Trailer Blast",
    "artist": "Unknown",
    "duration": 180,
    "file_url": "https://cdn.jsdelivr.net/gh/user/repo/songs/song.mp3",
    "cover_url": "https://cdn.jsdelivr.net/gh/user/repo/covers/song.jpg"
  }'

# Update
curl -X PUT http://localhost:4000/songs/1 \
  -H "Content-Type: application/json" \
  -d '{ "title": "Neon Sunset (Remix)" }'

# Delete
curl -X DELETE http://localhost:4000/songs/1
```

## System Flow

```
Frontend  ──GET /songs──▶  Backend  ──returns metadata (JSON)──▶  Frontend
Frontend  ──loads file_url into <audio>──▶  Browser  ──streams .mp3──▶  CDN
```

## Connecting the Frontend

The React app reads two Vite env vars (create a `.env` file in the project root):

```env
VITE_USE_BACKEND=true
VITE_API_URL=http://localhost:4000
```

When `VITE_USE_BACKEND=true`, `src/services/dataService.ts` pulls songs
from this API and maps them to the UI's `Track` model. If the backend is
unreachable it falls back to mock data automatically, so the app structure
is identical with or without real data.

## Performance

- In-memory cache backs the JSON file → song list responds in well under 100ms.
- No audio processing/transcoding — the backend only serves JSON.
- Stateless handlers + Node's event loop comfortably handle 10+ concurrent users.
