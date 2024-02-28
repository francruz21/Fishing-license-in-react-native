import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Carnet = ({ nombre, apellido, dni, fechaVencimientos, habilitado, codigoCarnet, fotoUrl }) => {
  const [fechaVencimiento, setFechaVencimiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vars, setVars] = useState(null); 

  useEffect(() => {
    const fetchFechaVencimiento = async () => {
      try {
        const carnetRef = firestore().collection('pescadores').doc(codigoCarnet).collection('carnet');
        const carnetSnapshot = await carnetRef.get();

        if (!carnetSnapshot.empty) {
          const carnetDoc = carnetSnapshot.docs[0];
          const carnetData = carnetDoc.data();
          if (carnetData.fechaVencimiento) {
            setFechaVencimiento(carnetData.fechaVencimiento.toDate());
            setVars(carnetData.habilitado); 
          }
        } else {
          console.log('No hay documentos en la subcolección "carnet" para el pescador con ID:', codigoCarnet);
        }
      } catch (error) {
        console.error('Error al obtener la fecha de vencimiento:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFechaVencimiento();
  }, [codigoCarnet]);

  useEffect(() => {
    const updateHabilitado = async () => {
      try {
        const carnetRef = firestore().collection('pescadores').doc(codigoCarnet).collection('carnet');
        const carnetSnapshot = await carnetRef.get();
    
        if (!carnetSnapshot.empty) {
          const carnetDocRef = carnetSnapshot.docs[0].ref;
          const expirationTime = fechaVencimiento.getTime();
          const currentTime = new Date().getTime();

          if (expirationTime < currentTime) {
            console.log('La fecha de vencimiento ha pasado. Deshabilitar el documento.');
            await carnetDocRef.update({ habilitado: false });
            console.log('Documento deshabilitado debido a la fecha de vencimiento pasada.');
            setVars(false); 
          } else {
            console.log('La fecha de vencimiento aún no ha pasado.');
            await carnetDocRef.update({ habilitado: true });
            setVars(true); 
          }
        }
      } catch (error) {
        console.error('Error al actualizar habilitado:', error);
      }
    };

    if (!loading && fechaVencimiento) {
      updateHabilitado();
    }
  }, [loading, fechaVencimiento, codigoCarnet]);

 

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../screens/fondos.jpg')}
          style={styles.carnetContainer}
        >
          <View style={styles.barraLicencia}>
            <Text style={styles.textoBarraLicencia}>Licencia de Pesca</Text>
          </View>

          <View style={styles.carnetContainer2}>
            <View style={styles.infoContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Codigo de Licencia:</Text>
                <Text style={styles.text2}>{codigoCarnet}</Text>

                <Text style={styles.label}>Nombre / Apellido:</Text>
                <Text style={styles.text}>{nombre} {apellido}</Text>

                <Text style={styles.label}>DNI:</Text>
                <Text style={styles.text}>{dni}</Text>

                <Text style={styles.label}>Fecha de Vencimiento:</Text>
<Text style={styles.text}>{fechaVencimientos}</Text>
              </View>
            </View>
            <Image
              style={styles.tinyLogo2}
              source={require('../screens/saltas.png')}
            />
            <Image
              style={styles.tinyLogo3}
              source={require('../screens/firma.png')}
            />
            <Image
              style={styles.tinyLogo}
              source={{
                uri: fotoUrl,
              }}
            />
            
            {/* Línea indicando habilitado/deshabilitado */}
          
            <View style={[styles.statusLine, { backgroundColor: vars ? 'green' : 'red' }]} />
          </View>
        </ImageBackground>
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 0,
    borderRadius: 15,
    width: '95%',
    marginVertical: 20,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'white',
  },
  carnetContainer2: {
    width: '95%',
    marginVertical: 5,
    alignItems: 'center',
  },
  barraLicencia: {
    backgroundColor: '#7EC8E3',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBarraLicencia: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    right: 100
  },
  infoContainer: {
    bottom: -12,
    flexDirection: 'row',
    alignItems: 'center',
    left: 45,
  },
  textContainer: {
    marginLeft: 20,
  },
  label: {
    fontSize: 10,
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
    marginBottom: -1,
  },
  text2: {
    fontSize: 12,
    marginBottom: -2,
  },
  tinyLogo: {
    bottom: 35,
    position: 'absolute',
    right: 222,
    width: 126,
    height: 150,
    borderRadius: 0,
    marginRight: 20,
  },
  tinyLogo2: {
    position: 'absolute',
    width: 165,
    height: 35,
    left: 200,
    borderRadius: 0,
    bottom: 205,
  },
  tinyLogo3: {
    position: 'absolute',
    width: 100,
    height: 45,
    left: 250,
    bottom: 45,
    resizeMode: 'contain', // Ajuste para evitar recorte
  },
  statusLine: {
    height: 7,
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
  },
});

export default Carnet;
