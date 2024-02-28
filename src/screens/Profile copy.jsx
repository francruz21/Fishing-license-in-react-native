import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import firestore from '@react-native-firebase/firestore';
import Carnet from './Carnet';
import Icon from 'react-native-vector-icons/Ionicons';
const Profile = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation(); // Obtén la navegación

  const [userData, setUserData] = useState(null);
  const [userCarnet, setUserCarnet] = useState(null);
  const [formattedFechaVencimiento, setFormattedFechaVencimiento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('pescadores').doc(userId).get();

        const obtenerIdCarnet = async (userId) => {
          try {
            const carnetQuerySnapshot = await firestore().collection('pescadores').doc(userId).collection('carnet').get();

            if (!carnetQuerySnapshot.empty) {
              const primerDocumento = carnetQuerySnapshot.docs[0];
              const idCarnet = primerDocumento.id;

              console.log('ID del carnet:', idCarnet);
              return idCarnet;
            } else {
              console.log('No hay documentos en la subcolección "carnet"');
              return null;
            }
          } catch (error) {
            console.error('Error al obtener el ID del carnet:', error.message);
            return null;
          }
        };

        const idCarnet = await obtenerIdCarnet(userId);
        console.log(idCarnet);
        const userCarnet = await firestore().collection('pescadores').doc(userId).collection('carnet').doc(idCarnet).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
          setUserCarnet(userCarnet.data());

          const carnetDoc = idCarnet ? await firestore().collection('pescadores').doc(userId).collection('carnet').doc(idCarnet).get() : null;

          const fechaVencimiento = userCarnet ? userCarnet.data().fechaVencimiento : null;

          const formattedDate = fechaVencimiento ? new Date(fechaVencimiento._seconds * 1000).toLocaleDateString() : null;
          setFormattedFechaVencimiento(formattedDate);
        } else {
          console.error('Usuario no encontrado en Firestore');
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error.message);
      } finally {
        setLoading(false); // Marcar la carga como completada después de obtener los datos
      }
    };

    fetchUserData();
  }, [userId]);

  const signOutAndNavigateToLogin = async () => {
    try {
      navigation.navigate('Loginfirebase');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  const goToChatScreen = () => {
    navigation.navigate('ChatScreen', { 
      userPhotoURL: userData.fotoUrl,
      userName: userData.nombre,
      userLastName: userData.apellido
    });
  };

  const goToCheckout = () => {
    navigation.navigate('Checkout', {
      userId: userId,
      userData: userData,
      userCarnet: userCarnet,
      formattedFechaVencimiento: formattedFechaVencimiento
    });
  };

  return (
    <View style={styles.container}>
      {/* Barra de navegación */}
      <View style={styles.navBar}>
      <TouchableOpacity >
       <Text style={{fontSize :25,color :'white',fontWeight: 'bold',right :-6}}>MosbFish</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={goToChatScreen}>
        <Icon name="chatbubble-outline" size={30} color="white" />
        </TouchableOpacity>
        {/* Puedes agregar más botones de navegación aquí si es necesario */}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7B4368" />
        </View>
      ) : userData ? (
        <>
          <Carnet
            nombre={userData.nombre}
            apellido={userData.apellido}
            dni={userData.dni}
            codigoCarnet={userId}
            fechaVencimiento={formattedFechaVencimiento}
            habilitado={userCarnet.habilitado}
            fotoUrl={userData.fotoUrl}
          />

        
         
        </>
      ) : (
        <Text>No se encontraron datos del perfil.</Text>
      )}
        <View style={styles.navBar}>
        <TouchableOpacity >
        <Icon name="home" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity  onPress={goToCheckout}>
        <Icon name="card-outline" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity  onPress={signOutAndNavigateToLogin}>
        <Icon name="exit-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#7B4368',
    borderRadius: 180,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'black', // Color de fondo de la barra de navegación
    padding: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribuye los botones de manera uniforme
    alignItems: 'center',
    borderColor :'white',
    backgroundColor: '#590900', // Color de fondo de la barra de navegación
    paddingVertical: 10,
    paddingHorizontal: 20, // Añade un espacio horizontal entre los botones
  },
});

export default Profile;
