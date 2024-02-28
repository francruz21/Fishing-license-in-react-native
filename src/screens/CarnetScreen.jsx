import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import Carnet from './Carnet';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 


const CarnetScreen = () => {
  const [userData, setUserData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [refresh, setRefresh] = useState(0); 
  const today = new Date();

// Obtener el año actual
const currentYear = today.getFullYear();

// Obtener el año siguiente sumando 1 al año actual
const nextYear = currentYear + 1;

// Crear una nueva fecha con el año siguiente
const nextYearDate = new Date(nextYear, today.getMonth(), today.getDate());
  useEffect(() => {
    async function fetchData() {
      try {
        const usersSnapshot = await firestore().collection('pescadores').get();
        const usersData = await Promise.all(usersSnapshot.docs.map(async doc => {
          const userData = {
            id: doc.id,
            ...doc.data()
          };
  
          const carnetSnapshot = await doc.ref.collection('carnet').get();
          
          if (!carnetSnapshot.empty) {
            const carnetData = carnetSnapshot.docs[0].data(); 
  
           
            userData.fechaVencimientos = carnetData.fechaVencimiento.toDate().toLocaleString();
            userData.habilitado = carnetData.habilitado;
            userData.codigoCarnet=doc.id;
          }
  
          return userData;
        }));
        setUserData(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, [refresh]);

  const navigation = useNavigation(); 
  const signOutAndNavigateToLogin = async () => {
    try {
      navigation.navigate('Loginfirebase');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };


  const GoTOCruds= async () => {
    try {
      navigation.navigate('CRUDS');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  
  const handleVerify = async (userId) => {
    try {
      const userRef = firestore().collection('pescadores').doc(userId);
      const comprobantesSnapshot = await userRef.collection('comprobantes').get();
      let comprobanteUrl = null;
      comprobantesSnapshot.forEach(comprobanteDoc => {
        const comprobanteData = comprobanteDoc.data();
        if (comprobanteData.imageUrl) {
          comprobanteUrl = comprobanteData.imageUrl;
        }
      });

      if (comprobanteUrl) {
        setSelectedImageUrl(comprobanteUrl);
        setModalVisible(true);
      } else {
        Alert.alert('El usuario aún no ha subido un comprobante.');
      }
    } catch (error) {
      console.error('Error al verificar el comprobante:', error);
    }
  };

  const handleApprove = async (userId) => {
    try {
      const userRef = firestore().collection('pescadores').doc(userId);
      const carnetSnapshot = await userRef.collection('carnet').get();
  
      if (carnetSnapshot.empty) {
        throw new Error('El documento de carnet no existe.');
      }
  
      const carnetDocRef = carnetSnapshot.docs[0].ref;
  
      await carnetDocRef.update({
        
        fechaVencimiento :nextYearDate,
        habilitado: true
      });
  
      Alert.alert('Carnet habilitado correctamente.');
      setRefresh(prev => prev + 1);
    } catch (error) {
      console.error('Error al habilitar el carnet:', error);
    }
  };


  const disabledUsers = userData.filter(user => !user.habilitado);

  const goToCheckout = () => {
    setRefresh(prev => prev + 1);
  };



  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Text style={{fontSize :25,color :'white',fontWeight: 'bold',right :-6}}>MosbFish</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={GoTOCruds}>
        <Icon name="search" size={30} color="white" />
  
        </TouchableOpacity>
       
      </View>

      {disabledUsers.length > 0 ? (
        <ScrollView>
          {disabledUsers.map((user, index) => (
            <View key={`${index}-${user.id}`} style={styles.carnetContainer}>
              <Carnet {...user} />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleVerify(user.id)}
              >
                <Text style={styles.buttonText}>Verificar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => handleApprove(user.id)}
              >
                <Icon name="thumbs-up" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noCarnetsContainer}>
          <Text style={styles.noCarnetsText}>Sin carnets</Text>
        </View>
      )}
      <View style={styles.navBar}>
      
        <TouchableOpacity onPress={goToCheckout}>
        
        <Icon name="refresh" size={30} color="white" />
</TouchableOpacity>
<TouchableOpacity onPress={signOutAndNavigateToLogin}>
        <Icon name="exit-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
        backdropOpacity={0.8}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Image
              style={styles.image}
              source={{ uri: selectedImageUrl }}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0A192F',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  carnetContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    top: 35,
    right: 15,
    borderWidth: 2,
    borderColor: 'black',
  },
  button2: {
    position: 'absolute',
    backgroundColor: '#87CEEB',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    top: 180,
    right: 25,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noCarnetsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noCarnetsText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 60,
    bottom: -60,
    alignItems: 'center',
    alignContent: 'center'
  },
});

export default CarnetScreen;
