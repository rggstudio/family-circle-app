import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// In a real app, you would use a database
// This is a simple in-memory store for demonstration
// We're importing the same users array from the register route
// In a real app, this would be a database query
import { users, families } from '../register/route';

interface User {
  id: string;
  email: string;
  password: string;
  familyId?: string;
  [key: string]: any;
}

interface Family {
  id: string;
  [key: string]: any;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = users.find((user: User) => user.email === email);
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Find user's family
    const family = user.familyId 
      ? families.find((f: Family) => f.id === user.familyId) 
      : undefined;

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
    console.error('Login error:', error);
    return NextResponse.json(
      { message: error.message || 'Server error' },
      { status: 500 }
    );
  }
} 