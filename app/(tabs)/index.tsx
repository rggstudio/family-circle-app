<<<<<<< HEAD
import { Image, StyleSheet, Linking } from "react-native";
import { Link } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const handleVisitCodeGuide = () => {
    Linking.openURL("https://codeguide.dev");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#ffffff", dark: "#1A1A1A" }}
      headerImage={
        <Image
          source={require("@/assets/images/codeguide-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          CodeGuide Starter Kit
        </ThemedText>

        <ThemedText style={styles.description}>
          A modern cross-platform mobile application starter template built with
          Expo and Firebase, featuring authentication and real-time database
          integration.
        </ThemedText>

        <ThemedView style={styles.ctaContainer}>
          <ThemedView
            style={styles.ctaButton}
            onTouchEnd={handleVisitCodeGuide}
          >
            <ThemedText style={styles.ctaText}>Visit CodeGuide</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.featuresContainer}>
          <ThemedText type="subtitle" style={styles.featuresTitle}>
            Key Features
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            • Firebase Authentication
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            • Real-time Database Integration
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            • Cross-platform Support
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            • Modern UI Components
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            • File-based Routing
          </ThemedText>
        </ThemedView>
=======
import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
>>>>>>> 8bfd731 (Initial commit)
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    height: 120,
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  ctaContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  ctaButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  featuresContainer: {
    marginTop: 20,
  },
  featuresTitle: {
    marginBottom: 16,
  },
  featureItem: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 24,
=======
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
>>>>>>> 8bfd731 (Initial commit)
  },
});
