import { Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/family-circle-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Family Circle
        </ThemedText>

        <ThemedText style={styles.description}>
          Connect with your loved ones through shared moments, events, and memories.
        </ThemedText>

        <ThemedView style={styles.featuresContainer}>
          <ThemedText type="subtitle" style={styles.featuresTitle}>
            Features
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            • Share family updates and photos
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            • Plan and coordinate family events
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            • Create shared lists and tasks
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            • Chat with family members
          </ThemedText>
          <ThemedText style={styles.featureItem}>
            • Keep memories in one place
          </ThemedText>
        </ThemedView>

        <Link href="/create-post" asChild>
          <ThemedView style={styles.ctaButton}>
            <ThemedText style={styles.ctaText}>Create Post</ThemedText>
          </ThemedView>
        </Link>
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
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    marginTop: 20,
    marginBottom: 32,
  },
  featuresTitle: {
    marginBottom: 16,
  },
  featureItem: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
