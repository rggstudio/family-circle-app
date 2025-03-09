"use client";

import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User,
  Family
} from '@/types/auth.types';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUser, getUserById } from './userService';
import { createFamily, getFamilyByInviteCode } from './familyService';

// Token storage keys
const TOKEN_KEY = 'family_circle_token';
const USER_KEY = 'family_circle_user';

/**
 * Register a new user
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    // Create the Firebase auth user
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth, 
      data.email, 
      data.password
    );
    
    const firebaseUser = userCredential.user;
    
    // Handle family creation or joining
    let familyId: string | undefined;
    let family: Family | undefined;
    
    if (data.familyName) {
      // Create a new family
      family = await createFamily(firebaseUser.uid, data.familyName);
      familyId = family.id;
    } else if (data.familyCode) {
      // Join an existing family
      const existingFamily = await getFamilyByInviteCode(data.familyCode);
      if (!existingFamily) {
        throw new Error('Invalid family code');
      }
      familyId = existingFamily.id;
      family = existingFamily;
    }
    
    // Create the user in Firestore
    const userData: Partial<User> = {
      name: data.name,
      email: data.email,
      profileImage: data.profileImage || null,
      familyId: familyId || null,
    };
    
    const user = await createUser(firebaseUser.uid, userData);
    
    // Get the ID token
    const token = await firebaseUser.getIdToken();
    
    // Store token and user data
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    
    return {
      user,
      token,
      family
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(error.message || 'Registration failed');
  }
};

/**
 * Login a user
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    
    const firebaseUser = userCredential.user;
    
    // Get the user from Firestore
    const user = await getUserById(firebaseUser.uid);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Get the ID token
    const token = await firebaseUser.getIdToken();
    
    // Store token and user data
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    
    return {
      user,
      token
    };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed');
  }
};

/**
 * Logout the current user
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    
    // Redirect to login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) {
    return null;
  }
  
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Get the authentication token
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Check if the user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/**
 * Get authorization headers for API requests
 */
export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  
  if (!token) {
    return {};
  }
  
  return {
    'Authorization': `Bearer ${token}`,
  };
}; 