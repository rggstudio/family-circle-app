export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  familyId?: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Family {
  id: string;
  name: string;
  inviteCode: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  familyName?: string;
  familyCode?: string;
  profileImage?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  family?: Family;
}

export interface AuthError {
  message: string;
  field?: string;
} 