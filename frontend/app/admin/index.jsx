import { StyleSheet, Pressable, ScrollView ,ActivityIndicator, Button, Modal, TextInput, FlatList, Alert } from 'react-native';
import { useSession } from '@/flo';
import { Text, View } from '@/components/Themed';
import React, { useState, useEffect } from 'react';
import { obtenerUsuarios } from '@/services/busqueda.user';
import { eliminarUsuario } from '@/services/crear.Usuarios';


export default function TabOneScreen() {
    const { signOut, session } = useSession();
    const [usuarios, setUsuarios] = useState([]);
    const [usuarios2, setUsuarios2] = useState([]); // mostrar detalle de usuario espeficico
    const [usuarios3, setUsuarios3] = useState([]); // copia de usuarios para buscar y renderizar
    const [usuarios4, setUsuarios4] = useState([]); // usuarios4 para editar
    const [cargando,setCargando] = useState(true);
    const [consulta,setConsulta] = useState(); // busqueda de usuarios
    const [modalVisible, setModalVisible] = useState(false); // estado para mostrar el modal
    const [modalVisibleEditar, setModalVisibleEditar] = useState(false); // estado para mostrar el modal

    const [rut, setRut] = useState(''); // estado para mostrar el modal
    const [nombre, setNombre] = useState(''); // estado para mostrar el modal
    const [apellido, setApellido] = useState(''); // estado para mostrar el modal
    const [correo, setCorreo] = useState(''); // estado para mostrar el modal
    const [fono, setFono] = useState(''); // estado para mostrar el modal// estado para mostrar el modal
    const [contraseña, setContraseña] = useState('Password'); // estado para mostrar el modal// estado para mostrar el modal
    



    const sacarDatos = () => {
      obtenerUsuarios(session).then((data) => {
        if(!data) Alert.alert('Error al obtener los usuarios');
        setUsuarios(data.data);
        setUsuarios3(data.data);
        setCargando(false);
      });
    }
 
    //funcion para buscar usuarios por rut
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
      handleSearch();
      sacarDatos();
    }, []);

    if(cargando){
      return <ActivityIndicator size="large" color="#0000ff"/>
    }

    //funcion para mostrar el modal con usuario especifico
    const handleModal = (id) => {
      setUsuarios2(usuarios.filter((user) => user._id === id)[0]);
      setModalVisible(true);
    }
    const handleEditar= (id) => {
      const User = usuarios.filter((user) => user._id === id)[0];
      setUsuarios4(User);
      setModalVisible(false);
      setModalVisibleEditar(true);
    }

    const handleElminar = (id) => {
      console.log(id);
      eliminarUsuario(id).then((data) => {
        if(!data) Alert.alert('Error al eliminar el usuario');
        Alert.alert('Eiminado',`${data.message}`);
        setCargando(true);
        sacarDatos();
        setCargando(false);
      });
    }

    const handleGuardar = () => {
      
      if(rut == '') {
        setRut(usuarios4.rut);
      }
      if(nombre == '') {
        setNombre(usuarios4.nombre);
      }
      if(apellido == '') {
        setApellido(usuarios4.apellido);
      }
      if(correo == '') {
        setCorreo(usuarios4.correo);
      }
      if(fono == '') {
        setFono(usuarios4.fono);
      }
      if(contraseña == 'Password') {
        setContraseña(usuarios4.password);
      }
      console.log(rut);
      console.log(nombre);
      console.log(apellido);
      console.log(correo);
      console.log(fono);
      console.log(contraseña);
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
           {/* renderiza botones Preseables que al tocarlos activan el modal que muestra detalle*/}
        {usuarios3.map((user) => (
        <View
          style={styles.vistaUsuario}
          key={user._id}
        >  
          <View style={{ alignItems:'center',backgroundColor:'#3e92cc'}}>
            <Text style={styles.usuarios}>Rut: {user.rut}</Text>
            <Text style={styles.usuarios}>{user.nombre}</Text>
          </View>
          <View style={{backgroundColor:'#3e92cc', flexDirection:'row',marginLeft:'auto',}}>
            <Pressable style={styles.bo}  onPress={()=>handleModal(user._id)} >
              <Text style={styles.usuarios}>Ver</Text>
            </Pressable>
            <Pressable style={styles.bo}  onLongPress={()=>handleElminar(user._id)} >
              <Text style={styles.usuarios}>Eliminar</Text>
            </Pressable>
            
          </View>
          

          <Modal
            visible={modalVisible}
            animationType="fade"
            onRequestClose={()=>setModalVisible(false)}
            transparent={false}
          >
            <View style={styles.detalle}>
              <Text style={styles.usuarios}>Rut: {usuarios2.rut}</Text>
              <Text style={styles.usuarios}>Nombre: {usuarios2.nombre}</Text>
              <Text style={styles.usuarios}>Apellido: {usuarios2.apellido}</Text>
              <Text style={styles.usuarios}>Correo: {usuarios2.correo}</Text>
              <Text style={styles.usuarios}>Fono: {usuarios2.fono}</Text>
              <Pressable style={styles.bo}  onPress={()=>setModalVisible(false)} >
                <Text style={styles.usuarios}>Cerrar</Text>
              </Pressable>
              <Pressable style={styles.bo}  onPress={()=>handleEditar(usuarios2._id)} >
                <Text style={styles.usuarios}>Editar</Text>
              </Pressable>
            </View>
          </Modal>
          {/*Modal de editar */}
          <Modal
            visible={modalVisibleEditar}
            animationType="slide"
            onRequestClose={()=>setModalVisibleEditar(false)}
            transparent={false}
          >
            <View style={styles.vistaEditar}>
              <Text style={styles.titel}>Editar Usuario</Text>
              <TextInput style={styles.textoEditar} placeholder={usuarios4.rut} onChangeText={setRut}/>
              <TextInput style={styles.textoEditar} placeholder={usuarios4.nombre} onChangeText={setNombre}/>
              <TextInput style={styles.textoEditar} placeholder={usuarios4.apellido} onChangeText={setApellido}/>
              <TextInput style={styles.textoEditar} placeholder={usuarios4.fono} onChangeText={setFono}/>
              <TextInput style={styles.textoEditar} placeholder={usuarios4.correo} onChangeText={setCorreo}/>
              <TextInput style={styles.textoEditar} placeholder='********' onChangeText={setContraseña}/>
              <View style={styles.vistaBotones}>
                <Pressable
                  onPress={handleGuardar}
                  style={styles.botoEditar}
                >
                  <Text>Guardar</Text>
                </Pressable>
                <Pressable
                  onPress={()=>setModalVisibleEditar(false)}
                  style={styles.botoEditar}
                >
                  <Text>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        
        ))}
      </ScrollView>
        <Pressable onPress={sacarDatos} style={styles.bo}>
          <Text style={styles.usuarios}>Actualizar</Text>
        </Pressable>
      </View>

    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#3e92cc',
  },
  vistaUsuario : {
    alignContent: 'center',
    backgroundColor: '#2a628f',
    padding: 10,
    marginVertical: 8,
    marginLeft:20,
    marginRight:20,
    borderRadius: 10,
    elevation: 5,  
    flexDirection: 'row',
    backgroundColor: '#3e92cc'  
  },
  usuarios : {
    fontSize: 19,
    marginVertical: 2,
    color: 'black',
    width: '25',
    margin: 5,
  },
  detalle : {
    flex: 1,
    backgroundColor: '#3e92cc',
    padding:30,
    borderRadius: 10,
    elevation: 5,
    margin: 10,
  },
  titel : {
    fontSize: 30,
    marginVertical: 8,
    color: '#000',
    textAlign: 'center',
    backgroundColor: '#3e92cc',
    borderRadius: 25,
    width: 'auto',
  },
  busqueda: {
    backgroundColor: '#edf2f4',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
  },
  bo:{
    backgroundColor: '#edf2f4',
    padding: 10,
    margin:5,
    borderRadius: 10,
    alignItems: 'center',
    borderRightColor: '#000',
    borderWidth: 2,
  },
  vistaEditar:{
    flex: 1,
    backgroundColor: '#3e92cc',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 22,
  },
  textoEditar:{
    fontSize: 20,
    color: '#000',
    margin: 5,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
    padding: 12,
  },
  botoEditar:{
    padding:10,
    backgroundColor: '#3e92cc',
    justifyContent:'center',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
    margin: 5,
  },
  vistaBotones: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3e92cc',
  }
});