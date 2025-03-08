import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// In a real app, you would use a database
// This is a simple in-memory store for demonstration
export const users: any[] = [];
export const families: any[] = [];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, password, familyName, familyCode, profileImage } = data;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userId = uuidv4();
    const now = new Date();
    
    let familyId: string | undefined;
    let family: any | undefined;

    // Handle family creation or joining
    if (familyCode) {
      // Join existing family
      family = families.find(f => f.inviteCode === familyCode);
      
      if (!family) {
        return NextResponse.json(
          { message: 'Invalid family invite code' },
          { status: 400 }
        );
      }
      
      familyId = family.id;
    } else if (familyName) {
      // Create new family
      familyId = uuidv4();
      const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      family = {
        id: familyId,
        name: familyName,
        inviteCode,
        createdBy: userId,
        createdAt: now,
        updatedAt: now
      };
      
      families.push(family);
    }

    // Create user object
    const user = {
      id: userId,
      name,
      email,
      password: hashedPassword,
      profileImage,
      familyId,
      isAdmin: familyId ? family?.createdBy === userId : false,
      createdAt: now,
      updatedAt: now
    };

    // Save user
    users.push(user);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Return user data (without password) and token
    const { password: _, ...userResponse } = user;

    return NextResponse.json({
      user: userResponse,
      token,
      family
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: error.message || 'Server error' },
      { status: 500 }
    );
  }
} 