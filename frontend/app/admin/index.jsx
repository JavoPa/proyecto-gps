import { StyleSheet, Pressable, ScrollView ,ActivityIndicator, Button, Modal, TextInput, FlatList, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useSession } from '@/flo';
import { Text, View } from '@/components/Themed';
import React, { useState, useEffect } from 'react';
import { obtenerUsuarios } from '@/services/busqueda.user';
import { eliminarUsuario, editarUsuario } from '@/services/crear.Usuarios';
import { useRouter } from 'expo-router';


export default function TabOneScreen() {
    const { session } = useSession();
    const [usuarios, setUsuarios] = useState([]);
    const [usuarios2, setUsuarios2] = useState([]); // mostrar detalle de usuario espeficico
    const [usuarios3, setUsuarios3] = useState([]); // copia de usuarios para buscar y renderizar
    const [usuarios4, setUsuarios4] = useState([]); // usuarios4 para editar
    const [cargando,setCargando] = useState(false);
    const [consulta,setConsulta] = useState(); // busqueda de usuarios
    const [modalVisible, setModalVisible] = useState(false); // estado para mostrar el modal
    const [modalVisibleEditar, setModalVisibleEditar] = useState(false); // estado para mostrar el modal

    const [rut, setRut] = useState(''); // estado para mostrar el modal
    const [nombre, setNombre] = useState(''); // estado para mostrar el modal
    const [apellido, setApellido] = useState(''); // estado para mostrar el modal
    const [correo, setCorreo] = useState(""); // estado para mostrar el modal
    const [fono, setFono] = useState(''); // estado para mostrar el modal// estado para mostrar el modal
    const [contraseña, setContraseña] = useState(''); // estado para mostrar el modal// estado para mostrar el modal

    const router = useRouter();
    
    const sacarDatos = () => {
      setCargando(true);
      obtenerUsuarios(session).then((data) => {
        if(!data) Alert.alert('Error al obtener los usuarios');
        setUsuarios(data.data);
        setUsuarios3(data.data);
      });
      setCargando(false);
    }
 
    //funcion para buscar usuarios por rut
    const handleSearch = (consulta) => {
      setConsulta(consulta);
      if(consulta == undefined) {
        setUsuarios3(usuarios);
      }else{
        const user = usuarios.filter((user) => user.rut.toLowerCase().includes(consulta.toLowerCase()));
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
      setCargando(true);
      handleSearch();
      sacarDatos();
      setCargando(false);
    }, []);

    

    //funcion para mostrar el modal con usuario especifico
    const handleModal = (id) => {
      //setCargando(true);
      setUsuarios2(usuarios.filter((user) => user._id === id)[0]);
      setModalVisible(true);
      setCargando(false);
      /*
      setTimeout(() => {
        setCargando(false);
      },500);*/
    }
    const handleEditar= (id) => {
      setCargando(true);
      const User = usuarios.filter((user) => user._id === id)[0];
      setUsuarios4(User);
      setModalVisible(false);
      setModalVisibleEditar(true);
      setCargando(false);
      /*
      setTimeout(() => {
        setModalVisible(false);
        setModalVisibleEditar(true);
        setCargando(false);
      },1000);*/
    }

    const handleElminar = (id) => {
      setCargando(true);
      console.log(id);
      eliminarUsuario(id).then((data) => {
        if(!data) Alert.alert('Error al eliminar el usuario');
        Alert.alert('Eiminado',`${data.message}`);
        setCargando(true);
        sacarDatos();
        setCargando(false);
      });
    }

    const handleGuardar = (id) => {
      const User = (usuarios.filter((user) => user._id === id)[0]).nombre;
      //comprobar que los datos no esten vacios
      if(!nombre ) { 
        if(!apellido) {
          if(!correo) {
            if(!fono) {
              if(!contraseña) {
                Alert.alert('No se ha modificado ningun campo');
                return;
              }
            }
          }
        }
      }
     
      const seteo ={
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        fono: fono,
        password: contraseña,
      }
      //console.log(seteo);
      editarUsuario(id,seteo).then((res) => {
        if(res.message != undefined){
            Alert.alert(`Usuario ${User}`,`${res.message}`);
            setModalVisibleEditar(false);
            return;
        }
        //if(!data) Alert.alert('Error al editar el usuario');
        //Alert.alert('Editado',`${data.rut} ${data.nombre}`);
      });
      return;
      //return router.replace('/admin')
    }

    const setear = () => {
      setNombre("");
      setApellido("");
      setFono("");
      setCorreo("");
      setContraseña("");
      sacarDatos();
    }
    const espera = () => {
      setCargando(true);
      // Simula una tarea asincrónica
      setTimeout(() => {
        setCargando(false);
      }, 3000); // Cambia el tiempo según sea necesario
    };

    return (
      <View style={styles.container}>
        <Text style= {styles.titel}>Lista de usuarios</Text>
        <TextInput
          placeholder='Buscar por rut'
          style={styles.busqueda}
          value={consulta}
          onChangeText={handleSearch}
        />
        <ScrollView >
           {/* renderiza botones Preseables que al tocarlos activan el modal que muestra detalle*/}
        {usuarios3.map((user) => (
        <View
          style={styles.vistaUsuario}
          key={user._id}
        >    
          <Text style={styles.usuarios}>Rut: {user.rut}</Text>
          <Text style={styles.usuarios}>{user.nombre}</Text>
          <View style={styles.vistaBotones}>
            <TouchableOpacity style={styles.bo} onPress={()=>handleModal(user._id)} >
              <Text style={styles.buttonText}>Ver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonEliminar}  onLongPress={()=>handleElminar(user._id)} >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
          

          <Modal
            visible={modalVisible}
            animationType="fade"
            onRequestClose={()=>setModalVisible(false)}
            transparent={false}
          >
            <View style={styles.modalContainer}>
              <View style={styles.detalle}>
                <Text style={styles.usuarios}>Rut: {usuarios2.rut}</Text>
                <Text style={styles.usuarios}>Nombre: {usuarios2.nombre}</Text>
                <Text style={styles.usuarios}>Apellido: {usuarios2.apellido}</Text>
                <Text style={styles.usuarios}>Correo:{usuarios2.correo}</Text>
                <Text style={styles.usuarios}>Fono: {usuarios2.fono}</Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity style={styles.modalButton}  onPress={()=>setModalVisible(false)} >
                    <Text style={styles.modalButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                  <TouchableHighlight style={styles.modalButton}  onPress={()=>{
                    handleEditar(usuarios2._id)
                    }}>
                    <Text style={styles.modalButtonText}>Editar</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          {/*Modal de editar */}
          <Modal
            visible={modalVisibleEditar}
            animationType="fade"
            onRequestClose={()=>setModalVisibleEditar(false)}
            transparent={false}
          >
          <View style={styles.modalContainer}>
            <View style={styles.detalle}>
              <Text style={styles.titel}>Editar Usuario</Text>
              <Text style={styles.textoNoEditar}>{usuarios4.rut}</Text>
              <TextInput style={styles.textoEditar} placeholder={usuarios4.nombre} onChangeText={setNombre}/>
              <TextInput style={styles.textoEditar} placeholder={usuarios4.apellido} onChangeText={setApellido}/>
              <TextInput style={styles.textoEditar} placeholder={usuarios4.fono} onChangeText={setFono}/>
              <TextInput style={styles.textoEditar} placeholder={usuarios4.correo} onChangeText={setCorreo}/>
              <TextInput style={styles.textoEditar} placeholder='********' onChangeText={setContraseña}/>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={()=>{
                    handleGuardar(usuarios4._id)
                    setear();
                  }}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>{
                    setear();
                    setModalVisibleEditar(false)
                  }}

                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </Modal>
          {/*Modal de Cargando */}
          <Modal
            visible={cargando}
            animationType="none"
            transparent={false}
            onRequestClose={()=>setCargando(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            </View>
          </Modal>
        </View>
        
        ))}
      </ScrollView>
        <TouchableOpacity onPress={sacarDatos} style={styles.bo}>
          <Text style={styles.modalButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>

    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EDF2F4',
  },
  vistaUsuario : {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#ffffff'  
  },
  usuarios : {
    fontSize: 18,
    color: '#16324F',
  },
  modalButtonText: {
    color: '#FFFFFF', // Color del texto de los botones del modal
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#2A628F', // Color de los botones del modal
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vistaBotones: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  buttonText: {
    color: '#FFFFFF', // Color del texto de los botones
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  modalButtonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EDF2F4',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF', // Fondo del input
  },
  detalle : {
    width: '90%',
    maxWidth: 600,
    backgroundColor: '#EDF2F4', // Fondo del modal
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  titel : {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#13293D',
    textAlign: 'center',
  },
  busqueda: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    borderWidth: 1,
  },
  botonEliminar:{
    backgroundColor: '#DB2B39', // Color de los botones de eliminar
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bo:{
    backgroundColor: '#2A628F',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vistaEditar:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  textoEditar:{
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  textoNoEditar:{
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#EDF2F4',
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
  modalContent: {
    width: 150,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});