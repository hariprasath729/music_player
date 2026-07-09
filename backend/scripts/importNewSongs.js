/**
 * New Song Import & Security Automation Script
 * --------------------------------------------
 * This script automates the ingestion of new batches of songs (e.g., 1000+ songs).
 *
 * It performs two actions:
 *   1. Seeds the MongoDB cluster with the full song data (including private URLs).
 *   2. Automatically strips the URLs and appends the safe metadata to the frontend
 *      catalog (`src/data/musicCatalog.ts`), preserving the single source of truth.
 *
 * Usage:
 *   1. Save your raw JSON list of new songs in `backend/import_source.json`
 *   2. Run: node backend/scripts/importNewSongs.js
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Song Schema ──
const songSchema = new mongoose.Schema({
  songId:   { type: Number, required: true, unique: true, index: true },
  title:    { type: String, required: true },
  artist:   { type: String, default: 'Unknown' },
  album:    { type: String, default: null },
  duration: { type: Number, default: 0 },
  cover:    { type: String, default: null },
  url:      { type: String, required: true },
}, { timestamps: false });

async function importSongs() {
  const SONGS_URI = process.env.SONGS_METADATA;
  if (!SONGS_URI) {
    console.error('❌ SONGS_METADATA env var not set.');
    process.exit(1);
  }

  // 1. Load the new raw songs from import_source.json
  const sourcePath = path.join(__dirname, '../import_source.json');
  let rawImport;
  try {
    rawImport = await readFile(sourcePath, 'utf-8');
  } catch (err) {
    console.error(`❌ Source file not found. Save your new songs JSON list in: ${sourcePath}`);
    process.exit(1);
  }

  const newSongsList = JSON.parse(rawImport);
  if (!Array.isArray(newSongsList) || newSongsList.length === 0) {
    console.error('❌ Invalid or empty array in import_source.json');
    process.exit(1);
  }

  console.log(`📦 Found ${newSongsList.length} new songs to import.`);

  // 2. Connect to Songs DB & Seed MongoDB
  console.log('🔗 Connecting to MongoDB Songs DB...');
  const conn = await mongoose.createConnection(SONGS_URI + '/songs', {
    serverSelectionTimeoutMS: 10000,
  });

  await new Promise((resolve, reject) => {
    if (conn.readyState === 1) return resolve();
    conn.once('connected', resolve);
    conn.once('error', reject);
  });

  const Song = conn.model('Song', songSchema);

  console.log('💾 Upserting songs to MongoDB...');
  const BATCH_SIZE = 500;
  let totalUpserted = 0;
  let totalModified = 0;

  for (let i = 0; i < newSongsList.length; i += BATCH_SIZE) {
    const batch = newSongsList.slice(i, i + BATCH_SIZE);
    const ops = batch.map(s => ({
      updateOne: {
        filter: { songId: Number(s.id) },
        update: {
          $set: {
            songId:   Number(s.id),
            title:    s.title,
            artist:   s.artist || 'Unknown',
            album:    s.album  || null,
            duration: s.duration || 0,
            cover:    s.cover  || null,
            url:      s.url,  // Seeding URL privately to DB
          },
        },
        upsert: true,
      },
    }));

    const result = await Song.bulkWrite(ops, { ordered: false });
    totalUpserted += result.upsertedCount || 0;
    totalModified += result.modifiedCount || 0;
  }
  console.log(`   MongoDB Done — inserted: ${totalUpserted}, updated: ${totalModified}`);
  await conn.close();

  // 3. Update the frontend musicCatalog.ts (Appending only safe metadata, URLs stripped!)
  console.log('📝 Updating frontend catalog (src/data/musicCatalog.ts)...');
  const catalogPath = path.resolve(__dirname, '../../src/data/musicCatalog.ts');
  const content = await readFile(catalogPath, 'utf-8');

  // Locate the RAW_SONGS array in the file
  const startIndex = content.indexOf('const RAW_SONGS: RawSong[] =[');
  if (startIndex === -1) {
    console.error('❌ Could not find RAW_SONGS assignment in musicCatalog.ts');
    process.exit(1);
  }

  const arrayStart = content.indexOf('[', startIndex);
  let bracketCount = 0;
  let arrayEndIndex = -1;

  for (let i = arrayStart; i < content.length; i++) {
    const char = content[i];
    if (char === '[') bracketCount++;
    else if (char === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        arrayEndIndex = i + 1;
        break;
      }
    }
  }

  if (arrayEndIndex === -1) {
    console.error('❌ Could not find matching closing bracket for RAW_SONGS');
    process.exit(1);
  }

  // Parse existing raw metadata
  const jsonText = content.substring(arrayStart, arrayEndIndex);
  const currentCatalog = JSON.parse(jsonText);

  // Filter new list: remove URLs, prevent duplicate ids
  const existingIds = new Set(currentCatalog.map(s => Number(s.id)));
  let addedCount = 0;

  for (const song of newSongsList) {
    const songId = Number(song.id);
    if (!existingIds.has(songId)) {
      // Create stripped metadata object (NO url field!)
      currentCatalog.push({
        id: songId,
        title: song.title,
        artist: song.artist || 'Unknown',
        album: song.album || 'Single',
        duration: song.duration || 0,
        cover: song.cover || null
      });
      addedCount++;
    }
  }

  if (addedCount > 0) {
    // Reconstruct musicCatalog.ts contents
    const header = content.substring(0, arrayStart);
    const footer = content.substring(arrayEndIndex);
    const updatedArrayString = JSON.stringify(currentCatalog, null, 2);

    await writeFile(catalogPath, header + updatedArrayString + footer, 'utf-8');
    console.log(`✅ Frontend updated! Added ${addedCount} songs to catalog fallback (URLs stripped).`);
  } else {
    console.log('ℹ️ All song IDs already exist in the frontend catalog. No changes made to musicCatalog.ts.');
  }

  console.log('\n✨ Import process complete!');
}

importSongs().catch(err => {
  console.error('❌ Import failed:', err.message);
  process.exit(1);
});
