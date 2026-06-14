#!/bin/bash
# Test script for Playlist and Like APIs
# Run after starting the server: node server.js
# Replace TOKEN with a valid JWT from your auth system

TOKEN="YOUR_JWT_TOKEN_HERE"
BASE="http://localhost:5000"

echo "============================="
echo "Testing Playlist & Like APIs"
echo "============================="

echo ""
echo "1. Create Playlist"
echo "------------------"
curl -s -X POST "$BASE/playlist/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name": "My Favorites"}' | jq .

echo ""
echo "2. Add Song to Playlist (replace playlistId with actual ID)"
echo "----------------------------------------------------------"
# curl -s -X POST "$BASE/playlist/add" \
#   -H "Content-Type: application/json" \
#   -H "Authorization: Bearer $TOKEN" \
#   -d '{"playlistId": "REPLACE_WITH_PLAYLIST_ID", "songId": "REPLACE_WITH_SONG_ID"}' | jq .

echo ""
echo "3. Get User Playlists"
echo "---------------------"
curl -s -X GET "$BASE/playlist" \
  -H "Authorization: Bearer $TOKEN" | jq .

echo ""
echo "4. Like a Song (replace songId)"
echo "-------------------------------"
# curl -s -X POST "$BASE/like" \
#   -H "Content-Type: application/json" \
#   -H "Authorization: Bearer $TOKEN" \
#   -d '{"songId": "REPLACE_WITH_SONG_ID"}' | jq .

echo ""
echo "5. Get Liked Songs"
echo "------------------"
curl -s -X GET "$BASE/like" \
  -H "Authorization: Bearer $TOKEN" | jq .

echo ""
echo "6. Unlike a Song (replace songId)"
echo "---------------------------------"
# curl -s -X POST "$BASE/like/unlike" \
#   -H "Content-Type: application/json" \
#   -H "Authorization: Bearer $TOKEN" \
#   -d '{"songId": "REPLACE_WITH_SONG_ID"}' | jq .

echo ""
echo "Done!"
