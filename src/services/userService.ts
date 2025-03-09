import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from '@/types/auth.types';

const USERS_COLLECTION = 'users';

// Convert Firestore data to User object
const convertUser = (doc: any): User => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    email: data.email,
    profileImage: data.profileImage || null,
    familyId: data.familyId || null,
    isAdmin: data.isAdmin,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
};

// Create a new user
export const createUser = async (userId: string, userData: Partial<User>): Promise<User> => {
  const userRef = doc(db, USERS_COLLECTION, userId);
  
  // Ensure no undefined values are sent to Firestore
  const sanitizedUserData = {
    name: userData.name || '',
    email: userData.email || '',
    profileImage: userData.profileImage || null,
    familyId: userData.familyId || null,
    isAdmin: userData.familyId ? false : true, // Admin if creating a new family
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  
  await setDoc(userRef, sanitizedUserData);
  
  // Get the user to return
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    throw new Error('Failed to create user');
  }
  
  return convertUser(userDoc);
};

// Get user by ID
export const getUserById = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    return null;
  }
  
  return convertUser(userDoc);
};

// Get user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }
  
  return convertUser(querySnapshot.docs[0]);
};

// Update user
export const updateUser = async (userId: string, userData: Partial<User>): Promise<User> => {
  const userRef = doc(db, USERS_COLLECTION, userId);
  
  // Ensure no undefined values are sent to Firestore
  const updateData: Record<string, any> = { updatedAt: serverTimestamp() };
  
  // Only include defined fields
  if (userData.name !== undefined) updateData.name = userData.name;
  if (userData.email !== undefined) updateData.email = userData.email;
  if (userData.profileImage !== undefined) updateData.profileImage = userData.profileImage || null;
  if (userData.familyId !== undefined) updateData.familyId = userData.familyId || null;
  if (userData.isAdmin !== undefined) updateData.isAdmin = userData.isAdmin;
  
  await updateDoc(userRef, updateData);
  
  // Get the updated user
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    throw new Error('User not found');
  }
  
  return convertUser(userDoc);
};

// Get users by family ID
export const getUsersByFamilyId = async (familyId: string): Promise<User[]> => {
  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(usersRef, where('familyId', '==', familyId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(convertUser);
}; 