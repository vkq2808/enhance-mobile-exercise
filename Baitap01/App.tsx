import { StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SplashScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import MainNavigator from './src/navigators/MainNavigator';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

const App = ({ navigation }: any) => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const { getItem } = useAsyncStorage('assetToken');

  const checkLogin = async () => {
    const token = await getItem();
    token && setAccessToken(token);
    if (token) {
      navigation.navigate('MainNavigator');
    } else {
      navigation.navigate('AuthNavigator');
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
            <RootStack.Screen name="MainNavigator" component={MainNavigator} />
          </RootStack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
