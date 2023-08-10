const RealHoy = require("../models/realHoy.model");
const { convertirFechaLocalAUTC } = require("../utils/fechaMath");
const { calcularPorcentajeCambio } = require("../utils/moneyMath");
const realRoutes = async (fastify, opts, done) => {
  fastify.get("/", async (request, reply) => {
    try {
      const [oficialRes, blueRes] = await Promise.all([
        fastify.axios.real("/oficial"),
        fastify.axios.real("/blue"),
      ]);
      const { data: oficialData } = oficialRes;
      const { data: blueData } = blueRes;
      const realDB = await RealHoy.find({});
      const realesToUpdate = [
        {
          nombre: "real oficial",
          casa: "oficial_real",
          compra: oficialData.compra,
          venta: oficialData.venta,
          fechaActualizacion: oficialData.fecha,
          info: "El real oficial o minorista es el precio al que pueden acceder los particulares.",
        },
        {
          nombre: "real blue",
          casa: "blue_real",
          compra: blueData.compra,
          venta: blueData.venta,
          fechaActualizacion: blueData.fecha,
          info: "Se trata del fenómeno del 'real ilegal', vendido directamente entre personas a través de canales informales como 'cuevas' o vendedores callejeros, conocidos como 'arbolitos' en nuestro país.",
        },
      ];
      if (realDB.length === 0) {
        const primerosReales = await RealHoy.insertMany(realesToUpdate);
        return primerosReales;
      }
      // console.log({
      //   realDbFecha: realDB[0].fechaActualizacion,
      //   realDbtipo: typeof realDB[0].fechaActualizacion,
      //   RealUpdateFecha: oficialData.fecha,
      //   RealUpdateTipo: typeof oficialData.fecha,
      //   realDBString: realDB[0].fechaActualizacion.toISOString(),
      //   realUpdateString: convertirFechaLocalAUTC(oficialData.fecha),
      // });
      if (
        realDB[0].fechaActualizacion.toISOString() ===
        convertirFechaLocalAUTC(oficialData.fecha)
      ) {
        return realDB;
      }

      for (let i = 0; i < realesToUpdate.length; i++) {
        const real = realesToUpdate[i];
        const realenDB = await RealHoy.findOne({ nombre: real.nombre });
        const porcentajeCambio = calcularPorcentajeCambio(
          realenDB.venta,
          real.venta
        );
        await RealHoy.findOneAndUpdate(
          { nombre: real.nombre },
          {
            venta: real.venta,
            compra: real.compra,
            fechaActualizacion: real.fechaActualizacion,
            variacion: porcentajeCambio,
          },
          { new: true }
        );
      }
      const realesDBActualizados = await RealHoy.find({});
      return realesDBActualizados;
    } catch (error) {
      console.log({ error });
      return { error: "Failed to fetch data from the API" };
    }
  });

  fastify.get("/oficial", async (request, reply) => {
    try {
      const realOficial = await fastify.axios.real("/oficial");
      // console.log(realOficial.data);
      return realOficial.data;
    } catch (error) {
      console.log(error);

      return { error: "Failed to fetch data from the API" };
    }
  });
  fastify.get("/blue", async (request, reply) => {
    try {
      const realBlue = await fastify.axios.real("/blue");
      // console.log(realBlue.data);
      return realBlue.data;
    } catch (error) {
      console.log(error);
      return { error: "Failed to fetch data from the API" };
    }
  });
  done();
};

module.exports = realRoutes;
