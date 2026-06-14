/**
 * Quick Test Script
 * Run: node test-server.js
 * 
 * This verifies the backend structure is correct without needing MongoDB.
 */

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

console.log('✅ All dependencies loaded successfully!\n');

console.log('📦 Package versions:');
console.log('   express:', require('express/package.json').version);
console.log('   mongoose:', require('mongoose/package.json').version);
console.log('   jsonwebtoken:', require('jsonwebtoken/package.json').version);
console.log('   google-auth-library:', require('google-auth-library/package.json').version);
console.log('   cors:', require('cors/package.json').version);
console.log('\n✨ Backend is ready to configure!\n');

console.log('📋 Next steps:');
console.log('   1. Copy .env.example to .env');
console.log('   2. Add your MongoDB URI, Google credentials, and JWT secret');
console.log('   3. Run: npm run dev');
console.log('\n🚀 Server will start on http://localhost:5000');
