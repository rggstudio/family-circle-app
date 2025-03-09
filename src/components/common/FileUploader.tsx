"use client";

import React, { useState, useRef } from 'react';
import { uploadFile } from '@/services/storageService';

interface FileUploaderProps {
  onUploadSuccess?: (url: string) => void;
  onUploadError?: (error: Error) => void;
  path: string;
  accept?: string;
  maxSizeMB?: number;
  buttonText?: string;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onUploadSuccess,
  onUploadError,
  path,
  accept = "image/*",
  maxSizeMB = 5,
  buttonText = "Upload File",
  className = "",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    // Add debug info
    setDebugInfo(`Selected file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);

    // Validate file size
    if (file.size > maxSizeBytes) {
      const error = new Error(`File size exceeds ${maxSizeMB}MB limit`);
      setDebugInfo(prev => `${prev}\nError: ${error.message}`);
      onUploadError?.(error);
      return;
    }

    setIsUploading(true);
    setProgress(10);
    setDebugInfo(prev => `${prev}\nStarting upload to path: ${path}`);

    try {
      // Simulate progress (in a real app, you'd use Firebase's upload progress)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return newProgress;
        });
      }, 300);

      // Upload file
      const downloadUrl = await uploadFile(file, path);
      
      clearInterval(progressInterval);
      setProgress(100);
      setDebugInfo(prev => `${prev}\nUpload successful. URL: ${downloadUrl}`);
      
      // Call success callback
      if (onUploadSuccess) {
        onUploadSuccess(downloadUrl);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setDebugInfo(prev => `${prev}\nUpload error: ${error instanceof Error ? error.message : String(error)}`);
      if (onUploadError && error instanceof Error) {
        onUploadError(error);
      }
    } finally {
      setIsUploading(false);
      setProgress(0);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden bg-white text-gray-800"
      />
      
      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
          isUploading 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isUploading ? 'Uploading...' : buttonText}
      </button>
      
      {isUploading && (
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      {/* Debug information */}
      {debugInfo && (
        <div className="mt-2 p-2 bg-gray-100 text-xs text-gray-800 rounded whitespace-pre-line">
          <strong>Debug Info:</strong>
          <br />
          {debugInfo}
        </div>
      )}
    </div>
  );
};

export default FileUploader; 