// En App.tsx
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import Carnet from './src/screens/Carnet';
import Imagess from './src/screens/Ps';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {user ? (
        // Si hay un usuario autenticado, muestra el componente Carnet o Imagess
        // dependiendo de tus necesidades
        <Carnet user={user} />
      ) : (
        // Si no hay usuario autenticado, muestra el componente de inicio de sesión
        <LoginScreen onLogin={handleLogin} />
      )}
    </SafeAreaView>
  );
};

export default App;
