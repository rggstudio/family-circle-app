import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Family } from '@/types/auth.types';
import { generateInviteCode } from '@/utils/helpers';

const FAMILIES_COLLECTION = 'families';

// Convert Firestore data to Family object
const convertFamily = (doc: any): Family => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    inviteCode: data.inviteCode,
    createdBy: data.createdBy,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
};

// Create a new family
export const createFamily = async (userId: string, familyName: string): Promise<Family> => {
  const familiesRef = collection(db, FAMILIES_COLLECTION);
  const newFamilyRef = doc(familiesRef);
  
  const inviteCode = generateInviteCode();
  
  const newFamily = {
    name: familyName,
    inviteCode,
    createdBy: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  
  await setDoc(newFamilyRef, newFamily);
  
  // Get the family to return
  const familyDoc = await getDoc(newFamilyRef);
  if (!familyDoc.exists()) {
    throw new Error('Failed to create family');
  }
  
  return convertFamily(familyDoc);
};

// Get family by ID
export const getFamilyById = async (familyId: string): Promise<Family | null> => {
  const familyRef = doc(db, FAMILIES_COLLECTION, familyId);
  const familyDoc = await getDoc(familyRef);
  
  if (!familyDoc.exists()) {
    return null;
  }
  
  return convertFamily(familyDoc);
};

// Get family by invite code
export const getFamilyByInviteCode = async (inviteCode: string): Promise<Family | null> => {
  const familiesRef = collection(db, FAMILIES_COLLECTION);
  const q = query(familiesRef, where('inviteCode', '==', inviteCode));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }
  
  return convertFamily(querySnapshot.docs[0]);
};

// Update family
export const updateFamily = async (familyId: string, familyData: Partial<Family>): Promise<Family> => {
  const familyRef = doc(db, FAMILIES_COLLECTION, familyId);
  
  const updateData = {
    ...familyData,
    updatedAt: serverTimestamp(),
  };
  
  await updateDoc(familyRef, updateData);
  
  // Get the updated family
  const familyDoc = await getDoc(familyRef);
  if (!familyDoc.exists()) {
    throw new Error('Family not found');
  }
  
  return convertFamily(familyDoc);
}; 