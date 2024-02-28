

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegistroScreen from './src/screens/ScreenRegister';
import Profile from './src/screens/Profile';
import ChatScreen from './src/screens/Chat';
import Login from './src/screens/Login';
import Checkout from './src/screens/Checkout';
import CarnetScreen from './src/screens/CarnetScreen';
import CRUDS from './src/screens/Hola';


const Stack = createStackNavigator();

const App = () => {
  return (
   
  <NavigationContainer>
  <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name = 'Loginfirebase' component={Login} />
      <Stack.Screen name = 'ChatScreen' component={ChatScreen} />
      <Stack.Screen name = 'CarnetScreen' component={CarnetScreen} />
      <Stack.Screen name = 'Checkout' component={Checkout} />
      <Stack.Screen name = 'Profile' component={Profile} />
      <Stack.Screen name = 'CRUDS' component={CRUDS} />
      <Stack.Screen name = 'ScreenRegister' component={RegistroScreen} />


  </Stack.Navigator>
</NavigationContainer>
  );
};

export default App;
