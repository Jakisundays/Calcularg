const DolarHoy = require("../models/dolarHoy.model");
const { calcularPorcentajeCambio } = require("../utils/moneyMath");
const dolarRoutes = async (fastify, opts, done) => {
  // fastify.get("/", async (request, reply) => {
  //   try {
  //     // Gets Dollar values from the API
  //     const { data } = await fastify.axios.dolar("/dolares");
  //     // Gets Dollar values from the DB
  //     const dolarDB = await DolarHoy.find({});

  //     // If there are no Dollar values in the DB, it will insert the values from the API
  //     if (dolarDB.length === 0) {
  //       const primerosDolares = await DolarHoy.insertMany(data);
  //       return primerosDolares;
  //     }
  //     const dolarDBFecha = dolarDB[0].fechaActualizacion;
  //     const dataFecha = new Date(data[0].fechaActualizacion);

  //     // Calculate the time difference in milliseconds
  //     const timeDifference = dataFecha - dolarDBFecha;
  //     // If there are Dollar values in the DB, it will compare the values and update the values if they are different
  //     if (dolarDB[0].fechaActualizacion === data[0].fechaActualizacion) {
  //       return dolarDB;
  //     }

  //     for (let i = 0; i < data.length; i++) {
  //       const dolar = data[i];
  //       const dolarEnDB = await DolarHoy.findOne({
  //         casa: dolar.casa,
  //       });
  //       if (timeDifference >= 86400000) {
  //         const porcentajeCambio = calcularPorcentajeCambio(
  //           dolarEnDB.venta,
  //           dolar.venta
  //         );
  //         await DolarHoy.findOneAndUpdate(
  //           { casa: dolar.casa },
  //           {
  //             venta: dolar.venta,
  //             compra: dolar.compra,
  //             variacion: porcentajeCambio,
  //             fechaActualizacion: dolar.fechaActualizacion,
  //           },
  //           { new: true }
  //         );
  //       }

  //       await DolarHoy.findOneAndUpdate(
  //         { casa: dolar.casa },
  //         {
  //           venta: dolar.venta,
  //           compra: dolar.compra,
  //           fechaActualizacion: dolar.fechaActualizacion,
  //         },
  //         { new: true }
  //       );
  //     }
  //     const dolarDBActualizado = await DolarHoy.find({});
  //     return dolarDBActualizado;
  //   } catch (error) {
  //     console.log(error);
  //     return { error: "Failed to fetch data from the API" };
  //   }
  // });

  fastify.get("/", async (request, reply) => {
    try {
      // Gets Dollar values from the API
      const { data } = await fastify.axios.dolar("/dolares");
      // Gets Dollar values from the DB
      const dolarDB = await DolarHoy.find({});

      // If there are no Dollar values in the DB, insert the values from the API
      if (dolarDB.length === 0) {
        const primerosDolares = await DolarHoy.insertMany(data);
        return primerosDolares;
      }

      const dolarDBFecha = dolarDB[0].fechaActualizacion;
      const dataFecha = new Date(data[0].fechaActualizacion);

      // Calculate the time difference in milliseconds
      const timeDifference = dataFecha - dolarDBFecha;

      if (dolarDB[0].fechaActualizacion === data[0].fechaActualizacion) {
        return dolarDB;
      }

      const bulkOperations = [];

      for (let i = 0; i < data.length; i++) {
        const dolar = data[i];
        const dolarEnDB = dolarDB.find(
          (dbDolar) => dbDolar.casa === dolar.casa
        );

        const updateObj = {
          venta: dolar.venta,
          compra: dolar.compra,
          fechaActualizacion: dolar.fechaActualizacion,
        };

        if (timeDifference >= 86400000) {
          const porcentajeCambio = calcularPorcentajeCambio(
            dolarEnDB.venta,
            dolar.venta
          );
          updateObj.variacion = porcentajeCambio;
        }

        bulkOperations.push({
          updateOne: {
            filter: { casa: dolar.casa },
            update: { $set: updateObj },
          },
        });
      }

      await DolarHoy.bulkWrite(bulkOperations);

      const dolarDBActualizado = await DolarHoy.find({});
      return dolarDBActualizado;
    } catch (error) {
      console.log(error);
      return { error: "Failed to fetch data from the API" };
    }
  });

  fastify.get("/delete", async () => {
    await DolarHoy.deleteMany({});
    return "documentos eliminados.";
  });
  done();
};

module.exports = dolarRoutes;
