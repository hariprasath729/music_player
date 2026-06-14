# 🚀 Backend Setup Guide

## Step-by-Step Installation

### 1️⃣ Install Node.js

Download from: https://nodejs.org/ (LTS version recommended)

Verify installation:
```bash
node --version
npm --version
```

### 2️⃣ Install MongoDB

**Option A: Local Installation**
- Windows: https://www.mongodb.com/try/download/community
- Mac: `brew install mongodb-community`
- Linux: Follow distro-specific instructions

Start MongoDB:
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended for beginners)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (free tier)
4. Get connection string
5. Whitelist IP: `0.0.0.0/0` (for development)

### 3️⃣ Setup Project

```bash
cd backend
npm install
```

### 4️⃣ Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
# MongoDB (use your Atlas connection string or local)
MONGO_URI=mongodb://localhost:27017/oauth-app

# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456

# JWT Secret (use random string, min 32 chars)
JWT_SECRET=super_secret_key_change_this_in_production_12345

# Server
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 5️⃣ Get Google OAuth Credentials

1. **Go to Google Cloud Console**
   - https://console.cloud.google.com/

2. **Create New Project**
   - Click "Select a project" → "New Project"
   - Name it (e.g., "My OAuth App")

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: **Web application**
   - Name: "My Web Client"

5. **Add Authorized Redirect URIs**
   ```
   http://localhost:3000
   http://localhost:5000
   postmessage
   ```

6. **Copy Credentials**
   - Client ID → `GOOGLE_CLIENT_ID` in `.env`
   - Client Secret → `GOOGLE_CLIENT_SECRET` in `.env`

### 6️⃣ Generate JWT Secret

Use a random string generator or run:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy output to `JWT_SECRET` in `.env`.

### 7️⃣ Start the Server

**Development mode (auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
📍 Health check: http://localhost:5000/api/health
```

### 8️⃣ Test the API

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔧 Troubleshooting

### MongoDB Connection Error
```
MongooseServerSelectionError: connect ECONNREFUSED
```
**Solution:** Start MongoDB or check `MONGO_URI`

### Google OAuth Error
```
invalid_client: The OAuth client was not found
```
**Solution:** Verify Client ID and Secret in `.env`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** 
```bash
# Find process using port 5000
lsof -i :5000

# Kill it
kill -9 <PID>
```

## 📱 Test with Frontend

See `frontend-integration-example.js` for React integration code.

## 🎯 API Testing Tools

- **Postman**: Import collection from API docs
- **Insomnia**: Similar to Postman
- **cURL**: Command-line testing
- **Thunder Client**: VS Code extension

## 📚 Next Steps

1. ✅ Backend is running
2. ⏭️ Build frontend (React/Vue/Angular)
3. ⏭️ Integrate Google Sign-In button
4. ⏭️ Call `/api/auth/google` endpoint
5. ⏭️ Store JWT token
6. ⏭️ Make authenticated requests

## 🆘 Need Help?

Check:
- `README.md` - Full documentation
- `.env.example` - Required environment variables
- `frontend-integration-example.js` - Frontend code examples
