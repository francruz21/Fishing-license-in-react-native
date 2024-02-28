import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ScrollView , TouchableOpacity,ImageBackground} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';
import styled from 'styled-components/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

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
  const navigation = useNavigation(); // Obtiene el objeto de navegación

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
    // Verificar si algún campo está vacío
    if (!nombre || !apellido || !dni || !provincia || !correo || !contraseña || !foto) {
      Alert.alert('Todos los campos son obligatorios, incluyendo la foto');
      return;
    }

    try {
      // Registra al usuario en Firebase Authentication
      const credencial = await firebase.auth().createUserWithEmailAndPassword(correo, contraseña);

      // Actualiza el perfil del usuario con el nombre
      await credencial.user.updateProfile({
        displayName: `${nombre} ${apellido}`
      });

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

      // Sube la foto a Firebase Storage
      const referencia = firebase.storage().ref(`fotosUsuarios/${usuarioID}`);
      await referencia.putFile(foto);
      const urlFoto = await referencia.getDownloadURL();

      // Actualiza el documento en Firestore con la URL de la foto
      await firebase.firestore().collection('pescadores').doc(usuarioID).update({
        fotoUrl: urlFoto,
      });

      console.log('Usuario registrado con éxito');
      Alert.alert('Usuario registrado con éxito');

      // Redirige al usuario a la pantalla de inicio de sesión después del registro exitoso
      navigation.navigate('Loginfirebase'); // Reemplaza 'LoginScreen' con el nombre de tu pantalla de inicio de sesión
    } catch (error) {
      
      Alert.alert('Error al registrar usuario');
    }
  };

  return (
    <View style={styles.container2}>
    <ImageBackground
      source={require('../screens/fondos2.jpg')}
      style={styles.image}>
  
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
        
          <FormContainer style={styles.formContainer}>
          <Text style={styles.title}>Sing ig</Text>
            <Text
        style={{
            fontWeight: 'bold',
          position: 'absolute',
          top:80,
          left:25,
          zIndex: 50,
          color:'#7B4368',
          fontSize :12,
          backgroundColor: 'white',
          paddingHorizontal:7,
        }}>
        Nombre
      </Text>
            <TextInput
              
              value={nombre}
              onChangeText={setNombre}
              style={styles.input}
            />
           <Text
        style={{
            fontWeight: 'bold',
          position: 'absolute',
          top:132,
          left:25,
          zIndex: 50,
          color:'#7B4368',
          fontSize :12,
          backgroundColor: 'white',
          paddingHorizontal:7,
        }}>
        Apellido
      </Text>
            <TextInput
             
              value={apellido}
              onChangeText={setApellido}
              style={styles.input}
            />
             <Text
        style={{
            fontWeight: 'bold',
          position: 'absolute',
          top:189,
          left:25,
          zIndex: 50,
          color:'#7B4368',
          fontSize :12,
          backgroundColor: 'white',
          paddingHorizontal:7,
        }}>
        DNI
      </Text>
            <TextInput
              
              value={dni}
              onChangeText={setDNI}
              keyboardType="numeric"
              style={styles.input}
            />
         <Text
        style={{
            fontWeight: 'bold',
          position: 'absolute',
          top:245,
          left:25,
          zIndex: 50,
          color:'#7B4368',
          fontSize :12,
          backgroundColor: 'white',
          paddingHorizontal:7,
        }}>
        Provincia
      </Text>
            <TextInput
           
              value={provincia}
              onChangeText={setProvincia}
              style={styles.input}
            />
             <Text
        style={{
            fontWeight: 'bold',
          position: 'absolute',
          top:300,
          left:25,
          zIndex: 50,
          color:'#7B4368',
          fontSize :12,
          backgroundColor: 'white',
          paddingHorizontal:7,
        }}>
        Correo
      </Text>
            <TextInput
              
              value={correo}
              onChangeText={setCorreo}
              style={styles.input}
            />
              <Text
        style={{
            fontWeight: 'bold',
          position: 'absolute',
          top:355,
          left:25,
          zIndex: 50,
          color:'#7B4368',
          fontSize :12,
          backgroundColor: 'white',
          paddingHorizontal:7,
        }}>
        Contraseña
      </Text>
            <TextInput
             
              value={contraseña}
              onChangeText={setContraseña}
              secureTextEntry
              style={styles.input}
            />

       
            <TouchableOpacity style={styles.button} onPress={imagePicker}>
                <Text style={styles.buttonText}>Seleccionar Foto</Text>
              </TouchableOpacity>
            {foto && (
              <Image source={{ uri: foto }} style={{ width: 200, height: 200, marginTop: 10 }} />
            )}
           
            <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
           
          </FormContainer>
        </View>
      </ScrollView>
  
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },


  button: {
    backgroundColor: '#7B4368',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
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
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 60,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#7B4368',
    alignSelf: 'center',
    paddingBottom: 20,
  },
  input: {
    height: 40,
    width :300,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor :'#7B4368'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

const FormContainer = styled.View`
  padding: 20px;
`;

export default RegistroScreen;
