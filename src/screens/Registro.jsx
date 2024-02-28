import React from 'react';
import { View, ImageBackground, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Register = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../screens/fondo.jpg')}
        style={styles.image}
      >
        <View style={styles.whiteSection}>
          <View style={styles.form}>
            <Text style={styles.tittle}>Sing Up</Text>
            <TextInput style={styles.input} placeholder='Nombre'/>
            <TextInput style={styles.input} placeholder='Apellido'/>
            <TextInput style={styles.input} placeholder='Dni'/>
            <TextInput style={styles.input} placeholder='Provincia'/>
            <TextInput style={styles.input} placeholder='Email'/>
            <TextInput style={styles.input} placeholder='Contraseña'/>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}> Siguiente</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Agregar un padding interior al SafeAreaView
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
  form: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  tittle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#7B4368',
    paddingBottom: 15,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    width: '100%', // Asegurar que el ancho del TextInput sea del 100%
  },
  button: {
    backgroundColor: '#7B4368',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 15,
    width: '100%', // Asegurar que el ancho del TouchableOpacity sea del 100%
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Register;