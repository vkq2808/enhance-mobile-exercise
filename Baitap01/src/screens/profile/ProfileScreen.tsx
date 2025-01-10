import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, TextInput, Text, StyleSheet, ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { appColors } from '../../constants/appColors';
import { appInfo } from '../../constants/appInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('aaa@gmail.com');
  const [phone, setPhone] = useState('0999999999');
  const [address, setAddress] = useState('Bình Dương');
  const [avatar, setAvatar] = useState('');
  const [requireOldPassword, setRequireOldPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${appInfo.API_URL}/user/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setEmail(result.user.email);
        setPhone(result.user.phone);
        setAddress(result.user.address);
        setAvatar(result.user.avatar);
        setInitialEmail(result.user.email);

      } catch (error) {
        console.error('Lỗi lấy thông tin:', error);
      }
    };
    getProfile();
  }, []);

  const updateProfile = async (profileData: any) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${appInfo.API_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      const result = await response.json();
      console.log('Kết quả cập nhật:', result);

      // Kiểm tra kết quả trả về
      if (result.changeEmail === true) {
        // Chuyển tới AuthNavigator, màn hình OTP
        navigation.navigate('AuthNavigator', { screen: 'OTP', params: { email, initialEmail } });
      } else {
        console.log('Không cần chuyển sang OTP');
        // Thực hiện xử lý khác nếu cần
      }
    } catch (error) {
      console.error('Lỗi cập nhật:', error);
    }
  };

  const handleUpdate = () => {
    const profileData = {
      email,
      phone,
      address,
      oldPassword
    };
    updateProfile(profileData);
  };

  useEffect(() => {
    if (email !== initialEmail) {
      setRequireOldPassword(true);
    } else {
      setRequireOldPassword(false);
    }
  }, [email, initialEmail]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={{ uri: avatar || 'https://photo.znews.vn/w660/Uploaded/vpibtwvo/2025_01_31/Betterimage.ai_1738298235454.jpeg' }}
            style={styles.avatar}
          />
          <View style={styles.cameraIcon}>
            <Entypo name="camera" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <Fontisto name="email" size={25} color={appColors.gray || '#808080'} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputField}>
          <Fontisto name="phone" size={25} color={appColors.gray || '#808080'} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputField}>
          <Entypo name="address" size={25} color={appColors.gray || '#808080'} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />
        </View>
        {requireOldPassword && (
          <View style={styles.inputField}>
            <Fontisto name="locked" size={25} color={appColors.gray || '#808080'} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder="Old Password"
              secureTextEntry
            />
          </View>
        )}
      </View>
      {/* Nút cập nhật */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginBottom: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  cameraIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#007AFF',
    padding: 6,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  inputContainer: {
    width: '100%',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
  },
  updateButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
