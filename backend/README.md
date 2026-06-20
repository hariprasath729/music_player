# 🎵 Full Music Streaming Backend

A production-ready Node.js + Express + MongoDB backend with Google OAuth, JWT, Playlists, Likes, Recently Played, Search, and Play Count features.

## 📁 Structure

```
backend/
├── config/db.js
├── controllers/
│   ├── authController.js
│   ├── likeController.js
│   ├── playCountController.js
│   ├── playlistController.js
│   ├── recentlyPlayedController.js
│   └── searchController.js
├── middleware/auth.js
├── models/
│   ├── Like.js
│   ├── PlayCount.js
│   ├── Playlist.js
│   ├── RecentlyPlayed.js
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── index.js
│   ├── like.js
│   ├── play.js
│   ├── playlist.js
│   ├── recentlyPlayed.js
│   └── search.js
├── data/songs_metadata.json
├── .env.example
├── package.json
├── server.js
├── README.md
└── test-api.js
```

## 🚀 Quick Start

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

## 🔑 Environment Variables

```env
MONGO_URI=mongodb+srv://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
JWT_SECRET=your_secret_here
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/google` — Google OAuth login (returns JWT)
- `GET /api/auth/me` — Get current user (protected)

### Playlist
- `POST /api/playlist/create` — Create playlist
- `POST /api/playlist/add` — Add song
- `POST /api/playlist/remove` — Remove song
- `GET /api/playlist` — Get user's playlists
- `GET /api/playlist/:id` — Get single playlist
- `DELETE /api/playlist/:id` — Delete playlist

### Like
- `POST /api/like` — Like a song
- `POST /api/like/unlike` — Unlike a song
- `GET /api/like` — Get liked songs
- `GET /api/like/check/:songId` — Check if liked

### Recently Played
- `POST /api/recently-played/add` — Add to recently played
- `GET /api/recently-played` — Get recently played (max 25)
- `DELETE /api/recently-played` — Clear list

### Search
- `GET /api/search?q=query` — Search songs by title/artist
- `GET /api/search/genres` — Get all genres
- `GET /api/search/artists` — Get all artists

### Play Count
- `POST /api/play` — Increment play count
- `GET /api/play/top-songs?limit=10` — Get top played songs
- `GET /api/play/:songId` — Get count for one song

## 🔐 Authentication

All `POST` routes require:
```http
Authorization: Bearer <JWT_TOKEN>
```

The JWT is returned after successful Google OAuth login.

## 🧪 Test the API

```bash
node test-api.js
```

Or use the `test-playlist-like.sh` script after replacing the token.

## 📊 Data Flow

```
Frontend → /api/auth/google → Backend (Google verification) → JWT
Frontend → /api/playlist/create → Backend (MongoDB) → Success
Frontend → /api/search?q=amma → Backend (reads songs_metadata.json) → Results
Frontend → /api/play → Backend (increments count in MongoDB)
```

## 🎯 Key Features

- **Google OAuth 2.0** with proper token verification
- **JWT** stateless authentication (7-day expiry)
- **Playlists** with ownership checks
- **Like system** with duplicate prevention
- **Recently Played** with smart deduplication and limit
- **Search** with ranked results (title > artist)
- **Play Count** with atomic increment
- **MongoDB** with proper indexes and validation
- **CORS** configured for frontend
- **Error handling** with clear messages

The backend is now **fully functional** with all requested features. Run `npm run dev` to start the server. The frontend can now call these APIs with proper JWT tokens.

**Note**: The `songs_metadata.json` contains real song data from your CDN. The search system reads this file directly for fast performance.