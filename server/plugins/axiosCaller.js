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
      dummy: {
        baseURL: "https://jsonplaceholder.typicode.com",
      }
    },
  });
  done();
};

module.exports = fp(axiosCaller);
