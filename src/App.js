import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AddUserScreen from './AddUserScreen';
import UserScreen from './UserScreen';
import UserDetailScreen from './UserDetailScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {firebase} from '@react-native-firebase/database';

const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor:'blue',
        headerBlurEffect:'regular'
      }}>
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{title: 'Add User'}}
      />
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{title: 'Users List'}}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{title: 'User Detail'}}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  const [appRef, setAppRef] = useState();
  const firebaseConfig = {
    apiKey: 'AIzaSyCbayUoXYnOpZpHW22xoeVEyUAVDV_4FPQ',
    authDomain: 'reactnativetest-541f3.firebaseapp.com',
    databaseURL: 'https://reactnativetest-541f3-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'reactnativetest-541f3',
    storageBucket: 'reactnativetest-541f3-default-rtdb',
    messagingSenderId: '520323794356',
    appId: '1:520323794356:android:a66df044814a0f90d95ee1',
    measurementId: 'G-RQXBWJRE8H',
  };

  useEffect(() => {
    if (!appRef) {
      firebase.initializeApp(firebaseConfig);
      setAppRef(() => {
        return 'added';
      });
    }
  });
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
