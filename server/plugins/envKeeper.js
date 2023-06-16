const fp = require("fastify-plugin");

const schema = {
  type: "object",
  required: ["PORT", "BCRA_TOKEN", "CLIENT_URL", "DB_URI"],
  properties: {
    PORT: {
      type: "string",
      default: "5000",
    },
    BCRA_TOKEN: {
      type: "string",
    },
    CLIENT_URL: {
      type: "string",
    },
    DB_URI: {
      type: "string",
    },
  },
};

const options = {
  confKey: "config",
  schema,
  dotenv: true,
  data: process.env,
};

module.exports = fp(async (fastify, opts, done) => {
  fastify.register(require("@fastify/env"), options);
  await fastify.after();
  done();
});
