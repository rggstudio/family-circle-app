import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type PrivacyPolicyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PrivacyPolicy'>;

const PrivacyPolicyScreen: React.FC = () => {
  const navigation = useNavigation<PrivacyPolicyScreenNavigationProp>();

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
          Privacy Policy
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Family Circle Privacy Policy
        </Text>
        
        <Text style={{ color: '#999999', fontSize: 16, marginBottom: 24 }}>
          Last updated: March 2024
        </Text>

        <View style={{ gap: 24 }}>
          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              1. Information We Collect
            </Text>
            <Text style={{ color: '#999999', fontSize: 16, lineHeight: 24 }}>
              We collect information that you provide directly to us, including your name, email address, profile photo, and any content you share within your family circle. We also collect certain technical information about your device and how you use Family Circle.
            </Text>
          </View>

          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              2. How We Use Your Information
            </Text>
            <Text style={{ color: '#999999', fontSize: 16, lineHeight: 24 }}>
              We use the information we collect to provide, maintain, and improve Family Circle, to communicate with you, and to personalize your experience. We do not sell your personal information to third parties.
            </Text>
          </View>

          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              3. Data Security
            </Text>
            <Text style={{ color: '#999999', fontSize: 16, lineHeight: 24 }}>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </Text>
          </View>

          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              4. Your Rights
            </Text>
            <Text style={{ color: '#999999', fontSize: 16, lineHeight: 24 }}>
              You have the right to access, correct, or delete your personal information. You can also request a copy of your data or object to its processing. Contact us to exercise these rights.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen; 