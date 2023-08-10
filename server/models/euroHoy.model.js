const mongoose = require("mongoose");

const euroHoySchema = new mongoose.Schema({
  compra: Number,
  venta: Number,
  nombre: String,
  casa: String,
  fechaActualizacion: Date,
  variacion: { type: Number, default: 0 },
  info: { type: String, default: "Sin informacion" },
});

module.exports = mongoose.model("EuroHoy", euroHoySchema);
