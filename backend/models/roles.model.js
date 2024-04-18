const mongoose = require("mongoose");
const Tipo = require("../constants/roles.constants.js");

// Crea el esquema de la coleccion 'roles'
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: Tipo,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

// Crea el modelo de datos 'Role' a partir del esquema 'roleSchema'
const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
