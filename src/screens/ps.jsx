import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const Imagess = () => {
  const [selectImage, setSelectImage] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const imagePicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        setSelectImage(response.assets[0].uri);
        setIsButtonVisible(false);
        console.log(response);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View>
        {selectImage ? (
          <Image style={{ height: 400, width: '100%' }} source={{ uri: selectImage }} />
        ) : (
          <Text>No hay imagen seleccionada</Text>
        )}
      </View>

      {isButtonVisible && (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => imagePicker()} style={styles.button}>
            <Text style={styles.buttonText}>Galleria</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    height: 50,
    width: '60%',
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default Imagess;

