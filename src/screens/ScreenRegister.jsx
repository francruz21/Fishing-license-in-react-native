import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';
import styled from 'styled-components/native';
import { launchImageLibrary } from 'react-native-image-picker';

// Configura la aplicación con tus credenciales de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBih3f-Ir_bIRr25o65jtm8k2rlbmYM_8A',
  authDomain: 'probando-ffa9c.firebaseapp.com',
  projectId: 'probando-ffa9c',
  storageBucket: 'gs://probando-ffa9c.appspot.com',
  messagingSenderId: '735934674314',
  appId: '1:735934674314:android:2c082a7811441653c74473',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const RegistroScreen = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDNI] = useState('');
  const [provincia, setProvincia] = useState('');
  const [foto, setFoto] = useState(null);

  const imagePicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        setFoto(response.assets[0].uri);
        console.log(response);
      }
    });
  };

  const registrarUsuario = async () => {
    try {
      // Registra al usuario en Firebase Authentication
      const credencial = await firebase.auth().createUserWithEmailAndPassword(correo, contraseña);

      // Obtiene el ID único del usuario registrado
      const usuarioID = credencial.user.uid;

      // Almacena la información adicional en Firestore
      await firebase.firestore().collection('pescadores').doc(usuarioID).set({
        nombre,
        apellido,
        correo,
        dni,
        provincia,
        fechaRegistro: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Crea un documento en la subcolección 'carnet' con valores iniciales
      await firebase.firestore().collection('pescadores').doc(usuarioID).collection('carnet').add({
        habilitado: false,
        fechaVencimiento: firebase.firestore.FieldValue.serverTimestamp(), // Puedes ajustar la fecha de vencimiento según tus necesidades
      });

      // Sube la foto a Firebase Storage si se seleccionó una
      if (foto) {
        const referencia = firebase.storage().ref(`fotosUsuarios/${usuarioID}`);
        await referencia.putFile(foto);
        const urlFoto = await referencia.getDownloadURL();

        // Actualiza el documento en Firestore con la URL de la foto
        await firebase.firestore().collection('pescadores').doc(usuarioID).update({
          fotoUrl: urlFoto,
        });
      }

      console.log('Usuario registrado con éxito');
      Alert.alert('Usuario registrado con éxito');
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      Alert.alert('Error al registrar usuario');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Regístrate</Text>
        <FormContainer style={styles.formContainer}>
          <Text>Nombre:</Text>
          <TextInput
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />
          <Text>Apellido:</Text>
          <TextInput
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
            style={styles.input}
          />
          <Text>DNI:</Text>
          <TextInput
            placeholder="DNI"
            value={dni}
            onChangeText={setDNI}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text>Provincia:</Text>
          <TextInput
            placeholder="Provincia"
            value={provincia}
            onChangeText={setProvincia}
            style={styles.input}
          />
          <Text>Correo:</Text>
          <TextInput
            placeholder="Correo Electrónico"
            value={correo}
            onChangeText={setCorreo}
            style={styles.input}
          />
          <Text>Contraseña:</Text>
          <TextInput
            placeholder="Contraseña"
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry
            style={styles.input}
          />

          <Button title="Seleccionar Foto" onPress={imagePicker} />

          {foto && (
            <Image source={{ uri: foto }} style={{ width: 200, height: 200, marginTop: 10 }} />
          )}

          <Button title="Registrar" onPress={registrarUsuario} />
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

const FormContainer = styled.View`
  padding: 20px;
`;

export default RegistroScreen;
