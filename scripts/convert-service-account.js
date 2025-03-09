/**
 * This script helps convert a Firebase service account JSON file to a string
 * for use in the FIREBASE_SERVICE_ACCOUNT_KEY environment variable.
 * 
 * Usage:
 * 1. Save your Firebase service account JSON file as 'service-account.json'
 * 2. Run: node scripts/convert-service-account.js
 * 3. Copy the output and paste it into your .env.local file
 */

const fs = require('fs');
const path = require('path');

try {
  // Try to read the service account file
  const filePath = path.join(process.cwd(), 'service-account.json');
  const serviceAccount = fs.readFileSync(filePath, 'utf8');
  
  // Validate that it's valid JSON
  JSON.parse(serviceAccount);
  
  // Output the stringified version
  console.log('\nCopy the following line into your .env.local file:\n');
  console.log(`FIREBASE_SERVICE_ACCOUNT_KEY='${serviceAccount.replace(/\n/g, '').replace(/'/g, "\\'")}'`);
  console.log('\n');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('\nError: service-account.json file not found.');
    console.error('Please download your Firebase service account key and save it as "service-account.json" in the project root.\n');
  } else if (error instanceof SyntaxError) {
    console.error('\nError: The service account file contains invalid JSON.\n');
  } else {
    console.error('\nError:', error.message, '\n');
  }
  
  process.exit(1);
} 