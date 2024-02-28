import React from 'react';
import QRGenerator from './Qr'; // Importa el componente QR

const QRScreen = ({ route }) => {
  // Recibe los datos del usuario desde la navegación
  const { userData } = route.params;

  return (
    <QRGenerator userData={userData} /> // Pasa los datos de usuario al componente QR
  );
};

export default QRScreen;
