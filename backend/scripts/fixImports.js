import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const songSchema = new mongoose.Schema({
  songId:   { type: Number, required: true, unique: true, index: true },
  title:    { type: String, required: true },
  artist:   { type: String, default: 'Unknown' },
  album:    { type: String, default: null },
  duration: { type: Number, default: 0 },
  cover:    { type: String, default: null },
  url:      { type: String, required: true },
}, { timestamps: false });

async function fixImports() {
  const SONGS_URI = process.env.SONGS_METADATA;
  if (!SONGS_URI) {
    console.error('❌ SONGS_METADATA env var not set.');
    process.exit(1);
  }

  // 1. Load the corrected songs list
  const sourcePath = path.join(__dirname, '../import_source.json');
  let rawImport;
  try {
    rawImport = await readFile(sourcePath, 'utf-8');
  } catch (err) {
    console.error(`❌ Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  const correctedSongsList = JSON.parse(rawImport);
  if (!Array.isArray(correctedSongsList) || correctedSongsList.length === 0) {
    console.error('❌ Invalid or empty array in import_source.json');
    process.exit(1);
  }

  console.log(`📦 Found ${correctedSongsList.length} songs in import_source.json to update.`);

  // 2. Connect to MongoDB and update
  console.log('🔗 Connecting to MongoDB...');
  const conn = await mongoose.createConnection(SONGS_URI + '/songs', {
    serverSelectionTimeoutMS: 10000,
  });

  await new Promise((resolve, reject) => {
    if (conn.readyState === 1) return resolve();
    conn.once('connected', resolve);
    conn.once('error', reject);
  });

  const Song = conn.model('Song', songSchema);

  console.log('💾 Updating MongoDB collection...');
  const BATCH_SIZE = 200;
  let totalModified = 0;

  for (let i = 0; i < correctedSongsList.length; i += BATCH_SIZE) {
    const batch = correctedSongsList.slice(i, i + BATCH_SIZE);
    const ops = batch.map(s => ({
      updateOne: {
        filter: { songId: Number(s.id) },
        update: {
          $set: {
            title:    s.title,
            artist:   s.artist || 'Unknown',
            album:    s.album  || null,
            duration: s.duration || 0,
            cover:    s.cover  || null,
            url:      s.url,
          },
        },
        upsert: true, // Upsert in case any song was somehow missing
      },
    }));

    const result = await Song.bulkWrite(ops, { ordered: false });
    totalModified += (result.modifiedCount || 0) + (result.upsertedCount || 0);
  }

  console.log(`   MongoDB Done — updated/inserted ${totalModified} entries.`);
  await conn.close();

  // 3. Update the frontend musicCatalog.ts fallbacks
  console.log('📝 Updating frontend fallbacks (src/data/musicCatalog.ts)...');
  const catalogPath = path.resolve(__dirname, '../../src/data/musicCatalog.ts');
  const content = await readFile(catalogPath, 'utf-8');

  // Locate the RAW_SONGS array in the file
  const match = content.match(/const\s+RAW_SONGS\s*:\s*RawSong\s*\[\s*\]\s*=\s*\[/);
  if (!match) {
    console.error('❌ Could not find RAW_SONGS assignment in musicCatalog.ts');
    process.exit(1);
  }

  const equalsIndex = content.indexOf('=', match.index);
  const arrayStart = content.indexOf('[', equalsIndex);
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

  const jsonText = content.substring(arrayStart, arrayEndIndex);
  const currentCatalog = JSON.parse(jsonText);

  // Map corrected info
  const correctedMap = new Map(correctedSongsList.map(s => [Number(s.id), s]));
  let frontendUpdatedCount = 0;

  for (let i = 0; i < currentCatalog.length; i++) {
    const s = currentCatalog[i];
    const correctedData = correctedMap.get(Number(s.id));
    if (correctedData) {
      if (s.cover !== correctedData.cover) {
        s.cover = correctedData.cover || null;
        frontendUpdatedCount++;
      }
    }
  }

  if (frontendUpdatedCount > 0) {
    const header = content.substring(0, arrayStart);
    const footer = content.substring(arrayEndIndex);
    const updatedArrayString = JSON.stringify(currentCatalog, null, 2);

    await writeFile(catalogPath, header + updatedArrayString + footer, 'utf-8');
    console.log(`✅ Frontend fallbacks updated! Patched ${frontendUpdatedCount} covers.`);
  } else {
    console.log('ℹ️ All frontend covers are already correct. No changes made to musicCatalog.ts.');
  }

  console.log('\n✨ Database and Frontend fix complete!');
}

fixImports().catch(err => {
  console.error('❌ Fix failed:', err.message);
  process.exit(1);
});
