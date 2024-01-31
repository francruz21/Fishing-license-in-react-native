// En MyComponent.tsx
import React from 'react';

import { SafeAreaView, View } from 'react-native';
import MiComponente from './src/screens/Login';
import LoginScreen from './src/screens/Login';
import Carnet from './src/screens/Carnet';
import Card from './src/screens/Card';
import Holamundo from './src/screens/ps';
import DisplayAnImage from './src/screens/Ps';
import Login from './src/screens/Login';

const App = () => {
  return (
    <SafeAreaView style={{flex : 1}}>

    

    <Login/>
    </SafeAreaView>
   
  );
};

export default App;
