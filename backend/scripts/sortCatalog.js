import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sortCatalog() {
  const catalogPath = path.resolve(__dirname, '../../src/data/musicCatalog.ts');
  const content = await readFile(catalogPath, 'utf-8');

  // Locate the RAW_SONGS array in the file
  const match = content.match(/const\s+RAW_SONGS\s*:\s*RawSong\s*\[\s*\]\s*=\s*\[/);
  if (!match) {
    console.error('❌ Could not find RAW_SONGS assignment');
    process.exit(1);
  }

  const startIndex = match.index;
  const equalsIndex = content.indexOf('=', startIndex);
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
    console.error('❌ Could not find matching closing bracket');
    process.exit(1);
  }

  const jsonText = content.substring(arrayStart, arrayEndIndex);
  const currentCatalog = JSON.parse(jsonText);

  // Sort by id ascending
  currentCatalog.sort((a, b) => Number(a.id) - Number(b.id));

  const header = content.substring(0, arrayStart);
  const footer = content.substring(arrayEndIndex);
  const updatedArrayString = JSON.stringify(currentCatalog, null, 2);

  await writeFile(catalogPath, header + updatedArrayString + footer, 'utf-8');
  console.log('✅ Catalog successfully sorted by ID!');
}

sortCatalog().catch(err => {
  console.error(err);
  process.exit(1);
});
