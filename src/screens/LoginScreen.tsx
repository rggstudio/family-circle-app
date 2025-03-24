import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

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
          Welcome Back
        </Text>
        
        <Text style={{ 
          color: '#999999', 
          fontSize: 20,
          marginBottom: 40
        }}>
          Log in to connect with your family
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

          <View>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999999"
              secureTextEntry={!isPasswordVisible}
              style={{
                backgroundColor: '#333333',
                borderRadius: 12,
                padding: 16,
                fontSize: 18,
                color: 'white',
                paddingRight: 50
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 16,
                top: 16
              }}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons 
                name={isPasswordVisible ? "eye-off" : "eye"} 
                size={24} 
                color="#999999" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity 
          style={{ marginTop: 16 }}
          onPress={() => navigation.replace('ForgotPassword')}
        >
          <Text style={{ color: '#FF8C00', fontSize: 16, textAlign: 'right' }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
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
            LOG IN
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 24
        }}>
          <Text style={{ color: '#999999', fontSize: 16 }}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
            <Text style={{ color: '#FF8C00', fontSize: 16 }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen; 