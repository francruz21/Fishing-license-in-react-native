// CarnetScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Carnet from './Carnet';
import firestore from '@react-native-firebase/firestore';

const CarnetScreen = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersSnapshot = await firestore().collection('pescadores').get();
        const usersData = usersSnapshot.docs.map(doc => doc.data());
        setUserData(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {userData.map((user, index) => (
        <Carnet key={index} {...user} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66cdaa',
  },
});

export default CarnetScreen;
