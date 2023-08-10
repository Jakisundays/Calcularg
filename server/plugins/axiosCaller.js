const fp = require("fastify-plugin");

const axiosCaller = async (fastify, opts, done) => {
  fastify.register(require("fastify-axios"), {
    clients: {
      inflacion: {
        baseURL: "https://api.estadisticasbcra.com",
        headers: {
          Authorization: `Bearer ${fastify.config.BCRA_TOKEN}`,
        },
      },
      dolar: {
        baseURL: "https://dolar-api-argentina.vercel.app/v1",
      },
      real: {
        baseURL: "https://bluepy.vercel.app/api/real",
      },
      euro: { baseURL: "https://api.bluelytics.com.ar/v2" },
    },
  });
  done();
};

module.exports = fp(axiosCaller);
