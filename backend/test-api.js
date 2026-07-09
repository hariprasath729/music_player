/**
 * Test script for the full backend APIs
 * Run with: node test-api.js
 */

import 'dotenv/config';
import fetch from 'node-fetch';

const BASE = process.env.TEST_BASE_URL || process.env.APP_URL || `http://localhost:${process.env.PORT || 5000}`;
const TOKEN = process.env.TEST_TOKEN || process.env.TOKEN || '';

async function test() {
  console.log('🚀 Testing Backend APIs...\n');
  console.log(`📡 Base URL: ${BASE}`);
  console.log(`🔑 Token configured: ${TOKEN ? 'Yes (Loaded from env)' : 'No (Public endpoints only)'}\n`);

  try {
    // 1. Health
    console.log('1. Health check');
    let res = await fetch(`${BASE}/api/health`);
    console.log(await res.json());

    // 2. Search
    console.log('\n2. Search');
    res = await fetch(`${BASE}/api/search?q=amma`);
    console.log(await res.json());

    // 3. Top songs
    console.log('\n3. Top songs');
    res = await fetch(`${BASE}/api/play/top-songs?limit=5`);
    console.log(await res.json());

    // 4. Secure route test (if token is available)
    if (TOKEN) {
      console.log('\n4. Test Authenticated Route (User Profile)');
      res = await fetch(`${BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      console.log(await res.json());
    } else {
      console.log('\n4. Skipping authenticated route test (No TEST_TOKEN/TOKEN in env)');
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }

  console.log('\n✅ Test complete.');
}

test().catch(console.error);
