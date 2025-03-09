import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { generateInviteCode } from '@/utils/helpers';

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

    const { name, email, password, familyName, familyCode, profileImage } = await request.json();
    
    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    try {
      const existingUser = await adminAuth.getUserByEmail(email);
      if (existingUser) {
        return NextResponse.json(
          { message: 'Email already in use' },
          { status: 400 }
        );
      }
    } catch (error: any) {
      // If error.code is auth/user-not-found, that's what we want
      if (error.code !== 'auth/user-not-found') {
        throw error;
      }
    }
    
    // Create user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });
    
    // Handle family creation or joining
    let familyId;
    let family;
    
    if (familyName) {
      // Create a new family
      const inviteCode = generateInviteCode();
      
      const newFamilyRef = adminDb.collection('families').doc();
      await newFamilyRef.set({
        name: familyName,
        inviteCode,
        createdBy: userRecord.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      familyId = newFamilyRef.id;
      
      // Get the created family
      const familyDoc = await newFamilyRef.get();
      family = {
        id: familyDoc.id,
        ...familyDoc.data(),
      };
    } else if (familyCode) {
      // Join an existing family
      const familiesRef = adminDb.collection('families');
      const familyQuery = await familiesRef.where('inviteCode', '==', familyCode).get();
      
      if (familyQuery.empty) {
        return NextResponse.json(
          { message: 'Invalid family code' },
          { status: 400 }
        );
      }
      
      const familyDoc = familyQuery.docs[0];
      familyId = familyDoc.id;
      family = {
        id: familyDoc.id,
        ...familyDoc.data(),
      };
    }
    
    // Create user in Firestore
    const userRef = adminDb.collection('users').doc(userRecord.uid);
    await userRef.set({
      name,
      email,
      profileImage: profileImage || null,
      familyId: familyId || null,
      isAdmin: familyName ? true : false, // Admin if creating a new family
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Get the created user
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    
    // Create a custom token for the client
    const token = await adminAuth.createCustomToken(userRecord.uid);
    
    // Format the user data
    const user = {
      id: userDoc.id,
      ...userData,
    };
    
    return NextResponse.json({
      user,
      token,
      family
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    return NextResponse.json(
      { message: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
} 