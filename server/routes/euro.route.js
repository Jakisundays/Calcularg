const EuroHoy = require("../models/euroHoy.model");
const { calcularPorcentajeCambio } = require("../utils/moneyMath");
const eurosRoutes = async (fastify, opts, done) => {
  fastify.get("/", async (request, reply) => {
    try {
      const { data } = await fastify.axios.euro("/latest");
      const { oficial_euro, blue_euro, last_update } = data;
      const euroDB = await EuroHoy.find({});
      if (euroDB.length === 0) {
        const primerosEuros = await EuroHoy.insertMany([
          {
            nombre: "euro oficial",
            casa: "oficial_euro",
            compra: oficial_euro.value_buy,
            venta: oficial_euro.value_sell,
            fechaActualizacion: last_update,
            info: "El euro oficial o minorista es el precio al que pueden acceder los particulares.",
          },
          {
            nombre: "euro blue",
            casa: "blue_euro",
            compra: blue_euro.value_buy,
            venta: blue_euro.value_sell,
            fechaActualizacion: last_update,
            info: "Se trata del fenómeno del 'euro ilegal', vendido directamente entre personas a través de canales informales como 'cuevas' o vendedores callejeros, conocidos como 'arbolitos' en nuestro país.",
          },
        ]);
        return primerosEuros;
      }
      if (euroDB[0].fechaActualizacion === last_update) {
        return euroDB;
      }
      const eurosToUpdate = [
        { ...oficial_euro, nombre: "euro oficial" },
        { ...blue_euro, nombre: "euro blue" },
      ];
      for (let i = 0; i < eurosToUpdate.length; i++) {
        const euro = eurosToUpdate[i];
        const euroEnDB = await EuroHoy.findOne({ nombre: euro.nombre });
        const porcentajeCambio = calcularPorcentajeCambio(
          euroEnDB.venta,
          euro.value_sell
        );
        await EuroHoy.findOneAndUpdate(
          { nombre: euro.nombre },
          {
            venta: euro.value_sell,
            compra: euro.value_buy,
            variacion: porcentajeCambio,
            fechaActualizacion: last_update,
          },
          { new: true }
        );
      }
      const euroDBActualizado = await EuroHoy.find({});
      return euroDBActualizado;
    } catch (error) {
      console.log(error);
      return { error: "Failed to fetch data from the API" };
    }
  });

  fastify.get("/delete", async () => {
    await EuroHoy.deleteMany({});
    return "documentos eliminados.";
  });
  done();
};

module.exports = eurosRoutes;
