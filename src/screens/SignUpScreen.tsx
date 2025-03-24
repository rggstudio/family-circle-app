import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Alert, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import * as ImagePicker from 'expo-image-picker';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

type CircleOption = 'create' | 'join' | null;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<CircleOption>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photo library to select a profile picture.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings()
            },
            {
              text: 'Cancel',
              style: 'cancel'
            }
          ]
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
      Alert.alert(
        'Error',
        'There was a problem selecting your photo. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar style="light" />

      {/* Close Button */}
      <TouchableOpacity 
        style={{ position: 'absolute', top: 50, right: 20, zIndex: 1 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={24} color="#FF8A00" />
      </TouchableOpacity>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Content */}
        <View style={{ paddingHorizontal: 24, paddingTop: 40 }}>
          <Text style={{ 
            color: 'white', 
            fontSize: 30, 
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 8
          }}>
            Create Account
          </Text>
          
          <Text style={{ 
            color: '#999999', 
            fontSize: 16,
            marginBottom: 32,
            textAlign: 'center'
          }}>
            Sign up to start connecting with your family
          </Text>

          {/* Profile Photo */}
          <TouchableOpacity 
            style={{ alignItems: 'center', marginBottom: 32 }}
            onPress={pickImage}
          >
            <View style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#333333',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              {profileImage ? (
                <Image 
                  source={{ uri: profileImage }} 
                  style={{ width: '100%', height: '100%', borderRadius: 50 }}
                />
              ) : (
                <Ionicons name="person" size={50} color="#666666" />
              )}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#FF8A00',
                  borderRadius: 15,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: 'black',
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
              >
                <Ionicons name="camera" size={16} color="white" />
              </View>
            </View>
            <Text style={{ color: 'white', fontSize: 16, marginTop: 8 }}>
              Add Profile Photo
            </Text>
          </TouchableOpacity>

          {/* Form */}
          <View style={{ gap: 16 }}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#999999"
              style={{
                backgroundColor: '#333333',
                borderRadius: 12,
                padding: 16,
                fontSize: 18,
                color: 'white'
              }}
            />

            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#999999"
              style={{
                backgroundColor: '#333333',
                borderRadius: 12,
                padding: 16,
                fontSize: 18,
                color: 'white'
              }}
            />

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
                placeholder="Create a password"
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

          {/* Family Circle Options */}
          <View style={{ marginTop: 24 }}>
            <Text style={{ 
              color: 'white', 
              fontSize: 24, 
              fontWeight: 'bold',
              marginBottom: 16 
            }}>
              Family Circle
            </Text>
            
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: selectedOption === 'create' ? '#FF8A00' : '#333333',
                  borderRadius: 12,
                  padding: 16,
                  alignItems: 'center'
                }}
                onPress={() => setSelectedOption('create')}
              >
                <Text style={{ 
                  color: 'white', 
                  fontSize: 12, 
                  fontWeight: 'bold',
                  marginBottom: 4
                }}>
                  Create Family Circle
                </Text>
                <Text style={{ 
                  color: selectedOption === 'create' ? 'white' : '#999999',
                  fontSize: 10,
                  textAlign: 'center'
                }}>
                  Start a new circle as admin
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: selectedOption === 'join' ? '#FF8A00' : '#333333',
                  borderRadius: 12,
                  padding: 16,
                  alignItems: 'center'
                }}
                onPress={() => setSelectedOption('join')}
              >
                <Text style={{ 
                  color: 'white', 
                  fontSize: 12, 
                  fontWeight: 'bold',
                  marginBottom: 4
                }}>
                  Join Family Circle
                </Text>
                <Text style={{ 
                  color: selectedOption === 'join' ? 'white' : '#999999',
                  fontSize: 10,
                  textAlign: 'center'
                }}>
                  Enter an invite code to join
                </Text>
              </TouchableOpacity>
            </View>

            {/* Conditional Input based on selection */}
            {selectedOption === 'create' && (
              <TextInput
                placeholder="Family Name (Ex: Smith Family)"
                placeholderTextColor="#999999"
                style={{
                  backgroundColor: '#333333',
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 18,
                  color: 'white',
                  marginTop: 16
                }}
              />
            )}

            {selectedOption === 'join' && (
              <TextInput
                placeholder="Invite Code"
                placeholderTextColor="#999999"
                style={{
                  backgroundColor: '#333333',
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 18,
                  color: 'white',
                  marginTop: 16
                }}
              />
            )}
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#FF8A00',
              borderRadius: 40,
              paddingVertical: 16,
              alignItems: 'center',
              marginTop: 32
            }}
            activeOpacity={0.8}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              SIGN UP
            </Text>
          </TouchableOpacity>

          {/* Terms and Privacy */}
          <Text style={{ 
            color: '#999999', 
            fontSize: 14,
            textAlign: 'center',
            marginTop: 16
          }}>
            By signing up, you agree to our{' '}
            <Text 
              style={{ color: '#FF8A00' }}
              onPress={() => navigation.navigate('TermsOfService')}
            >
              Terms of Service
            </Text>
            {' '}and{' '}
            <Text 
              style={{ color: '#FF8A00' }}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            >
              Privacy Policy
            </Text>
          </Text>

          {/* Login Link */}
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16
          }}>
            <Text style={{ color: '#999999', fontSize: 16 }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={{ color: '#FF8A00', fontSize: 16 }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen; 