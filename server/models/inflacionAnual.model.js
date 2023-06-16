const mongoose = require("mongoose");

const anualInflacionSchema = new mongoose.Schema({
  fecha: String,
  valor: Number,
});

module.exports = mongoose.model("Anual-Inflacion", anualInflacionSchema);

