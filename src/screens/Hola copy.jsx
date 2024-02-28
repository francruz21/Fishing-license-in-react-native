import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert ,TouchableOpacity,TextInput} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';

const CRUDScreen = () => {
  const [tableHead, setTableHead] = useState(['Nombre', 'Apellido', 'Provincia', 'Vencimiento', 'Habilitado']);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const pescadoresSnapshot = await firestore().collection('pescadores').get();
      const pescadoresData = await Promise.all(pescadoresSnapshot.docs.map(async doc => {
        const userData = doc.data();
        const { nombre, apellido, provincia } = userData;
        let habilitado = '';
        let fechaVencimiento = '';

        // Obtener datos del carnet si existe
        const carnetSnapshot = await doc.ref.collection('carnet').get();
        if (!carnetSnapshot.empty) {
          const carnetData = carnetSnapshot.docs[0].data();
          habilitado = carnetData.habilitado;
          fechaVencimiento = carnetData.fechaVencimiento.toDate().toLocaleString();
        }

        return [nombre, apellido, provincia, fechaVencimiento, habilitado];
      }));
      setTableData(pescadoresData);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Ocurrió un error al cargar los datos.');
    }
  };

  return (
    <View style={styles.container2}>
        <View style={styles.navBar}>
        <TextInput
              style={styles.input}
              placeholder="Buscar.."
            />
        <TouchableOpacity style ={{right :12}}>
          <Icon name="search" size={30} color="white"  />
        </TouchableOpacity>
        {/* Puedes agregar más botones de navegación aquí si es necesario */}
      </View>
    <View style={styles.container}>
      
      <ScrollView horizontal={true}>
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={tableHead} style={styles.header} textStyle={styles.text} widthArr={[100, 100, 100, 100, 150]} />
            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={[
                  rowData[0], // Nombre
                  rowData[1], // Apellido
                  rowData[2], // Provincia
                  rowData[3], // Fecha de vencimiento
                  rowData[4] === true ? <Icon name="check" size={20} color="green" style={styles.icon} /> : rowData[4] === false ? <Icon name="times" size={20} color="red" style={styles.icon} /> : null, // Icono de check verde si habilitado es true, x roja si habilitado es false
                ]}
                style={styles.row}
                textStyle={[styles.text, { textAlign: 'center' }]} // Centramos el texto en las celdas
                widthArr={[100, 100, 100, 100, 150]}
              />
            ))}
          </Table>
        </View>
      </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        backgroundColor: 'white',
      },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  row: { height: 40 },
  icon: { alignSelf: 'center' },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0A192F',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tableContainer: { marginTop: 20 },
  input: {
    left :45,
    backgroundColor: "#F6F7FB",
    height: 25,
    padding :5,
    width: '70%', // Hace que el input sea más largo
    borderRadius: 10,
    paddingHorizontal: 10, // Añade un espacio horizontal interno
  },
});

export default CRUDScreen;
