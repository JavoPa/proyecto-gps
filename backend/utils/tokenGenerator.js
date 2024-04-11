// funcion para generar tokens temporales de 4 dígitos
function generarToken() {
    return Math.floor(1000 + Math.random() * 9000);
  }
  
  const tokenTemporal = generarToken();  