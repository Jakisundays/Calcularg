const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definir el esquema del modelo
const inflacionDataSchema = new Schema({
  data: [
    {
      d: { type: String, required: true },
      v: { type: Number, required: true },
    },
  ],
});

// Exportar el modelo
module.exports = mongoose.model("inflacion-Data", inflacionDataSchema);
