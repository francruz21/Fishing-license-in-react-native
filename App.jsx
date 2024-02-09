// App.js

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegistroScreen from './src/screens/ScreenRegister';
import Profile from './src/screens/Profile';
import Checkout from './src/screens/Checkout';
import Logs from './src/screens/Loginfirebase';
import Formulario from './src/screens/ScreenRegister';
import Maps from './src/screens/Chat';
import ChatScreen from './src/screens/Chat';
const Stack = createStackNavigator();

const App = () => {
  return (
   
  <NavigationContainer>
  <Stack.Navigator>
      <Stack.Screen name = 'Loginfirebase' component={Logs} />
      <Stack.Screen name = 'ChatScreen' component={ChatScreen} />
      <Stack.Screen name = 'Profile' component={Profile} />
      <Stack.Screen name = 'ScreenRegister' component={RegistroScreen} />


  </Stack.Navigator>
</NavigationContainer>
  );
};

export default App;
