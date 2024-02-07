import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Carnet from './Carnet';

const Profile = ({ route , navigation }) => {
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [userCarnet, setUserCarnet] = useState(null);
  const [formattedFechaVencimiento, setFormattedFechaVencimiento] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('pescadores').doc(userId).get();
  
        const obtenerIdCarnet = async (userId) => {
          try {
            // Hacer una consulta a la subcolección "carnet" del usuario específico
            const carnetQuerySnapshot = await firebase.firestore().collection('pescadores').doc(userId).collection('carnet').get();
        
            // Verificar si hay documentos en la subcolección
            if (!carnetQuerySnapshot.empty) {
              // Obtener el primer documento (carnetId1) de la subcolección
              const primerDocumento = carnetQuerySnapshot.docs[0];
              
              // Obtener el ID del documento
              const idCarnet = primerDocumento.id;
        
              console.log('ID del carnet:', idCarnet);
              return idCarnet;
            } else {
              console.log('No hay documentos en la subcolección "carnet"');
              return null; // Puedes devolver null o manejar este caso según tus necesidades
            }
          } catch (error) {
            console.error('Error al obtener el ID del carnet:', error.message);
            return null; // Puedes devolver null o manejar este caso según tus necesidades
          }
        };
  
        const idCarnet = await obtenerIdCarnet(userId);
        console.log(idCarnet)
        const userCarnet = await firestore().collection('pescadores').doc(userId).collection('carnet').doc(idCarnet).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
          setUserCarnet(userCarnet.data());
  
          // Accede a la subcolección "carnet"
          //const carnetCollectionRef = userDoc.ref.collection('carnet');
          //const carnetDoc = await carnetCollectionRef.doc('carnetId1').get();
  
          // Accede directamente al documento en la subcolección "carnet" utilizando el ID obtenido
          const carnetDoc = idCarnet ? await firestore().collection('pescadores').doc(userId).collection('carnet').doc(idCarnet).get() : null;
  
          // Obtiene fechaVencimiento del documento en la subcolección "carnet"
          const fechaVencimiento = userCarnet ? userCarnet.data().fechaVencimiento : null;
  
          // Convierte el objeto Timestamp a un formato de fecha legible
          const formattedDate = fechaVencimiento ? new Date(fechaVencimiento._seconds * 1000).toLocaleDateString() : null;
          setFormattedFechaVencimiento(formattedDate);
  
         
        } else {
          console.error('Usuario no encontrado en Firestore');
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error.message);
      }
    };
  
    fetchUserData();
  }, [userId]);




  const signOutAndNavigateToLogin = async () => {
    try {
      
      // Redirige al usuario a la pantalla de inicio de sesión
      navigation.navigate('Loginfirebase'); // Asegúrate de tener 'Login' como el nombre de la pantalla de inicio de sesión en tu configuración de navegación
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      {userData ? (
        <>
          {/* Aquí renderizamos el componente Carnet y le pasamos todas las propiedades necesarias */}
          <Carnet
            nombre={userData.nombre}
            apellido={userData.apellido}
            dni={userData.dni}
            codigoCarnet={userId}  
            fechaVencimiento={formattedFechaVencimiento}
            habilitado={userCarnet.habilitado}  
            fotoUrl={userData.fotoUrl}
          />

          {/* Agrega más campos según sea necesario */}
          <Button title="Cerrar Sesion" onPress={signOutAndNavigateToLogin} />
        </>
      ) : (
        <Text>Cargando datos del perfil...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Profile;
