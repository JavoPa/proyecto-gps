import React, {useEffect, useState} from 'react';
import { StyleSheet, Button, TextInput} from 'react-native';
import { validar } from '@/services/acceso.service';
import { Alert } from 'react-native';
import ColorTheme from '@/components/ColorTheme';
import { Text, View } from '../Themed';
import BicicletaModal from '../BicicletaModal';
import Colors from '@/constants/Colors';
import { updateBicicletaUsuario } from '@/services/bicicleta.service';

export default function ValidarInfo() {
      interface Acceso {
        token: string;
        entrada: Date;
        usuario: {
          _id: string;
          nombre: string;
          apellido: string;
          rut: string;
          bicicleta: {
            marca: string;
            color: string;
          }
        } 
      }
      interface Bicicleta {
        marca: string;
        color: string;
        // ... otras propiedades de la bicicleta ...
      }
      //Obtener el esquema de color para el texto del placeholder
      const colorScheme = ColorTheme();
      const textColor = colorScheme === 'dark' ? '#fff' : '#000';
      const [bicicleta, setBicicleta] = useState<Bicicleta | null>(null);
      const [token, setToken] = useState('');
      const [modalActualizarVisible, setModalActualizarVisible] = useState(false);
      const [bicicletaNotExists, setBicicletaNotExists] = useState(false);
      const handleTokenChange = (value: string) => {
        if (value.length <= 4) {
          setToken(value);
        }
      };
      const handleFieldChange = (field: string, value: string) => {
        if (value.length <= 20) {
          setFields({
            ...fields,
            [field]: value,
          });
        }
      };
      // Datos de la bicicleta
      const [fields, setFields] = useState({
        marca: '',
        color: '',
        // Agrega más campos según sea necesario
      });
      const [acceso, setAcceso] = useState<Acceso | null>(null);
      const [error, setError] = useState<string | null>(null);
        const handleIngresar = () => {
          setError(null);
          if(token === '') {
            alert('Debes ingresar un código');
            return;
          }
          validar(token).then((response) => {
            if(response.state === "Success") {
              setAcceso(response.data);
              if(!response.data.usuario.bicicleta){
                setBicicletaNotExists(true);
                setBicicleta(null);
              }else{
                setBicicleta(response.data.usuario.bicicleta);
                setBicicletaNotExists(false);
                setFields({marca: response.data.usuario.bicicleta.marca, color: response.data.usuario.bicicleta.color});
              }
              Alert.alert(
                "Ingreso Registrado",
                "Ingreso registrado correctamente\n" + 
                "Estudiante:" + response.data.usuario.nombre + " " + response.data.usuario.apellido + 
                "\nRUT: " + response.data.usuario.rut +
                "\n" + "Bicicleta: " + (response.data.usuario.bicicleta
                  ? response.data.usuario.bicicleta.marca + " " + response.data.usuario.bicicleta.color 
                  : "No registrada"),
                [
                  { text: 'Actualizar datos', onPress: () => setModalActualizarVisible(true) },
                  { text: 'OK' }
                ]
              );
              setToken('');
            }else{
              Alert.alert(
                "Error",
                response.message || "Hubo un error al registrar el ingreso",
                [
                  { text: 'OK', onPress: () => setError(response.message || "Hubo un error al registrar el ingreso") }
                ]
              );
            }
          });
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
          updateBicicletaUsuario(acceso?.usuario._id, fields).then((response) => {
            if(response.state === "Success") {
              setModalActualizarVisible(false);
              setError(null);
              setBicicletaNotExists(false);
              setFields({marca: '',color: '',});
              Alert.alert(
                "Bicicleta Registrada",
                "Datos de la bicicleta guardados correctamente\n",
                [
                  { text: 'OK', onPress: () => setBicicleta(response.data)}
                ]
              );
            }else{
              //setBicicleta(null);
              alert(response.message || 'Hubo un error al registrar los datos de la bicicleta 🥺');
            }
          });
        };
  return (
    <View>
        <View>
          <Text style={styles.getStartedText}>Ingresa el código</Text>
          <View>
            <TextInput
                style={[styles.input, {color: textColor}]}
                onChangeText={handleTokenChange}
                value={token}
                keyboardType="numeric"
                maxLength={4}
                placeholder="Ej: 1234"
                placeholderTextColor='gray'
                textAlign="center"
              />
          </View>
          <View style={styles.registrarButton}>
            <Button
              title="Validar"
              onPress={handleIngresar}
            />
          </View>
        </View>
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      {acceso && (
        <View style={styles.container}>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={styles.getStartedText}>Último ingreso registrado:</Text>
          <Text style={styles.text}>Nombre: {acceso.usuario.nombre} {acceso.usuario.apellido}</Text>
          <Text style={styles.text}>RUT: {acceso.usuario.rut}</Text>
          <Text style={styles.text}>Bicicleta: {bicicleta ? `${bicicleta.marca} ${bicicleta.color}` : 'No registrada'}</Text>
          <Text style={styles.text}>Fecha: {new Date(acceso.entrada).toLocaleDateString()}</Text>
          <Text style={styles.text}>Hora: {new Date(acceso.entrada).toLocaleTimeString()}</Text>
        </View>
      )}
      <BicicletaModal 
        modalVisible={modalActualizarVisible} 
        setModalVisible={setModalActualizarVisible} 
        bicicletaNotExists={bicicletaNotExists} 
        handleFieldChange={handleFieldChange} 
        handleActualizar={handleActualizar}
        fields={fields} 
      ></BicicletaModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenText: {
    textAlign: 'center',
    fontSize: 50,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 10,
  },
  qrCode: {
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timerText: {
    textAlign: 'center',
    fontSize: 18,
  },
  registrarButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 5,
    margin: 20,
  },
  getStartedText: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});