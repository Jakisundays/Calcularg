const MesInflacion = require("../models/inflacionMes.model");
const AnualInflacion = require("../models/inflacionAnual.model");

const brcaRoutes = async (fastify, opts, done) => {
  fastify.get("/inflacion_mensual", async (request, reply) => {
    // console.log("entro a la ruta mensual");
    
    try {
      const lastInflacion = await MesInflacion.findOne().sort({ fecha: -1 }); // Ordenar por el campo "dia" en orden descendente para obtener el último valor agregado
      // console.log({lastInflacion})
      // Si no se encuentra ningún registro de inflación
      if (!lastInflacion) {
        return reply
          .status(404)
          .send({ message: "No se encontró ningún valor de inflación." });
      }
      const { fecha, valor } = lastInflacion;

      return { fecha, valor };
    } catch (error) {
      console.error({ error });
      return reply.status(500).send({
        message: "Error al obtener el último valor de inflación mensual.",
      });
    }
  });
  fastify.get("/inflacion_anual", async (request, reply) => {
    // console.log("entro a la ruta anual");
    try {
      const lastInflacion = await AnualInflacion.findOne().sort({ fecha: -1 }); // Ordenar por el campo "dia" en orden descendente para obtener el íltimo valor agregado
      if (!lastInflacion) {
        return reply
          .status(404)
          .send({ message: "No se encontrón ningón valor de inflación." });
      }
      const { fecha, valor } = lastInflacion;
      return reply.send({ fecha, valor });
    } catch (error) {
      return reply.status(500).send({
        message: "Error al obtener el último valor de inflación anual.",
      });
    }
  });
  // fastify.get('')
  done();
};

module.exports = brcaRoutes;
