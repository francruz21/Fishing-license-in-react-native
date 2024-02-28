import React, { useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Login = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmailAndPassword = async () => {
    try {
      if (email.trim() === '' || password.trim() === '') {
        Alert.alert('Por favor, ingrese su correo electrónico y contraseña.');
        return;
      }

      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log('Usuario autenticado:', response.user.email);

      // Obtener datos adicionales del usuario desde Firestore
      const userDoc = await firestore().collection('pescadores').doc(response.user.uid).get();
      const userData = userDoc.data();
     
      // Verificar si el usuario es administrador o usuario común
      if ( userData.admin) {
        navigation.navigate('CarnetScreen');
      } else {
       
        navigation.navigate('Profile', { userId: response.user.uid });
      }
    } catch (error) {
      Alert.alert('Usuario incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../screens/fondo.jpg')}
        style={styles.image}
      >
        <View style={styles.whiteSection}>
          <SafeAreaView style={styles.form}>
            <Text style={styles.title}>Log In</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={signInWithEmailAndPassword}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row',justifyContent:'center'}}>
              <Text style ={styles.registerLink2}>No tenes cuenta?</Text>
              <TouchableOpacity onPress={() => { navigation.navigate('ScreenRegister') }}>
                <Text style={styles.registerLink}>Crear cuenta</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
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
    width: '85%',
    height: '60%',
    position: 'absolute',
    bottom: 90,
    backgroundColor: '#fff',
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 38,
    right: 0,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#7B4368',
    alignSelf: 'center',
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#7B4368',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  registerLink: {
    marginTop:10,
    color: '#7B4368',
    marginLeft :4
  },  
  registerLink2: {
    marginTop:10,
    color: '#333',
  },
});

export default Login;
