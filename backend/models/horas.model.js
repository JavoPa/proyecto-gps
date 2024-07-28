const mongoose = require("mongoose");

const horaSchema = new mongoose.Schema({
    limiteEntrada: {
        type: String,
        required: true,
    },
    limiteSalida: {
        type: String,
        required: true,
    }
});

// horaSchema.pre('save', function(next) {
//     const entrada = this.limiteEntrada.split(':').map(Number);
//     const salida = this.limiteSalida.split(':').map(Number);
//     if (entrada[0] > salida[0] || (entrada[0] === salida[0] && entrada[1] >= salida[1])) {
//         return next(new Error('El límite de entrada debe ser anterior al límite de salida.'));
//     }
//     next();
// });

const Horas = mongoose.model("Horas", horaSchema);

module.exports = Horas;