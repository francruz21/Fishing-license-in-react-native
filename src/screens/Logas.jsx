import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';

const Logas = () => {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Image
          source={require('../screens/googles.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      
        <Text style={styles.loginText}>Iniciar Sesión</Text>
        <TouchableOpacity>
          <Text style={styles.gmailText}>Ir a Gmail</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
        <Text
        style={{
            fontWeight: 'bold',
          position: 'absolute',
          top:-8,
          left: 10,
          zIndex: 50,
          color:'#007bff',
          fontSize :12,
          backgroundColor: 'white',
          paddingHorizontal: 12,
        }}>
        Correo electronico o teléfono
      </Text>
        <View
       style={styles.input}>
       
       <TextInput
            placeholder=" "
            //style={styles.input}
          />
      </View>
  

















          <Text style ={styles.gmailText2}>¿has olvidado tu correo electrónico?</Text>
          <View style={styles.helperContainer}>
            <Text style={styles.helperText}>¿No es tu ordenador? usa el modo invitados para iniciar {'\n'} sesion de forma privada  </Text>
            <TouchableOpacity>
              <Text style={styles.moreInfoText}>Más información</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.createAccountButton, {marginRight: 90}]}>
            <Text style={styles.createAccountText}>Crear cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.createAccountButton2, {marginLeft: 10}]}>
            <Text style={styles.createAccountText2}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey', 
    left: 32,
    width : '86%',
    height: 600,
    marginTop : 100,
    bottom: 70,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    bottom : 5,
    marginTop: 45,
  },
  loginText: {
    fontSize: 22,
    bottom :10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gmailText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
    bottom:10,
    color: '#007bff',
  },
  gmailText2: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 35,
    bottom :-3,
    left :3 ,
    color: '#007bff',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
  
    width: '90%',
    height: 55,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    borderWidth: 2,
    
    left : 15
  },
  helperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helperText: {
    fontSize: 12,
    left: 15,
  },
  moreInfoText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#007bff',
    right :145,
    bottom :-8
  },
  buttonContainer: {
    flexDirection: 'row',
    bottom: -60,
  },
  createAccountButton: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom :45
  },
  createAccountButton2: {
    backgroundColor:"#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    bottom :45
  },
  createAccountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  createAccountText2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Logas;
