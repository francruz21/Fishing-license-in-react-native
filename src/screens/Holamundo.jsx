import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HolaMundo = () => {
  const [xx, setContador] = useState(0);

  return (
    <View style={styles.container}>
   
      
      <View style={styles.container1} >
      <Text >Hola mundos</Text>
      </View>

      <View style={styles.container3}>
       
      </View>

      <View
      style={
        styles.container2
      }>
      <Text>Hola mundossss</Text>
      </View>
     
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   alignItems : 'center',
   backgroundColor:'red',
   justifyContent : 'center',
   flex :1 
  },

  container1:{
    flex :2,
    backgroundColor:'yellow'

  },

  container2:{
    flex :2,
    backgroundColor:'blue'
  },

  container3:{
    flex :1 ,
    backgroundColor:'black'
  }
});

export default HolaMundo;
