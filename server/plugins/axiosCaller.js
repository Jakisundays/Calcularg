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
        baseURL: "https://www.dolarito.ar/api/frontend/quotations/dolar",
      },
      real: {
        baseURL: "https://bluepy.vercel.app/api/real"
      }
    },
  });
  done();
};

module.exports = fp(axiosCaller);
