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
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
  },
});
