/**
 * Firebase Setup Helper Script
 * 
 * This script helps users set up their Firebase project by:
 * 1. Checking if Firebase configuration is set in .env.local
 * 2. Providing instructions on how to create a Firebase project
 * 3. Generating a template for the .env.local file
 * 
 * Usage: node scripts/setup-firebase.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
let envExists = false;
let envContents = '';

try {
  envContents = fs.readFileSync(envPath, 'utf8');
  envExists = true;
  console.log(`${colors.green}Found .env.local file${colors.reset}`);
} catch (error) {
  console.log(`${colors.yellow}No .env.local file found. We'll create one for you.${colors.reset}`);
}

// Parse existing env file if it exists
const envVars = {};
if (envExists) {
  const lines = envContents.split('\n');
  for (const line of lines) {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    }
  }
}

// Check if Firebase config is set
const firebaseConfigKeys = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const missingKeys = firebaseConfigKeys.filter(key => !envVars[key] || envVars[key] === 'your-api-key-here' || envVars[key].includes('your-project-id'));

// Print header
console.log('\n');
console.log(`${colors.bright}${colors.cyan}========================================${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}       FIREBASE SETUP ASSISTANT        ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}========================================${colors.reset}`);
console.log('\n');

if (missingKeys.length === 0) {
  console.log(`${colors.green}${colors.bright}✓ Firebase configuration is set up correctly!${colors.reset}`);
  
  // Check if service account key is set
  if (!envVars['FIREBASE_SERVICE_ACCOUNT_KEY'] || 
      envVars['FIREBASE_SERVICE_ACCOUNT_KEY'] === '{"type":"service_account","project_id":"your-project-id"}') {
    console.log(`${colors.yellow}⚠ Firebase Admin SDK service account key is not set.${colors.reset}`);
    console.log(`${colors.yellow}  Some server-side features may not work correctly.${colors.reset}`);
    console.log('\n');
    console.log(`To set up the Firebase Admin SDK:`);
    console.log(`1. Go to Firebase Console > Project Settings > Service Accounts`);
    console.log(`2. Click "Generate new private key"`);
    console.log(`3. Save the JSON file as "service-account.json" in the project root`);
    console.log(`4. Run: node scripts/convert-service-account.js`);
  } else {
    console.log(`${colors.green}✓ Firebase Admin SDK service account key is set.${colors.reset}`);
  }
  
  process.exit(0);
}

// Print setup instructions
console.log(`${colors.yellow}Your Firebase configuration is not set up correctly.${colors.reset}`);
console.log(`${colors.yellow}Missing or invalid configuration keys: ${missingKeys.join(', ')}${colors.reset}`);
console.log('\n');
console.log(`${colors.bright}Follow these steps to set up Firebase:${colors.reset}`);
console.log('\n');
console.log(`${colors.cyan}1. Create a Firebase project:${colors.reset}`);
console.log(`   - Go to ${colors.bright}https://console.firebase.google.com/${colors.reset}`);
console.log(`   - Click "Add project" and follow the setup steps`);
console.log('\n');
console.log(`${colors.cyan}2. Add a web app to your project:${colors.reset}`);
console.log(`   - In the Firebase console, click the web icon (</>) to add a web app`);
console.log(`   - Register your app with a nickname (e.g., "Family Circle")`);
console.log(`   - Firebase will provide you with configuration details`);
console.log('\n');
console.log(`${colors.cyan}3. Enable Authentication:${colors.reset}`);
console.log(`   - In the Firebase console, go to Authentication > Sign-in method`);
console.log(`   - Enable Email/Password authentication`);
console.log('\n');
console.log(`${colors.cyan}4. Create a Firestore database:${colors.reset}`);
console.log(`   - In the Firebase console, go to Firestore Database`);
console.log(`   - Click "Create database" and start in test mode`);
console.log('\n');
console.log(`${colors.cyan}5. Update your .env.local file with the Firebase configuration:${colors.reset}`);
console.log(`   - Copy the configuration from the Firebase console`);
console.log(`   - Update your .env.local file with the values`);
console.log('\n');

// Generate template .env.local file
const templateEnv = `# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin (Server-side)
# This should be the stringified JSON of your service account key
FIREBASE_SERVICE_ACCOUNT_KEY=
`;

// Ask if user wants to create a template .env.local file
rl.question(`${colors.bright}Would you like to create a template .env.local file? (y/n) ${colors.reset}`, (answer) => {
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    fs.writeFileSync(envPath, templateEnv);
    console.log(`${colors.green}Template .env.local file created at ${envPath}${colors.reset}`);
    console.log(`${colors.green}Please fill in the values from your Firebase console.${colors.reset}`);
  } else {
    console.log(`${colors.yellow}No changes made to .env.local${colors.reset}`);
  }
  
  console.log('\n');
  console.log(`${colors.bright}${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}       SETUP ASSISTANT COMPLETE        ${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}========================================${colors.reset}`);
  console.log('\n');
  
  rl.close();
}); 