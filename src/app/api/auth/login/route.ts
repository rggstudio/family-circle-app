import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    // Check if Firebase Admin is initialized
    if (!adminAuth || !adminDb) {
      console.error('Firebase Admin not initialized properly');
      return NextResponse.json(
        { message: 'Server configuration error. Please check server logs.' },
        { status: 500 }
      );
    }

    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Verify the user credentials
    const userRecord = await adminAuth.getUserByEmail(email);
    
    // Get the user from Firestore
    const userDoc = await adminDb.collection('users').doc(userRecord.uid).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    const userData = userDoc.data();
    
    // Create a custom token for the client
    const token = await adminAuth.createCustomToken(userRecord.uid);
    
    // Get family data if user has a family
    let family = undefined;
    if (userData?.familyId) {
      const familyDoc = await adminDb.collection('families').doc(userData.familyId).get();
      if (familyDoc.exists) {
        family = {
          id: familyDoc.id,
          ...familyDoc.data()
        };
      }
    }
    
    // Format the user data
    const user = {
      id: userDoc.id,
      ...userData,
      createdAt: userData?.createdAt?.toDate(),
      updatedAt: userData?.updatedAt?.toDate(),
    };
    
    return NextResponse.json({
      user,
      token,
      family
    });
  } catch (error: any) {
    console.error('Login error:', error);
    
    return NextResponse.json(
      { message: error.message || 'Login failed' },
      { status: 401 }
    );
  }
} 