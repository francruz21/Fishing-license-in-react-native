// MiComponente.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MiComponente: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Hola, soy un nuevo componente</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MiComponente;

