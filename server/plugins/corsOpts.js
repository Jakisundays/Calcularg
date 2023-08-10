const fp = require("fastify-plugin");

const corsOpts = (fastify, opts, done) => {
  console.log(fastify.config.CLIENT_URL);
  fastify.register(require("@fastify/cors"), {
    origin: fastify.config.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  done();
};

module.exports = fp(corsOpts);
