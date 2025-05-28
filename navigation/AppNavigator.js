import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfigSetting.js';

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDoc = await getDoc(doc(db, 'users', authUser.uid));
        const userData = userDoc.data();
        if (userData && userData.status === 'approved') {
          setUser({ ...authUser, role: userData.role });
        } else {
          setUser(null);
          Alert.alert('Thông báo', 'Tài khoản của bạn đang chờ phê duyệt.');
        }
      } else {
        setUser(null);
      }
      setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang Chủ' }} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Đăng Nhập' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Đăng Ký' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;