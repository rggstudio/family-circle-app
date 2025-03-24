# Tech Stack

This project uses the following tech stack:

1. **Core Framework and Runtime:**

   - **Expo (v52.0.35)**: The main framework used for building the React Native application
     - Managed workflow for easier development and updates
     - Expo's build service for consistent cross-platform builds
     - OTA (Over-The-Air) updates capability
     - Core configuration in `app.json`
   - **React Native (v0.76.7)**: The underlying UI framework for building native applications
     - Components directory: `components/`
     - Hooks directory: `hooks/`
   - **TypeScript**: Used for type-safe development
     - Types directory: `types/`
     - Configuration in `tsconfig.json`

2. **Authentication and Backend:**

   - **Firebase (v11.3.1)**: Used as the main backend service
     - Authentication via `@react-native-firebase/auth` (v21.10.0)
     - Core Firebase functionality via `@react-native-firebase/app` (v21.10.0)
     - Best practices include:
       - Implementing proper security rules
       - Using Firebase Authentication for secure user management
       - Proper error handling and logging
       - Performance monitoring

3. **Navigation and Screen Management:**

   - **Expo Router (v4.0.17)**: For handling navigation and routing
   - **React Navigation**: Including Bottom Tabs (v7.2.0) and Native Navigation (v7.0.14)
     - Best practices include:
       - Proper navigation structure
       - Efficient parameter passing
       - Android back button handling
       - Navigation lifecycle management

4. **UI Components and Features:**

   - **Expo Vector Icons (v14.0.2)**: For consistent icon usage across platforms
   - **Expo Blur (v14.0.3)**: For blur effects
   - **Expo Haptics (v14.0.1)**: For haptic feedback
   - **React Native Gesture Handler (v2.20.2)**: For native-driven gesture handling
   - **React Native Reanimated (v3.16.1)**: For high-performance animations
   - **React Native Safe Area Context (v4.12.0)**: For safe area management
   - **React Native WebView (v13.12.5)**: For web content rendering

5. **Development Tools and Utilities:**

   - **Jest (v29.2.1)**: For testing
     - Jest Expo preset for testing Expo applications
     - Test configuration in `package.json`
   - **Environment Management**:
     - `dotenv` (v16.4.7) for environment variables
     - `react-native-dotenv` (v3.4.11) for React Native specific env handling

6. **Core Features and Best Practices:**

   - **Performance Optimization**:

     - Proper use of React.memo and useMemo
     - Efficient gesture handling
     - Animation performance optimization
     - WebView optimization

   - **Security**:

     - Secure authentication flow
     - Proper data protection
     - Input validation
     - Secure storage practices

   - **Code Quality**:

     - TypeScript for type safety
     - Component-based architecture
     - Proper state management
     - Comprehensive testing

   - **Native Features**:
     - Proper use of Expo APIs
     - Native gesture implementation
     - Platform-specific optimizations

7. **Development Workflow:**

   - Scripts available:
     - `npm start`: Launch Expo development server
     - `npm run android`: Start Android development
     - `npm run ios`: Start iOS development
     - `npm run web`: Start web development
     - `npm test`: Run tests
     - `npm run lint`: Run linting
     - `npm run reset-project`: Reset project state

This tech stack provides a robust foundation for building a scalable, secure, and user-friendly mobile application with all the modern features expected in a professional product. The combination of Expo, Firebase, and React Native allows for rapid development while maintaining high performance and native functionality.
