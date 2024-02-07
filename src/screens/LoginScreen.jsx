// En LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Aquí deberías tener una constante que contenga la información de los usuarios
    const users = [
      { id: 1, email: 'user', password: 'user' },
      { id: 2, email: 'usuario2@example.com', password: 'password2' },
      // Agrega más usuarios según sea necesario
    ];

    // Verifica si existe un usuario con el email y la contraseña proporcionados
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      // Si el usuario existe, llama a la función onLogin con el usuario
      onLogin(user);
      setError('');
    } else {
      // Si no, muestra un mensaje de error
      setError('Credenciales inválidas');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Icon name="user" size={40} color="blue" />
            <Text style={styles.title}>Login</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  background: {
    backgroundColor: '#66cdaa',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  createAccountButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    overflow: 'hidden',
    paddingVertical: 12,
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: 16,
    color: 'white',
  },
});

export default LoginScreen;
