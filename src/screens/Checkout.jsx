import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,ImageBackground } from 'react-native';
import { HandleItegrantionMp } from './MercadoPago';
import { openBrowserAsync } from "expo-web-browser";
import { launchImageLibrary } from 'react-native-image-picker';
import { firebase } from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import '@react-native-firebase/firestore';
import { useRoute,useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Checkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, userData, userCarnet, formattedFechaVencimiento } = route.params;
  const [imageURI, setImageURI] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleBuy = async () => {
    try {
      const initPoint = await HandleItegrantionMp();
      console.log(initPoint); 
      openBrowserAsync(initPoint);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageURI(response.assets[0].uri);
        console.log(response);
      }
    });
  };

  const goToprofile = () => {
    navigation.navigate('Profile', {
      userId: userId,
      userData: userData,
      userCarnet: userCarnet,
      formattedFechaVencimiento: formattedFechaVencimiento
    });
  };
  const uploadImage = async () => {
    try {
      setUploading(true);
  
     
      const imageRef = firebase.storage().ref(`comprobante/${userId}`).child('comprobante.jpg');
      await imageRef.putFile(imageURI);

      const imageUrl = await imageRef.getDownloadURL();
  
      if (!imageUrl) {
        console.error('Error: La URL de la imagen no está definida.');
        return;
      }
  
      const comprobantesRef = firebase.firestore().collection('pescadores').doc(userId).collection('comprobantes');
      const comprobantesSnapshot = await comprobantesRef.get();
  
      if (!comprobantesSnapshot.empty) {
        const comprobanteDocRef = comprobantesSnapshot.docs[0].ref;
        await comprobanteDocRef.update({
          imageUrl: imageUrl,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } else {
        await comprobantesRef.add({
          imageUrl,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
  
      setUploading(false);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      setUploading(false);
    }
  };

  return (
    <View style={styles.container2}>
    <ImageBackground
        source={require('../screens/fondos2.jpg')}
        style={styles.image2}
      >
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
        <Text style={styles.buttonText}>Pagar</Text>
        <Icon name="wallet-outline" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
  <Text style={styles.buttonText}>Subir</Text>
  <Icon name="receipt" size={30} color="white" />
  <View style={{ marginLeft: 10 }}> 
  
  </View>
</TouchableOpacity>
      {imageURI && (
        <Image source={{ uri: imageURI }} style={styles.image} />
      )}
      {imageURI && (
        <TouchableOpacity style={styles.loadButton} onPress={uploadImage}>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.buttonText}>Cargar Comprobante</Text>
          <Icon name="cloud-upload" size={30} color="white" />
          </View>
          
        </TouchableOpacity>
      )}
   
    </View>
    </ImageBackground>
    <View style={styles.navBar}>
        <TouchableOpacity on onPress={goToprofile} >
        <Icon name="home" size={30} color="white" />
        </TouchableOpacity>
      
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
  },
  image2: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    flexDirection:'row',
    backgroundColor: '#7B4368',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection:'row',
    backgroundColor: '#7B4368',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  loadButton: {
    backgroundColor: '#7B4368',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    right :6
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    bottom: 15,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderColor :'white',
    backgroundColor: '#600000', 
    paddingVertical: 10,
    paddingHorizontal: 20, 
  },
});

export default Checkout;
