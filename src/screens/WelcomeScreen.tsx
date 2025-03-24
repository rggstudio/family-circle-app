import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar style="light" />
      
      {/* Title */}
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={{ color: '#FF8C00', fontSize: 32, fontWeight: 'bold' }}>
          FAMILY CIRCLE
        </Text>
      </View>

      {/* Bottom Content */}
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 24, marginBottom: 48 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
          STAY CONNECTED WITH FAMILY
        </Text>
        
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, marginBottom: 32 }}>
          Share photos, updates, and memories in a private space just for your family members to keep everyone connected, no matter the distance.
        </Text>

        {/* Buttons */}
        <View style={{ gap: 16 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF8C00',
              borderRadius: 40,
              paddingVertical: 16,
              alignItems: 'center',
              marginBottom: 16
            }}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              SIGN UP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#333333',
              borderRadius: 40,
              paddingVertical: 16,
              alignItems: 'center'
            }}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              LOG IN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen; 