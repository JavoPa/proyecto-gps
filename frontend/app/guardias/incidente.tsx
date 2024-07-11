import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import IncidentesMenu from '../../components/incidentes/IncidentesMenu';
import MostrarIncidentes from '../../components/incidentes/MostrarIncidentes';
import DescargarInforme from '../../components/incidentes/DescargarInforme';
import RegistrarIncidente from '../../components/incidentes/RegistrarIncidente';
import IncidentesDia from '../../components/incidentes/IncidentesDia';

export default function IncidentesScreen() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const navigateTo = (component: string) => {
      setSelectedComponent(component);
  };

  let content;
  
  switch (selectedComponent) {
    case "MostrarIncidentes":
      content = <MostrarIncidentes />;
    break;

    case "IncidentesDia":
      content = <IncidentesDia />;
    break;

    case "DescargarInforme":
      content = <DescargarInforme/>
    break;

    case "RegistrarIncidente":
      content = <RegistrarIncidente />;
    break;

    default:
      content = <IncidentesMenu navigateTo={navigateTo} />;
    break;
  }

  return (
      <View style={styles.container}>
          {content}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
  },
});