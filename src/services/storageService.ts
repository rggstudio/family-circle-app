"use client";

import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll,
  UploadResult
} from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Validate file size
 * @param file The file to validate
 * @param maxSize Maximum file size in bytes (default: 5MB)
 */
const validateFileSize = (file: File, maxSize: number = MAX_FILE_SIZE): void => {
  if (file.size > maxSize) {
    throw new Error(`File size exceeds maximum limit of ${maxSize / (1024 * 1024)}MB`);
  }
};

/**
 * Upload a file to Firebase Storage
 * @param file The file to upload
 * @param path The path in storage (e.g., 'profile_images')
 * @param customFileName Optional custom file name
 * @returns The download URL of the uploaded file
 */
export const uploadFile = async (
  file: File, 
  path: string,
  customFileName?: string
): Promise<string> => {
  try {
    // Validate file size
    validateFileSize(file);
    
    // Generate a unique file name if not provided
    const fileName = customFileName || `${uuidv4()}_${file.name}`;
    const filePath = `${path}/${fileName}`;
    const storageRef = ref(storage, filePath);
    
    // Upload the file
    const snapshot: UploadResult = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Upload a profile image
 * @param file The image file to upload
 * @param userId The user ID
 * @returns The download URL of the uploaded image
 */
export const uploadProfileImage = async (file: File, userId: string): Promise<string> => {
  // Extract file extension
  const fileExtension = file.name.split('.').pop();
  const fileName = `${userId}.${fileExtension}`;
  
  return uploadFile(file, 'profile_images', fileName);
};

/**
 * Upload a family photo
 * @param file The image file to upload
 * @param familyId The family ID
 * @returns The download URL of the uploaded image
 */
export const uploadFamilyPhoto = async (file: File, familyId: string): Promise<string> => {
  return uploadFile(file, `family_photos/${familyId}`);
};

/**
 * Delete a file from Firebase Storage
 * @param url The download URL of the file to delete
 */
export const deleteFile = async (url: string): Promise<void> => {
  try {
    // Extract the path from the URL
    const fileRef = ref(storage, url);
    
    // Delete the file
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Get all files in a directory
 * @param path The path in storage (e.g., 'family_photos/123')
 * @returns Array of download URLs
 */
export const getFilesInDirectory = async (path: string): Promise<string[]> => {
  try {
    const directoryRef = ref(storage, path);
    const result = await listAll(directoryRef);
    
    // Get download URLs for all items
    const urls = await Promise.all(
      result.items.map(itemRef => getDownloadURL(itemRef))
    );
    
    return urls;
  } catch (error) {
    console.error('Error listing files:', error);
    throw new Error(`Failed to list files in directory: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Update a user's profile image, deleting the old one if it exists
 * @param file The new image file
 * @param userId The user ID
 * @param oldImageUrl The URL of the old image to delete (optional)
 * @returns The download URL of the new image
 */
export const updateProfileImage = async (file: File, userId: string, oldImageUrl?: string): Promise<string> => {
  // Upload new image
  const newImageUrl = await uploadProfileImage(file, userId);
  
  // Delete old image if it exists
  if (oldImageUrl) {
    try {
      await deleteFile(oldImageUrl);
    } catch (error) {
      console.warn('Failed to delete old profile image:', error);
    }
  }
  
  return newImageUrl;
}; 