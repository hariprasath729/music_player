/**
 * Song Seeder Script
 * ------------------
 * Seeds all songs from backend/data/songs_metadata.json into the
 * Songs MongoDB cluster (SONGS_METADATA env var).
 *
 * Usage:
 *   node backend/scripts/seedSongs.js
 *
 * Run once after setting up the MongoDB cluster. Safe to re-run —
 * uses upsert, so existing documents are updated rather than duplicated.
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Song Schema (mirrors backend/models/Song.js but standalone for seeding) ──
const songSchema = new mongoose.Schema({
  songId:   { type: Number, required: true, unique: true, index: true },
  title:    { type: String, required: true },
  artist:   { type: String, default: 'Unknown' },
  album:    { type: String, default: null },
  duration: { type: Number, default: 0 },
  cover:    { type: String, default: null },
  url:      { type: String, required: true },
}, { timestamps: false });

async function seed() {
  const SONGS_URI = process.env.SONGS_METADATA;

  if (!SONGS_URI) {
    console.error('❌ SONGS_METADATA env var not set.');
    process.exit(1);
  }

  console.log('🔗 Connecting to Songs DB...');
  const conn = await mongoose.createConnection(SONGS_URI + '/songs', {
    serverSelectionTimeoutMS: 10000,
  });

  // Wait for connection to be ready
  await new Promise((resolve, reject) => {
    if (conn.readyState === 1) return resolve();
    conn.once('connected', resolve);
    conn.once('error', reject);
  });

  console.log(`✅ Connected to: ${conn.host}`);

  const Song = conn.model('Song', songSchema);

  // Load source data
  const dataPath = path.join(__dirname, '../data/songs_metadata.json');
  console.log(`📂 Reading source from: ${dataPath}`);
  const raw = await readFile(dataPath, 'utf-8');
  const songs = JSON.parse(raw);
  console.log(`📦 Found ${songs.length} songs to seed.`);

  // Batch upsert using bulkWrite for performance
  const BATCH_SIZE = 500;
  let totalUpserted = 0;
  let totalModified = 0;

  for (let i = 0; i < songs.length; i += BATCH_SIZE) {
    const batch = songs.slice(i, i + BATCH_SIZE);
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
            url:      s.url,  // Private — stored in DB only
          },
        },
        upsert: true,
      },
    }));

    const result = await Song.bulkWrite(ops, { ordered: false });
    totalUpserted += result.upsertedCount || 0;
    totalModified += result.modifiedCount || 0;

    const processed = Math.min(i + BATCH_SIZE, songs.length);
    console.log(`   ${processed}/${songs.length} processed — inserted: ${totalUpserted}, updated: ${totalModified}`);
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`   Total songs in source: ${songs.length}`);
  console.log(`   Documents upserted:    ${totalUpserted}`);
  console.log(`   Documents updated:     ${totalModified}`);

  await conn.close();
  console.log('🔒 Connection closed.');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seeding failed:', err.message);
  process.exit(1);
});
