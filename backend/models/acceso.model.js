const mongoose = require("mongoose");

const accesoSchema = new mongoose.Schema({
    
});

const Acceso = mongoose.model("Acceso", accesoSchema);

module.exports = Acceso;