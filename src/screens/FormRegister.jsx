import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';

const FormContainer = styled.View`
  padding: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  border-width: 1px;
  border-color: #ccc;
`;

const Formulario = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDNI] = useState('');
  const [provincia, setProvincia] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async () => {
    try {
      const usuariosRef = firestore().collection('usuarios');

      await usuariosRef.add({
        nombre,
        apellido,
        dni,
        provincia,
        fechaNacimiento,
        correo,
        contrasena,
      });

      console.log('Datos del formulario subidos exitosamente a Firestore');
    } catch (error) {
      console.error('Error al subir los datos a Firestore:', error);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Regístrate</Text>
        <FormContainer style={styles.formContainer}>
          <Text>Nombre:</Text>
          <Input value={nombre} onChangeText={setNombre} style={styles.input} />

          <Text>Apellido:</Text>
          <Input value={apellido} onChangeText={setApellido} style={styles.input} />

          <Text>DNI:</Text>
          <Input value={dni} onChangeText={setDNI} keyboardType="numeric" style={styles.input} />

          <Text>Provincia:</Text>
          <Input value={provincia} onChangeText={setProvincia} style={styles.input} />

          <Text>Fecha de Nacimiento:</Text>
          <Input value={fechaNacimiento} onChangeText={setFechaNacimiento} style={styles.input} />

          <Text>Correo Electrónico:</Text>
          <Input value={correo} onChangeText={setCorreo} keyboardType="email-address" style={styles.input} />

          <Text>Contraseña:</Text>
          <Input value={contrasena} onChangeText={setContrasena} secureTextEntry style={styles.input} />

          <Button title="Enviar" onPress={handleSubmit} />
        </FormContainer>
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
    fontSize: 45,
    fontStyle: 'italic',
    color: 'black',
    marginBottom: 20,
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
});

export default Formulario;
