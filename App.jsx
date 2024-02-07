// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
  // Reemplaza con la ruta correcta a tu componente Logs

import Logs from './src/screens/Loginfirebase';
import Formulario from './src/screens/FormRegister';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground,Button,Alert,SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Card from './src/screens/Card';
import Carnet from './src/screens/Carnet';
import firestore from '@react-native-firebase/firestore';
import CarnetScreen from './src/screens/CarnetScreen';
import RegistroScreen from './src/screens/ScreenRegister';
import Imagess from './src/screens/Ps';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import Checkout from './src/screens/Checkout';


const Stack = createStackNavigator();

const App = () => {
  return (
   
  <NavigationContainer>
  <Stack.Navigator>
      <Stack.Screen name = 'Loginfirebase' component={Checkout} />
      <Stack.Screen name = 'ScreenRegister' component={RegistroScreen} />
      <Stack.Screen name = 'Profile' component={Profile} />

  </Stack.Navigator>
</NavigationContainer>
  );
};

export default App;
