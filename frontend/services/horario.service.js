import axios from './root.service';

export async function getHorarios() {
    try {
        const response = await axios.get('/horarios/');
        return response.data;
      } catch (error) {
        if (error.response) {
            // La solicitud se realizó y el servidor respondió con un estado de error
            return error.response.data;
          } else {
            return { message: 'Ocurrió un error en la api' };
          }
      }
}

export async function putHorarios(data){
  try{
    const response = await axios.put('/horarios/actualizar', data);
    return response.data;
  }catch(error){
    if(error.response){
      return error.response.data;
    }else{
      return {message: 'Ocurrió un error en la api'};
    }
  }
}