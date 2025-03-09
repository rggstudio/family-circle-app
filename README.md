# Family Circle App

A central hub for sharing family news, events, photos, and messages.

## Features

- User authentication (login, registration)
- Family creation and joining via invite codes
- Protected routes for authenticated users
- Real-time database with Firebase
- File storage for profile images and family photos

## Tech Stack

- Next.js 15
- React
- TypeScript
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- A Firebase account

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app to your project
4. Enable Authentication (Email/Password)
5. Create a Firestore database
6. Set up Storage:
   - In the Firebase console, go to "Storage"
   - Click "Get started" and choose "Start in test mode"
   - Select a location for your storage bucket

### Quick Setup

We've created a setup assistant to help you configure Firebase:

```bash
node scripts/setup-firebase.js
```

This script will:
- Check if your Firebase configuration is set up correctly
- Provide instructions on how to create a Firebase project
- Generate a template .env.local file if needed

### Manual Configuration

1. Copy the Firebase configuration to your `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

2. Generate a Firebase Admin SDK service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Convert the JSON to a string and add it to your `.env.local` file:

```
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
```

You can use our helper script to convert the JSON file:

```bash
# Save your service account key as service-account.json in the project root
node scripts/convert-service-account.js
```

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing Firebase Integration

We've created a comprehensive testing page to verify all aspects of your Firebase implementation:

1. Navigate to `/firebase-test` in your browser
2. This page allows you to test:
   - **Authentication**: Register, login, and logout
   - **Firestore Database**: Create and read test messages
   - **Firebase Storage**: Upload files and view them in a gallery

### Testing Authentication

1. Use the Register form to create a new user
2. Use the Login form to sign in with existing credentials
3. Use the Logout button to sign out
4. Verify that the "Current User" section updates accordingly

### Testing Firestore Database

1. Sign in using the Authentication section
2. Enter a message in the "Add Test Message" input
3. Click "Add Message" to save it to Firestore
4. Click "Refresh Messages" to fetch the latest messages
5. Verify that your message appears in the list

### Testing Firebase Storage

1. Sign in using the Authentication section
2. Click "Upload Test File" and select an image
3. Verify that the image uploads successfully and the URL is displayed
4. Check that the image appears in the "Test Files Gallery" section

### Security Rules

The repository includes security rules for both Firestore and Storage:

- `firestore.rules`: Controls access to your Firestore database
- `storage.rules`: Controls access to your Firebase Storage

To deploy these rules:

```bash
firebase deploy --only firestore:rules,storage:rules
```

## Firebase Storage Usage

The app uses Firebase Storage for storing files like profile images and family photos. Here's how to use it:

### File Upload Component

```jsx
import FileUploader from '@/components/common/FileUploader';

// In your component
<FileUploader 
  path="profile_images"
  onUploadSuccess={(url) => console.log('Uploaded file URL:', url)}
  buttonText="Upload Profile Picture"
/>
```

### Image Gallery Component

```jsx
import ImageGallery from '@/components/common/ImageGallery';

// In your component
<ImageGallery 
  path="family_photos/your-family-id"
  title="Family Photos"
/>
```

### Storage Costs

Firebase Storage has a generous free tier:
- 5GB of storage
- 1GB/day of downloads
- 20,000/day upload operations
- 50,000/day download operations

For most family applications, this free tier is sufficient for development and early usage.

## Troubleshooting

### Firebase Authentication Errors

If you see errors like `FirebaseError: Firebase: Error (auth/invalid-api-key)`, check the following:

1. Make sure you've set up your `.env.local` file with the correct Firebase configuration
2. Verify that the API key is correct and not using placeholder values
3. Run the setup assistant to check your configuration:

```bash
node scripts/setup-firebase.js
```

### Server-side Firebase Errors

If you encounter errors with the Firebase Admin SDK:

1. Make sure you've generated a service account key and added it to your `.env.local` file
2. Check that the service account key is properly formatted (use the convert-service-account.js script)
3. Verify that your Firebase project has Firestore enabled

### CORS Issues

If you encounter CORS errors:

1. Make sure your Firebase project has the correct domain added to the authorized domains list
2. Go to Firebase Console > Authentication > Settings > Authorized domains
3. Add `localhost` for local development and your production domain for deployment

## Deployment

The app can be deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Project Structure

```
family-circle-app/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Authentication components
│   │   ├── common/      # Common UI components
│   │   ├── feed/        # Feed and activity components
│   │   ├── layout/      # Layout components (header, navigation)
│   │   ├── profile/     # Profile components
│   │   ├── events/      # Event components
│   │   ├── tasks/       # Task components
│   │   └── messaging/   # Messaging components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── services/        # API services
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
