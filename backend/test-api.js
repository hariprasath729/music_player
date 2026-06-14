/**
 * Test script for the full backend
 * Run with: node test-api.js
 */

import fetch from 'node-fetch';

const BASE = 'http://localhost:5000';
const TOKEN = 'YOUR_JWT_TOKEN_HERE'; // Replace with real JWT after login

async function test() {
  console.log('🚀 Testing Backend APIs...\n');

  // Health
  console.log('1. Health check');
  let res = await fetch(`${BASE}/api/health`);
  console.log(await res.json());

  // Search
  console.log('\n2. Search');
  res = await fetch(`${BASE}/api/search?q=amma`);
  console.log(await res.json());

  // Top songs
  console.log('\n3. Top songs');
  res = await fetch(`${BASE}/api/play/top-songs?limit=5`);
  console.log(await res.json());

  console.log('\n✅ Test complete. Replace TOKEN with a real JWT for authenticated routes.');
}

test().catch(console.error);
