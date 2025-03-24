# Family Circle App

A modern cross-platform mobile application for connecting families, built with Expo and Firebase.

## Tech Stack

- **Framework:** [Expo](https://expo.dev/) (SDK 52)
- **Authentication:** [Firebase Authentication](https://firebase.google.com/products/auth)
- **Database:** [Firebase](https://firebase.google.com/)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **UI Components:** [React Native](https://reactnative.dev/) with Expo's built-in components
- **Icons:** [@expo/vector-icons](https://docs.expo.dev/guides/icons/)
- **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## Prerequisites

Before you begin, ensure you have the following:

- Node.js 18+ installed
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally
- A [Firebase](https://firebase.google.com/) project for authentication and backend services
- (Optional) [Expo Go](https://expo.dev/client) app installed on your mobile device

## Getting Started

<<<<<<< HEAD
1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd family-circle
   ```

2. **Install dependencies**
=======
1. **Install dependencies**
>>>>>>> 4b3f4ae (Initial commit)

   ```bash
   npm install
   ```

2. **Environment Variables Setup**

   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in the environment variables in `.env` (see Configuration section below)

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run the app:**
   - Scan the QR code with Expo Go (Android)
   - Scan the QR code with Camera app (iOS)
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

## Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add an app to your project (iOS and Android)
4. Copy the Firebase configuration object
5. Set up the necessary Firebase services (Authentication, Firestore, etc.)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

## Project Structure

```
family-circle-app/
├── app/                # Expo Router pages
├── components/         # React Native components
├── constants/         # Constants and configurations
├── hooks/             # Custom hooks
└── assets/            # Static assets
```

## Features

- 🔐 Firebase Authentication
- 📦 Firebase Realtime Database/Firestore
- 📱 Cross-platform (iOS & Android)
- 🎨 Modern UI with native components
- 🚀 File-based routing with Expo Router
- 🔄 Real-time Updates
- 📱 Responsive Design
- 💫 Smooth animations with Reanimated

<<<<<<< HEAD
## Project Structure

```
family-circle/
├── app/                # Expo Router pages
├── components/         # React Native components
├── constants/         # Constants and configurations
├── hooks/             # Custom hooks
├── assets/            # Static assets
└── documentation/     # Generated documentation from CodeGuide
```

## Documentation Setup

The documentation folder contains all the generated markdown files from CodeGuide:

```bash
documentation/
├── project_requirements_document.md
├── app_flow_document.md
├── frontend_guideline_document.md
└── backend_structure_document.md
```

These documentation files serve as a reference for your project's features and implementation details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

=======
>>>>>>> 4b3f4ae (Initial commit)
## Learn More

To learn more about the technologies used in this project:

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

## Join the community

Join our community of developers creating universal apps:

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
