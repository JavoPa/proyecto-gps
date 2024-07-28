function validarRut(y){
    // Invierte la lista
    console.log(y);
    const l = y.split("").reverse();
    // Crea lista con números de 2 a 7
    let l2 = [2, 3, 4, 5, 6, 7, 2, 3];
    // Crea lista vacía
    let l3 = [];
    // Multiplica cada elemento de la lista por cada elemento de la lista l2
    for (let i = 0; i < l.length; i++) {
        l3.push(parseInt(l[i]) * parseInt(l2[i]));
        //console.log("l [" + i + "] " + l[i]+  " * " + l2[i]+ " = " + l3);
    }
    /*
    console.log("y " + y);
    console.log("l " + l);
    console.log("l.length " + l.length);
    console.log(l3);*/
    // Suma los elementos de la lista l3
    let suma = l3.reduce((a, b) => a + b, 0);
    // Divide la suma por 11
    let div = suma / 11;
    
    // Redondea el resultado hacia arriba
    div = Math.trunc(div);

    // Multiplica el resultado de la división por 11
    div = div * 11;
    // Resta el resultado de la suma por el resultado de la multiplicación
    let resta = suma - div;
    // Resta el resultado de la resta por 11
    resta = 11 - resta;
    // Si el resultado de la resta es 10, el dígito verificador es K
    // Si el resultado de la resta es 11, el dígito verificador es 0
    if (resta === 10) {
        return "K";
    }
    if (resta === 11) {
        return 0;
    }
    return resta;
}


module.exports = {validarRut}