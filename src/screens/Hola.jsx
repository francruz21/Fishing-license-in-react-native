import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, ScrollView ,ImageBackground} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Table, Row } from 'react-native-table-component';
import Carnet from './Carnet'; 
import { useNavigation } from '@react-navigation/native'; 
const CRUDS = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [tableHead, setTableHead] = useState(['Nombre', 'Apellido', 'Provincia', 'Vencimiento', 'Habilitado']);
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(true); 

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

        const carnetSnapshot = await doc.ref.collection('carnet').get();
        if (!carnetSnapshot.empty) {
          const carnetData = carnetSnapshot.docs[0].data();
          habilitado = carnetData.habilitado;
          fechaVencimiento = carnetData.fechaVencimiento.toDate().toLocaleDateString();
        }

        return [nombre, apellido, provincia, fechaVencimiento, habilitado];
      }));
      setTableData(pescadoresData);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Ocurrió un error al cargar los datos.');
    }
  };

  const searchPescadores = async () => {
    try {
      const pescadoresRef = firestore().collection('pescadores');
      const querySnapshot = await pescadoresRef.where('nombre', '==', searchText).get();
  
      const pescadores = [];
      for (const doc of querySnapshot.docs) {
        const pescadorData = doc.data();
        pescadorData.id = doc.id; 
        const carnetSnapshot = await pescadoresRef.doc(doc.id).collection('carnet').get();
        if (!carnetSnapshot.empty) {
          const carnetData = carnetSnapshot.docs[0].data();
          const fechaVencimiento = carnetData.fechaVencimiento.toDate().toLocaleDateString(); 
          pescadorData.fechaVencimiento = fechaVencimiento; 
          pescadorData.habilitado = carnetData.habilitado;
        }
        pescadores.push(pescadorData);
      }
  
      setSearchResults(pescadores);
      setShowTable(false); 
    } catch (error) {
      console.error('Error al buscar pescadores:', error);
      Alert.alert('Error', 'Ocurrió un error al buscar los pescadores.');
    }
  };
  const navigation = useNavigation(); 
  const GoTohome= async () => {
    try {
      navigation.navigate('CarnetScreen');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };
  const clearSearch = () => {
    setSearchText(''); 
    setSearchResults([]); 
    setShowTable(true); 
  };

  const handleTextChange = (text) => {
    setSearchText(text); 
    setShowTable(text === ''); 
  };

  return (
    <View style={styles.container}>
         <ImageBackground
        source={require('../screens/fondos2.jpg')}
        style={styles.image}
      >
        <View style={styles.navBar2}>
        <TouchableOpacity>
          <Text style={{fontSize :25,color :'white',fontWeight: 'bold',right :-116}}>Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity style ={{right :135}} >
        <Icon name="user" size={30} color="white" />
  
        </TouchableOpacity>

      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input,{ color: 'white' ,fontWeight:'bold',letterSpacing: 2}]}
          placeholder="Buscar..."
          placeholderTextColor="white"
          onChangeText={handleTextChange}
          value={searchText}
          
        />
      
        <TouchableOpacity  style ={{right :48}}onPress={searchPescadores}>
        <Icon name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
      {showTable && (
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
                 rowData[4] === true ? <Icon name="check" size={20} color="green" style={styles.icon} /> : rowData[4] === false ? <Icon name="times" size={20} color="red" style={styles.icon} /> : null, 
               ]}
               style={{ ...styles.row, backgroundColor: 'white' }} // Cambia el array por un objeto y agrega backgroundColor
               textStyle={styles.text} // Centra el texto en las celdas
               widthArr={[100, 100, 100, 100, 150]}
             />
              ))}
            </Table>
          </View>
        </ScrollView>
      )}
      {searchText !== '' && ( // Muestra resultsContainer solo si hay texto en el input
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {searchResults.length > 0 ? (
            <View style={styles.resultsContainer}>
              {searchResults.map((pescador, index) => (
                <View style={styles.carnetContainer} key={index}>
                  <Carnet
                    nombre={pescador.nombre}
                    apellido={pescador.apellido}
                    dni={pescador.dni}
                    codigoCarnet={pescador.id}
                    fechaVencimientos={pescador.fechaVencimiento}
                    fotoUrl={pescador.fotoUrl}
                    habilitado={pescador.habilitado}
                  />
                </View>
              ))}
            </View>
          ) : (
            <Text>No se encontraron resultados</Text>
          )}
        </ScrollView>
      )}

<View style={styles.navBar}>
       
        <TouchableOpacity onPress={GoTohome} >
        <Icon name="arrow-left" size={30} color="white" />
  
        </TouchableOpacity>

  
      </View>
      </ImageBackground>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra horizontalmente
    marginBottom: 20,
    left :15,
    top:25,
    padding: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 3,
    borderColor: 'white',

    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    marginTop :75,
    flexGrow: 1,

  },
  resultsContainer: {
    alignItems: 'center', // Centra los elementos horizontalmente
  },
  carnetContainer: {
    marginBottom: 10, // Espacio entre carnets
    width: '100%', // Ajusta el ancho del contenedor del Carnet según tus necesidades
  },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  row: { height: 40 },
  icon: { alignSelf: 'center' },
  tableContainer: { marginTop: 135,
    alignItems: 'center', },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0A192F',
        paddingHorizontal: 15,
        paddingVertical: 10,
      },
      navBar2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0A192F',
        
        paddingHorizontal: 15,
        paddingVertical: 10,
      },
      image: {
        flex: 1,
        resizeMode: 'cover',
      },
});

export default CRUDS;
