import React from 'react';
import { View, ImageBackground, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';

const Register2 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../screens/fondo.jpg')}
        style={styles.image}
      >
        <View style={styles.whiteSection}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Galería</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  whiteSection: {
    width: '95%', // Cambiar el ancho al 100% para que ocupe todo el SafeAreaView
    height: '95%', // Cambiar la altura al 100% para que ocupe todo el SafeAreaView
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 60,
    left: 10,
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center', // Centrar horizontalmente
    bottom: -20
  },
  button: {
    backgroundColor: '#7B4368',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#7B4368',
    width: 150,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20, // Ajustar la distancia desde la parte inferior
    right: 20, // Ajustar la distancia desde la parte derecha
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Register2;
