const mongoose = require("mongoose");

const mesInflacionSchema = new mongoose.Schema({
  fecha: String,
  valor: Number,
});

module.exports = mongoose.model("Mes-Inflacion", mesInflacionSchema);

