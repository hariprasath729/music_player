# Music Player

A full-stack music player application inspired by modern streaming platforms.

## Features
- 🎵 Play, pause, skip, and shuffle tracks
- 💿 Dynamic playlists, albums, and artist views
- 🔍 Search functionality
- 📱 Responsive design (Desktop & Mobile)
- 🔒 Authentication (Email OTP & Google OAuth) with Admin Approval workflow
- ⬇️ Offline downloads feature (via Cache API & Service Worker)
- 📡 Real-time Synk sessions for listening together using Socket.io

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Socket.io

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd music-player
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   npm run dev
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   # Copy .env.example to .env and fill in your credentials
   npm run dev
   ```
