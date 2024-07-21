import { StyleSheet, Pressable, ScrollView,useColorScheme ,ActivityIndicator, Button, Modal, TextInput, FlatList } from 'react-native';
import { useSession } from '@/flo';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


export default function TabOneScreen() {
    const { signOut, session } = useSession();
    const [usuarios, setUsuarios] = useState([]);
    const [usuarios2, setUsuarios2] = useState([]);
    const [usuarios3, setUsuarios3] = useState([]);
    const [cargando,setCargando] = useState(true);
    const [consulta,setConsulta] = useState(); // busqueda de usuarios
    const [modalVisible, setModalVisible] = useState(false); // estado para mostrar el modal

    //funcion para obtener los datos de los usuarios y setearlos en el estado
    const obtenerdatos = async function getUser(a) {
      try {
        const user = await axios.get('http://192.168.1.3:4000/api/users/allUsers',{headers: {Authorization: `Bearer ${a}`}});
        setUsuarios(user.data);
        setUsuarios3(user.data);
        setCargando(false);
      } catch (error) {
        console.log(error.response);
      }
    }

    const handleSearch = () => {
      if(consulta == undefined) {
        setUsuarios3(usuarios);
      }else{
        const user = usuarios.filter((user) => user.rut.includes(consulta));
        setUsuarios3(user);
      }
      if(consulta == '') {
        setUsuarios3(usuarios);
      }
      if(consulta == null) {
        setUsuarios3(usuarios);
      }
    }

    //obtener usuarios por nombre mandando la session a la funcion
    useEffect(() => {
      obtenerdatos(session);
      handleSearch();
    }, []);

    if(cargando){
      return <ActivityIndicator size="large" color="#0000ff"/>
    }

    //funcion para mostrar el modal con usuario especifico
    const handleModal = (id) => {
      setUsuarios2(usuarios.filter((user) => user._id === id)[0]);
      setModalVisible(true);
    }
   

    return (
      <View style={styles.container}>
        <Text style= {styles.titel}>Lista de usuarios</Text>
        <TextInput
          placeholder='Buscar por rut'
          style={styles.busqueda}
          value={consulta}
          onChangeText={setConsulta}
          onChange={handleSearch}
        />
        <ScrollView >
        {usuarios3.map((user) => (
        <Pressable
          style={styles.vistaUsuario}
          key={user._id}
          onPress={()=>handleModal(user._id)}
        >
            <Text style={styles.usuarios}>Rut: {user.rut}</Text>
            <Text style={styles.usuarios}>{user.nombre}</Text>

          <Modal
            visible={modalVisible}
            animationType="fade"
            onRequestClose={()=>setModalVisible(false)}
            transparent={true}
          >
            <View style={styles.detalle}>
              <Text>{usuarios2.rut}</Text>
              <Text>{usuarios2.nombre}</Text>
              <Text>{usuarios2.apellido}</Text>
              <Text>{usuarios2.correo}</Text>
              <Text>{usuarios2.fono}</Text>
              <Button title="Cerrar" onPress={()=>setModalVisible(false)} />
            </View>
          </Modal>
        </Pressable>
        
        ))}
      </ScrollView>
      <Pressable style={styles.bo} onPress={()=>signOut()} >
        <Text style={styles.usuarios}>Salir</Text>
      </Pressable>
      </View>

    );
/*
    return (
      <View style={styles.container}>
          <FlatList
            data={usuarios}
            keyExtractor={(item) => item._id.toString()}
            style={styles.a}
            renderItem={({item}) => (
              
              <View style={styles.vistaUsuario} >
                <Text style={styles.usuarios}>{item.nombre}</Text>
                <Text style={styles.usuarios}>{item.rut}</Text>
                <Text style={styles.usuarios}>{item.rol}</Text>
                <View style={styles.bo}>
                  <Pressable onPress={handleModal} >
                    <Text>Editar</Text>
                  </Pressable>
                </View>
                <Modal
                  visible={modalVisible}
                  animationType="slide"
                  onRequestClose={()=>setModalVisible(false)}
                >
                  <View>
                    <Text>{item.rut}</Text>
                    <Text>{item.nombre}</Text>
                    <Text>{item.apellido}</Text>
                    <Text>{item.fono}</Text>
                    <Text>{item.correo}</Text>
                    <Text>{item.rol}</Text>
                    <Button title="Cerrar" onPress={()=>setModalVisible(false)} />
                  </View>
                </Modal>
              </View>
            )}
          />
        <Button style={styles.bo} title="Salir" onPress={()=>signOut()} />
      </View>
    );*/
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  vistaUsuario : {
    alignContent: 'center',
    backgroundColor: '#2e76e4',
    padding: 10,
    marginVertical: 8,
    marginLeft:20,
    marginRight:20,
    borderRadius: 10,
    elevation: 5,
    
  },
  usuarios : {
    fontSize: 19,
    marginVertical: 2,
    color: 'black',
    width: '25',
    margin: 5,
  },
  detalle : {
    backgroundColor: '#0e4baa',
    padding:30,
    borderRadius: 10,
    elevation: 5,
    margin: '12%',
    marginTop:'50%',
  },
  titel : {
    fontSize: 30,
    marginVertical: 8,
    color: '#000',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 'auto',
  },
  busqueda: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
  },
  bo:{
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    marginLeft:50,
    marginRight:50,
    borderRadius: 10,
    alignItems: 'center',
    borderRightColor: '#000',
    borderWidth: 2,
  }
});