import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase config is properly set
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your-api-key-here') {
  console.error(
    'Firebase API key is missing or using placeholder value. Please set the NEXT_PUBLIC_FIREBASE_API_KEY environment variable in your .env.local file.'
  );
}

// Check if Storage bucket is properly set
if (!firebaseConfig.storageBucket || firebaseConfig.storageBucket === 'your-project-id.appspot.com') {
  console.error(
    'Firebase Storage bucket is missing or using placeholder value. Please set the NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET environment variable in your .env.local file.'
  );
}

// Log Firebase config for debugging (without sensitive values)
console.log('Firebase config loaded with:');
console.log('- Project ID:', firebaseConfig.projectId);
console.log('- Storage Bucket:', firebaseConfig.storageBucket);

// Initialize Firebase
let app;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
  console.log('Firebase initialized successfully');
  console.log('Storage bucket initialized:', firebaseConfig.storageBucket);
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Create fallback objects to prevent app from crashing
  // These won't work but will prevent null reference errors
  app = null;
  db = null as unknown as Firestore;
  auth = null as unknown as Auth;
  storage = null as unknown as FirebaseStorage;
}

export { app, db, auth, storage }; 