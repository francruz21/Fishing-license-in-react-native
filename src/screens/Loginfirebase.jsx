import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';


const Logs = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmailAndPassword = async () => {
    try {
      if (email.trim() === '' || password.trim() === '') {
        Alert.alert('Por favor, ingrese su correo electrónico y contraseña.');
        return;
      }

      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log('Usuario autenticado:', response.user.email);

      // Cambia a la pantalla de perfil después de iniciar sesión exitosamente
      navigation.navigate('Profile', { userId: response.user.uid });
    } catch (error) {
      Alert.alert('Usuario incorrecto');
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      console.log('Usuario desconectado');
    } catch (error) {
      console.error('Error al desconectar:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {user ? (
          <View >
            <Text>Bienvenido, {user.email}</Text>
            <Button title="Cerrar sesión" onPress={signOut} />
          </View>
        ) : (
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Icon name="user" size={40} color="blue" />
              <Text style={styles.title}>Login</Text>
            </View>

            <TextInput
              placeholder="Correo electrónico"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity onPress={signInWithEmailAndPassword} style={styles.loginButton}>
              <Text style={styles.createAccountText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.createAccountButton}>
              <Text onPress={() => { navigation.navigate('ScreenRegister') }} style={styles.createAccountText}>Crear Cuenta</Text>
            </TouchableOpacity>
          </View>
        )}
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

export default Logs;
