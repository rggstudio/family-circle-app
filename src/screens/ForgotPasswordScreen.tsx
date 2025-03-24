import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar style="light" />

      {/* Close Button */}
      <TouchableOpacity 
        style={{ position: 'absolute', top: 50, right: 20, zIndex: 1 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={24} color="#FF8C00" />
      </TouchableOpacity>

      {/* Content */}
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 100 }}>
        <Text style={{ 
          color: 'white', 
          fontSize: 40, 
          fontWeight: 'bold',
          marginBottom: 8
        }}>
          Reset Password
        </Text>
        
        <Text style={{ 
          color: '#999999', 
          fontSize: 20,
          marginBottom: 40
        }}>
          Enter your email to receive password reset instructions
        </Text>

        {/* Form */}
        <View style={{ gap: 16 }}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999999"
            style={{
              backgroundColor: '#333333',
              borderRadius: 12,
              padding: 16,
              fontSize: 18,
              color: 'white'
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#FF8C00',
            borderRadius: 40,
            paddingVertical: 16,
            alignItems: 'center',
            marginTop: 32
          }}
          activeOpacity={0.8}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            SEND RESET LINK
          </Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 24
        }}>
          <Text style={{ color: '#999999', fontSize: 16 }}>
            Remember your password?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={{ color: '#FF8C00', fontSize: 16 }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen; 