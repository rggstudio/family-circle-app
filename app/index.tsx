import React, { useState, useRef, useEffect } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  Image,
  Dimensions, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet,
  Platform,
  ScrollView,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Debugging logs
  useEffect(() => {
    console.log("Welcome screen mounted");
    console.log("Auth state:", { user: user ? "Logged in" : "Not logged in", loading });
  }, [user, loading]);

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user && !loading) {
      console.log("Redirecting to home");
      router.replace('/home');
    }
  }, [user, loading, router]);

  // Match image names with what's in the assets folder
  const carouselImages = [
    require('../assets/images/Home-1.png'),
    require('../assets/images/Home-2.png'),
    require('../assets/images/Home-3.png'),
    require('../assets/images/Home-4.png'),
    require('../assets/images/Home-5.png'),
  ];

  // Auto advance carousel every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollViewRef.current) {
        const nextIndex = (activeSlide + 1) % carouselImages.length;
        scrollViewRef.current.scrollTo({
          x: nextIndex * width,
          animated: true
        });
        setActiveSlide(nextIndex);
      }
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, [activeSlide, carouselImages.length]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    if (index >= 0) {
      setActiveSlide(index);
    }
  };

  const onSignUp = () => {
    console.log("Navigating to signup");
    router.push('/signup');
  };

  const onLogin = () => {
    console.log("Navigating to login");
    router.push('/login');
  };

  // Show loading screen while checking auth status
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>FAMILY CIRCLE</Text>
      </View>
      
      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {carouselImages.map((image, index) => (
            <View key={index} style={styles.carouselItem}>
              <Image 
                source={image}
                style={styles.carouselImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>
        
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {carouselImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeSlide ? styles.paginationDotActive : styles.paginationDotInactive
              ]}
            />
          ))}
        </View>
      </View>
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={onSignUp}
          activeOpacity={0.8}
        >
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={onLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 40,
    marginBottom: 10,
  },
  headerText: {
    color: '#FF8C00',
    fontWeight: 'bold',
    fontSize: 30,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: width * 0.95,
    height: height * 0.6,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  paginationDotActive: {
    backgroundColor: '#FF8C00',
  },
  paginationDotInactive: {
    backgroundColor: '#555555',
  },
  buttonContainer: {
    padding: 20,
    marginBottom: 30,
  },
  signUpButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginButton: {
    borderColor: '#FF8C00',
    borderWidth: 1,
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FF8C00',
    fontWeight: 'bold',
    fontSize: 18,
  },
}); 