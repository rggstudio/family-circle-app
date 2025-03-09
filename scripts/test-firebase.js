/**
 * Firebase Testing Script
 * 
 * This script tests Firebase functionality directly without relying on React components.
 * It can test authentication, Firestore, and Storage operations.
 * 
 * Usage: node scripts/test-firebase.js [test-type]
 * Where test-type is one of: auth, firestore, storage, all
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} = require('firebase/auth');
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  limit,
  serverTimestamp
} = require('firebase/firestore');
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll
} = require('firebase/storage');
const fs = require('fs');
const path = require('path');

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

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
console.log(`${colors.cyan}Initializing Firebase...${colors.reset}`);
console.log(`Project ID: ${firebaseConfig.projectId}`);
console.log(`Storage Bucket: ${firebaseConfig.storageBucket}`);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

console.log(`${colors.green}Firebase initialized successfully${colors.reset}`);

// Test data
const testUser = {
  email: `test-${Date.now()}@example.com`,
  password: 'Test123!',
  name: 'Test User'
};

// Test authentication
async function testAuth() {
  console.log(`\n${colors.bright}${colors.cyan}Testing Authentication${colors.reset}`);
  
  try {
    // Register a new user
    console.log(`\nCreating test user: ${testUser.email}`);
    const userCredential = await createUserWithEmailAndPassword(auth, testUser.email, testUser.password);
    console.log(`${colors.green}User created successfully${colors.reset}`);
    console.log(`User ID: ${userCredential.user.uid}`);
    
    // Sign out
    await signOut(auth);
    console.log(`${colors.yellow}Signed out${colors.reset}`);
    
    // Sign in
    console.log(`\nSigning in with test user: ${testUser.email}`);
    const signInResult = await signInWithEmailAndPassword(auth, testUser.email, testUser.password);
    console.log(`${colors.green}Sign in successful${colors.reset}`);
    console.log(`User ID: ${signInResult.user.uid}`);
    
    // Get ID token
    const token = await signInResult.user.getIdToken();
    console.log(`${colors.green}Got ID token${colors.reset} (first 20 chars): ${token.substring(0, 20)}...`);
    
    return signInResult.user;
  } catch (error) {
    console.error(`${colors.red}Authentication error:${colors.reset}`, error);
    throw error;
  }
}

// Test Firestore
async function testFirestore(user) {
  console.log(`\n${colors.bright}${colors.cyan}Testing Firestore Database${colors.reset}`);
  
  try {
    // Add a test message
    const message = {
      text: `Test message from script at ${new Date().toISOString()}`,
      userId: user.uid,
      userName: testUser.name,
      createdAt: serverTimestamp()
    };
    
    console.log(`\nAdding test message to Firestore`);
    const messagesRef = collection(db, 'test_messages');
    const docRef = await addDoc(messagesRef, message);
    console.log(`${colors.green}Message added successfully${colors.reset}`);
    console.log(`Document ID: ${docRef.id}`);
    
    // Get messages
    console.log(`\nFetching test messages from Firestore`);
    const q = query(messagesRef, limit(5));
    const querySnapshot = await getDocs(q);
    
    console.log(`${colors.green}Retrieved ${querySnapshot.size} messages${colors.reset}`);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`- ${doc.id}: "${data.text}" by ${data.userName}`);
    });
    
    return docRef;
  } catch (error) {
    console.error(`${colors.red}Firestore error:${colors.reset}`, error);
    throw error;
  }
}

// Test Storage
async function testStorage(user) {
  console.log(`\n${colors.bright}${colors.cyan}Testing Firebase Storage${colors.reset}`);
  
  try {
    // Create a test file
    const testFilePath = path.join(__dirname, 'test-image.txt');
    const testFileContent = `Test file content created at ${new Date().toISOString()}`;
    fs.writeFileSync(testFilePath, testFileContent);
    
    // Upload the file
    console.log(`\nUploading test file to Storage`);
    const fileBuffer = fs.readFileSync(testFilePath);
    const storageRef = ref(storage, `test_files/test-${Date.now()}.txt`);
    
    const snapshot = await uploadBytes(storageRef, fileBuffer);
    console.log(`${colors.green}File uploaded successfully${colors.reset}`);
    console.log(`File path: ${snapshot.ref.fullPath}`);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(`${colors.green}Download URL:${colors.reset} ${downloadURL}`);
    
    // List files in the test_files directory
    console.log(`\nListing files in test_files directory`);
    const listRef = ref(storage, 'test_files');
    const listResult = await listAll(listRef);
    
    console.log(`${colors.green}Found ${listResult.items.length} files${colors.reset}`);
    for (const itemRef of listResult.items) {
      console.log(`- ${itemRef.name}`);
    }
    
    // Clean up
    fs.unlinkSync(testFilePath);
    
    return downloadURL;
  } catch (error) {
    console.error(`${colors.red}Storage error:${colors.reset}`, error);
    throw error;
  }
}

// Run tests
async function runTests() {
  const testType = process.argv[2] || 'all';
  
  console.log(`${colors.bright}${colors.magenta}Firebase Test Script${colors.reset}`);
  console.log(`Running test type: ${testType}`);
  
  try {
    let user;
    
    if (testType === 'auth' || testType === 'all') {
      user = await testAuth();
    }
    
    if (testType === 'firestore' || testType === 'all') {
      if (!user) {
        console.log(`${colors.yellow}No authenticated user for Firestore test, authenticating...${colors.reset}`);
        user = await testAuth();
      }
      await testFirestore(user);
    }
    
    if (testType === 'storage' || testType === 'all') {
      if (!user) {
        console.log(`${colors.yellow}No authenticated user for Storage test, authenticating...${colors.reset}`);
        user = await testAuth();
      }
      await testStorage(user);
    }
    
    console.log(`\n${colors.bright}${colors.green}All tests completed successfully!${colors.reset}`);
  } catch (error) {
    console.error(`\n${colors.bright}${colors.red}Test failed:${colors.reset}`, error);
    process.exit(1);
  }
}

runTests(); 