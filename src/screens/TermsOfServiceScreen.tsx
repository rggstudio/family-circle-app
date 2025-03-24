import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type TermsOfServiceScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TermsOfService'>;

const TermsOfServiceScreen: React.FC = () => {
  const navigation = useNavigation<TermsOfServiceScreenNavigationProp>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333333'
      }}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ padding: 8 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FF8A00" />
        </TouchableOpacity>
        <Text style={{ 
          color: 'white', 
          fontSize: 20, 
          fontWeight: 'bold',
          marginLeft: 16
        }}>
          Terms of Service
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Family Circle Terms of Service
        </Text>
        
        <Text style={{ color: '#999999', fontSize: 16, marginBottom: 24 }}>
          Last updated: March 2024
        </Text>

        <View style={{ gap: 24 }}>
          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              1. Acceptance of Terms
            </Text>
            <Text style={{ color: '#999999', fontSize: 16, lineHeight: 24 }}>
              By accessing and using Family Circle, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of the terms, you may not access the service.
            </Text>
          </View>

          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              2. User Accounts
            </Text>
            <Text style={{ color: '#999999', fontSize: 16, lineHeight: 24 }}>
              When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </Text>
          </View>

          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              3. Privacy
            </Text>
            <Text style={{ color: '#999999', fontSize: 16, lineHeight: 24 }}>
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using Family Circle, you agree to our privacy practices.
            </Text>
          </View>

          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              4. Content
            </Text>
            <Text style={{ color: '#999999', fontSize: 16, lineHeight: 24 }}>
              Users are responsible for the content they share within their family circles. Content must not violate any applicable laws or regulations. We reserve the right to remove any content that violates these terms.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsOfServiceScreen; 