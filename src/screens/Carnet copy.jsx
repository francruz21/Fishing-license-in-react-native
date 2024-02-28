import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Carnet = ({ nombre, apellido, dni, codigoCarnet, fechaVencimiento, fotoUrl, habilitado }) => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.carnetContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Nombre:</Text>
              <Text style={styles.text}>{nombre} {apellido}</Text>

              <Text style={styles.label}>DNI:</Text>
              <Text style={styles.text}>{dni}</Text>

              <Text style={styles.label}>Código de Carnet:</Text>
              <Text style={styles.text2}>{codigoCarnet}</Text>

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

          {/* Línea indicando habilitado/deshabilitado */}
          <View style={[styles.statusLine, { backgroundColor: habilitado ? 'green' : 'red' }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#0A192F',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  carnetContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    marginVertical: 20,
    alignItems: 'center',
    borderWidth :3,
    borderColor: 'black',
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

  label2: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 10,
  },

  text: {
    fontSize: 14,
    marginBottom: 10,
  },

  text2: {
    fontSize: 9,
    marginBottom: 10,
  },

  tinyLogo: {
    width: 120,
    height: 150,
    borderRadius: 10, // Puedes ajustar el valor para hacerla más cuadrada o redonda
    marginRight: 20, // Ajusta el margen entre la imagen y los datos
  },
  statusLine: {
    height: 7,
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
  },
});

export default Carnet;
