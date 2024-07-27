import React, {useEffect, useState} from 'react';
import { StyleSheet, Button, Image} from 'react-native';
import { registrarIngreso, getAcceso, registrarSalida } from '@/services/acceso.service';
import QRCode from 'react-native-qrcode-svg';
import { Text, View } from '../Themed';

import Colors from '@/constants/Colors';

export default function TokenInfo() {
    interface Acceso {
        token: string;
      }
      const [acceso, setAcceso] = useState<Acceso | null>(null);
      const [isIngresada, setIsIngresada] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);
      const [timeLeft, setTimeLeft] = useState<number | null>(null); // Inicia el temporizador
      
      useState(() => {
        getAcceso().then((response) => {
          if(response.state === "Success" && response.data === "Bicicleta registrada") {
            setIsIngresada(true);
          } else if(response.state === "Success" && response.data === "Bicicleta no registrada") {
            setIsIngresada(false);
          }
        });
      });

        useEffect(() => {
              // Salir antes si llega a 0
            if(!timeLeft) {
              setAcceso(null); 
              return;
             }else{
              getAcceso().then((response) => {
                if(response.state === "Success" && response.data === "Bicicleta registrada" && !isIngresada) {
                  setAcceso(null);
                  setTimeLeft(null);
                  setError(null);
                  setIsIngresada(true);
                  alert('Tu acceso ha sido validado 🎉');
                } else if(response.state === "Success" && response.data === "Bicicleta no registrada" && isIngresada) {
                  setIsIngresada(false);
                  setAcceso(null);
                  setTimeLeft(null);
                  setError(null);
                  alert('Tu salida ha sido validada 🎉');
                }
              });
             }

            // Guardar el intervalId para limpiarlo más tarde
            const intervalId = setInterval(() => {
              setTimeLeft(timeLeft - 1);
            }, 1000);

            // Limpiar el intervalo en el hook de limpieza
            return () => clearInterval(intervalId);
        }, [timeLeft]);
        // Obtener los segundos restantes hasta la fecha de expiración
        function getSecondsUntilExpiry(expiryDate: string) {
          const now = new Date();
          const expiry = new Date(expiryDate);
          const differenceInMilliseconds = expiry.getTime() - now.getTime();
          return Math.max(Math.floor(differenceInMilliseconds / 1000), 0);
        }
        // Formatear el tiempo restante en minutos y segundos
        function formatTime(seconds: number | null) {
          if (seconds === null || seconds === 0){
            return 'terminado';
          }
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = seconds % 60;
          return `${minutes} minutos ${remainingSeconds} segundos`;
        }
        const handleIngreso = () => {
          registrarIngreso().then((response) => {
            if(response.state === "Success") {
              setAcceso(response.data);
              setTimeLeft(getSecondsUntilExpiry(response.data.expiryDate)); // Inicia el temporizador en base a la fecha de expiración
              setError(null);
            }else{
              setAcceso(null);
              setError(response.message);
              alert(response.message || 'Hubo un error al generar el token 🥺');
            }
          });
        };

        const handleSalida = () => {
            registrarSalida().then((response) => {
              if(response.state === "Success") {
                setAcceso(response.data);
                setTimeLeft(getSecondsUntilExpiry(response.data.expiryDate)); // Inicia el temporizador en base a la fecha de expiración
                setError(null);
              }else{
                setAcceso(null);
                setError(response.message);
                alert(response.message || 'Hubo un error al generar el token 🥺');
              }
            });
          };

        const handleCancelar = () => {
          setAcceso(null);
          setTimeLeft(null);
          setError(null);
        };
  return (
    <View>
      {acceso ? (
        <View style={styles.container}>
          <Text style={styles.getStartedText}>Presenta el código al guardia para ingresar</Text>
          <View style={styles.qrCode}>
            <QRCode value={acceso.token.toString()} size={200} />
          </View>
          <Text style={styles.tokenText}>{acceso.token}</Text>
          <Text style={styles.timerText}>Tiempo restante: {formatTime(timeLeft)}</Text>
          <Button
              title="Cancelar"
              onPress={handleCancelar}
            />
        </View>
      ) : isIngresada ? (
        <View style={styles.container}>
          <Text style={styles.title}>Bicicleta Registrada</Text>
          <Text style={styles.separator}></Text>
          <Image source={require('../../assets/images/salir.png')} style={styles.icon} />
          <Text style={styles.separator}></Text>
          <Text style={styles.getStartedText}>Presiona el botón para registrar tu salida</Text>
          <View style={styles.registrarButton}>
            <Button
              title="Registrar Salida"
              onPress={handleSalida}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Bicicleta No Registrada</Text>
          <Text style={styles.separator}></Text>
          <Image source={require('../../assets/images/ingresar.png')} style={styles.icon} />
          <Text style={styles.separator}></Text>
          <Text style={styles.getStartedText}>Presiona el botón para registrar tu ingreso</Text>
          <View style={styles.registrarButton}>
            <Button
              title="Registrar Ingreso"
              onPress={handleIngreso}
            />
          </View>
        </View>
      )}
      {error && <Text style={styles.errorText}>⚠ {error} ⚠</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  tokenText: {
    textAlign: 'center',
    fontSize: 50,
  },
  icon:{
    width: 225,
    height: 125,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 15,
    backgroundColor: 'pink',
    borderRadius: 5,
    padding: 10,
  },
  qrCode: {
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: 20,
    padding: 20,
    backgroundColor: '#fff',
    aspectRatio: 1,
    width: '60%',
  },
  timerText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
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
  //
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
