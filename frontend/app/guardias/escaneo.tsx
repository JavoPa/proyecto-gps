import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Alert } from 'react-native';
import { validar } from '@/services/acceso.service';
import CustomButton from '@/components/customButton';

export default function EscaneoScreen() {
  interface BarcodeData {
    type: string;
    data: string;
  }
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  
    const handleBarCodeScanned = ({ type, data }: BarcodeData) => {
        setScannedData(data);
        validar(data).then((response) => {
            if(response.state === "Success") {
              Alert.alert(
                "Registrado",
                "Estudiante:" + response.data.usuario.nombre + " " + response.data.usuario.apellido + 
                "\nRUT: " + response.data.usuario.rut +
                "\n" + "Bicicleta: " + (response.data.usuario.bicicleta
                  ? response.data.usuario.bicicleta.marca + " " + response.data.usuario.bicicleta.color 
                  : "No registrada"),
                [
                  { text: 'OK', onPress: () => setScannedData(null) }
                ]
              );
            }else{
              Alert.alert(
                "Error",
                response.message || "Hubo un error al registrar el ingreso",
                [
                  { text: 'OK', onPress: () => setScannedData(null) }
                ]
              );
            }
          });
    };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.containerPermission}>
        <Text style={styles.title}>Se requieren permisos para usar la cámara</Text>
        <View style={styles.button}>
          <CustomButton title="Otorgar permisos" onPress={requestPermission} />
          {/* <Button onPress={requestPermission} title="Otorgar permisos" color="#2A628F"/> */}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera}
        onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
      >
        <View style={styles.buttonContainer}>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    margin: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  containerPermission: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});