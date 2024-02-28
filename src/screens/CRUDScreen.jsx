import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import firestore from '@react-native-firebase/firestore';

const CRUDScreen = () => {
  const [tableHead, setTableHead] = useState(['Nombre', 'Edad', 'Carnet Vencimiento', 'Habilitado', 'Comprobantes']);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const pescadoresSnapshot = await firestore().collection('pescadores').get();
      const pescadoresData = await Promise.all(pescadoresSnapshot.docs.map(async doc => {
        const userData = doc.data();
        const { nombre, edad } = userData;
        let fechaVencimiento = '';
        let habilitado = '';
        let comprobantes = '';

        // Obtener datos del carnet si existe
        const carnetSnapshot = await doc.ref.collection('carnet').get();
        if (!carnetSnapshot.empty) {
          const carnetData = carnetSnapshot.docs[0].data();
          fechaVencimiento = carnetData.fechaVencimiento.toDate().toLocaleString();
          habilitado = carnetData.habilitado ? 'Sí' : 'No';
        }

        // Obtener datos de los comprobantes
        const comprobantesSnapshot = await doc.ref.collection('comprobantes').get();
        comprobantes = comprobantesSnapshot.docs.map(comprobanteDoc => comprobanteDoc.id).join(', ');

        return [nombre, edad, fechaVencimiento, habilitado, comprobantes];
      }));
      setTableData(pescadoresData);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Ocurrió un error al cargar los datos.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={tableHead} widthArr={[100, 60, 160, 100, 200]} style={styles.header} textStyle={styles.text} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Rows data={tableData} widthArr={[100, 60, 160, 100, 200]} textStyle={styles.text} />
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
});

export default CRUDScreen;
