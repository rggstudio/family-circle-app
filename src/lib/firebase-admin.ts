import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Variables to hold our instances
let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  try {
    // Check if we have a service account key
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY || 
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY === '{"type":"service_account","project_id":"your-project-id"}') {
      console.warn('Firebase Admin SDK service account key is missing or using placeholder value.');
      console.warn('Some server-side Firebase features may not work correctly.');
      console.warn('Please set the FIREBASE_SERVICE_ACCOUNT_KEY environment variable in your .env.local file.');
      
      // Initialize with a minimal config for development
      if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        adminApp = initializeApp({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
        console.log('Firebase Admin initialized with minimal config for development');
      } else {
        throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is required for minimal Firebase Admin initialization');
      }
    } else {
      // Parse the service account key
      try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        adminApp = initializeApp({
          credential: cert(serviceAccount),
        });
        console.log('Firebase Admin initialized with service account');
      } catch (parseError) {
        console.error('Error parsing Firebase service account JSON:', parseError);
        throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT_KEY format');
      }
    }
    
    // Initialize services
    adminAuth = getAuth(adminApp);
    adminDb = getFirestore(adminApp);
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    // We'll leave the variables as null
  }
} else {
  // Get existing app
  adminApp = getApps()[0];
  adminAuth = getAuth(adminApp);
  adminDb = getFirestore(adminApp);
  console.log('Using existing Firebase Admin app');
}

export { adminApp, adminAuth, adminDb }; 