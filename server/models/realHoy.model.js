const mongoose = require("mongoose");

const realHoySchema = new mongoose.Schema({
  compra: Number,
  venta: Number,
  casa: String,
  nombre: String,
  fechaActualizacion: Date,
  variacion: { type: Number, default: 0 },
  info: { type: String, default: "Sin informacion" },
});

module.exports = mongoose.model("RealHoy", realHoySchema);
