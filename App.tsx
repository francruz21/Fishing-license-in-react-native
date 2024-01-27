// En MyComponent.tsx
import React from 'react';

import { SafeAreaView, View } from 'react-native';
import Holamundo from './src/screens/Holamundo';
import MiComponente from './src/screens/MiComponente';

const App = () => {
  return (
    <SafeAreaView style={{flex : 1}}>

    <Holamundo/>

    </SafeAreaView>
   
  );
};

export default App;
