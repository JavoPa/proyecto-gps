import React, {useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Modal, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '@/components/customButton';
import { getBicicleta, postBicicleta, putBicicleta } from '@/services/bicicleta.service';
import { Text, View } from '../Themed';
import Colors from '@/constants/Colors';
import BicicletaModal from '../BicicletaModal';

export default function BicicletaInfo() {
    interface Bicicleta {
        marca: string;
        color: string;
        // ... otras propiedades de la bicicleta ...
      }
      const [bicicleta, setBicicleta] = useState<Bicicleta | null>(null);
      const [error, setError] = useState<string | null>(null);
      const [modalVisible, setModalVisible] = useState(false);
      const [bicicletaNotExists, setBicicletaNotExists] = useState(false);
        useFocusEffect(
          React.useCallback(() => {
            getBicicleta().then((response) => {
              if(response.status === 200) {
                setBicicleta(response.data.data);
                setError(null);
                setBicicletaNotExists(false);
              }else if(response.status === 404) {
                setBicicleta(null);
                setError(null);
                setBicicletaNotExists(true);
              }else{
                setError(response.message || 'Hubo un error al cargar la bicicleta 🚲');
              }
            });
          }, [])
        );

        // Datos de la bicicleta
        const [fields, setFields] = useState({
          marca: '',
          color: '',
          // Agrega más campos según sea necesario
        });
        const handleFieldChange = (field: string, value: string) => {
          if (value.length <= 20) {
            setFields({
              ...fields,
              [field]: value,
            });
          }
        };
        const handleActualizar = () => {
          if(fields.marca === '' || fields.color === '') {
            alert('Debes llenar todos los campos');
            return;
          }
          if(fields.marca === bicicleta?.marca && fields.color === bicicleta?.color) {
            alert('No se realizaron cambios');
            return;
          }
          if(!bicicleta){
            postBicicleta(fields).then((response) => {
              if(response.state === "Success") {
                setBicicleta(response.data);
                setModalVisible(false);
                setError(null);
                setBicicletaNotExists(false);
                Alert.alert(
                  "Bicicleta Registrada",
                  "Datos de tu bicicleta guardados correctamente\n",
                  [
                    { text: 'OK', onPress: () => setModalVisible(false) }
                  ]
                );
              }else{
                //setBicicleta(null);
                alert(response.message || 'Hubo un error al registrar los datos de la bicicleta 🥺');
              }
            });
          }else{
            putBicicleta(fields).then((response) => {
              if(response.state === "Success") {
                setBicicleta(response.data);
                setModalVisible(false);
                setError(null);
                Alert.alert(
                  "Bicicleta Actualizada",
                  "Bicicleta modificada correctamente\n",
                  [
                    { text: 'OK', onPress: () => setModalVisible(false) }
                  ]
                );
              }else{
                //setBicicleta(null);
                alert(response.message || 'Hubo un error al modificar la bicicleta 🥺');
              }
            });
          }
        };
  return (
    <View>
      {error && (
        <View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        )}
      {!bicicleta && !error && !bicicletaNotExists && <Text>Cargando bicicleta...</Text>}
      {!error && (bicicleta || bicicletaNotExists) && (
        <>
        <View style={styles.bicicletaContainer}>
          <View style={styles.row}>
            <Text style={styles.bicicletaTitle}>Marca: </Text> 
            <Text style={styles.bicicletaDetail}>{bicicleta?.marca || 'No definido' }</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bicicletaTitle}>Color: </Text> 
            <Text style={styles.bicicletaDetail}>{bicicleta?.color || 'No definido'}</Text>
          </View>
        </View>
        <CustomButton
                onPress={() => setModalVisible(true)}
                title={!bicicletaNotExists ? 'Actualizar datos' : 'Registrar datos'}
            />
        {/* <Button
          title={!bicicletaNotExists ? 'Actualizar datos' : 'Registrar datos'}
          onPress={() => setModalVisible(true)}
          color="#2A628F"
        /> */}
        </>
      )}
      <BicicletaModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        bicicletaNotExists={bicicletaNotExists} 
        handleFieldChange={handleFieldChange} 
        handleActualizar={handleActualizar}
        fields={fields} 
      ></BicicletaModal>
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: 'pink',
    borderRadius: 5,
    padding: 10,
  },
  bicicletaContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginVertical: 10,
    height: 150,
    width: 300,
    marginBottom: 30,
    // marginHorizontal: 50,
    // padding: 20,
    // backgroundColor: '#FFF',
    // borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
  },
  bicicletaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  bicicletaDetail: {
    fontSize: 16,
    color: Colors.light.text,
  },
});
