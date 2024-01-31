import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ nombre, apellido, dni, codigoCarnet, fechaVencimiento, fotoUrl }) => {
  return (
    <View style={styles.carnetContainer}>
      <View style={styles.infoContainer}>

      <View style={styles.textContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.text}>{nombre} {apellido}</Text>

          <Text style={styles.label}>DNI:</Text>
          <Text style={styles.text}>{dni}</Text>

          <Text style={styles.label}>Código de Carnet:</Text>
          <Text style={styles.text}>{codigoCarnet}</Text>

          <Text style={styles.label}>Fecha de Vencimiento:</Text>
          <Text style={styles.text}>{fechaVencimiento}</Text>
        </View>


        {/* Sección de Foto */}
        <Image
          style={styles.tinyLogo}
          source={{
            uri: fotoUrl,
          }}
        />

        {/* Información personal */}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carnetContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    marginVertical: 20,
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 20, // Ajusta el margen según sea necesario
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 10, // Puedes ajustar el valor para hacerla más cuadrada o redonda
    marginRight: 20, // Ajusta el margen entre la imagen y los datos
  },
});

export default Card;
