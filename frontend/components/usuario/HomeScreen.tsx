import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';
import { getAcceso } from '@/services/acceso.service';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [estado, setEstado] = useState<string | null>(null);
  useFocusEffect(
    React.useCallback(() => {
      const fetchAcceso = async () => {
        try {
          const response = await getAcceso();
          if (response.state === "Success") {
            setEstado(response.data);
          } else {
            setEstado('Hubo un problema al obtener tu estado');
          }
        } catch (error) {
          setEstado('Hubo un problema al obtener tu estado');
        }
      };

      fetchAcceso();
      return () => {
      };
    }, [])
  );
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Estado actual de tu acceso: 
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>{estado}</MonoText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
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
