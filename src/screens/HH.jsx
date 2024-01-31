import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HH = () => {
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
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createAccountButton}>
            <Text style={styles.createAccountText}>Crear cuenta</Text>
          </TouchableOpacity>
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

export default HH;
