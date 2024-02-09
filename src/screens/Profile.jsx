import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Carnet from './Carnet';

const Profile = ({ route, navigation }) => {
  const { userId } = route.params;
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

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
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

          <Button title="Cerrar Sesión" onPress={signOutAndNavigateToLogin} />
          <TouchableOpacity style={styles.chatButton} onPress={goToChatScreen}>
            <Text style={styles.chatButtonText}>Ir al Chat</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>No se encontraron datos del perfil.</Text>
      )}
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
});

export default Profile;
