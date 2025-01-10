import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { appInfo } from '../../constants/appInfo';

// Định nghĩa kiểu cho các route trong navigator
type RootStackParamList = {
  OTPScreen: { email: string, initialEmail: string };
  MainNavigator: undefined;
  AuthNavigator: { screen: string };
};

// Kiểu cho route của OTPScreen
type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTPScreen'>;
// Kiểu cho navigation của OTPScreen
type OTPScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTPScreen'>;

const OTPScreen = () => {
  const route = useRoute<OTPScreenRouteProp>();
  const navigation = useNavigation<OTPScreenNavigationProp>();

  // Kiểm tra route.params có tồn tại không
  const email = route.params?.email;
  const initialEmail = route.params?.initialEmail;
  if (!email) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Email không được truyền qua params</Text>
      </View>
    );
  }

  const [otp, setOtp] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${appInfo.API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, email: initialEmail }),
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert('Thành công', 'OTP đã được xác nhận');
        navigation.navigate('MainNavigator');
      } else {
        Alert.alert('Lỗi', data.message || 'Xác nhận OTP thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi xác nhận OTP:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi xác nhận OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập OTP</Text>
      <Text style={styles.subtitle}>Mã OTP đã được gửi tới email: {email}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
