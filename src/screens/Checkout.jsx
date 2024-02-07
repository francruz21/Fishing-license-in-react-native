import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HandleItegrantionMp } from './MercadoPago';
import {openBrowserAsync} from "expo-web-browser";
const Checkout = () => {
  const handleBuy = async () => {
    try {
      const initPoint = await HandleItegrantionMp();
      
      console.log(initPoint); // Imprime el initPoint recibido
      openBrowserAsync(initPoint)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginButton} onPress={handleBuy}>
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: 'blue',
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
  },
});

export default Checkout;
