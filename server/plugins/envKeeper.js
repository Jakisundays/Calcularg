const fp = require("fastify-plugin");

const schema = {
  type: "object",
  required: [
    "PORT",
    "BCRA_TOKEN",
    "CLIENT_URL",
    "DB_URI",
    "SESSION_SECRET",
    "JWT_KEY",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "TWITTER_API_KEY",
    "TWITTER_KEY_SECRET",
    "TWITTER_BEARER_TOKEN",
    "TWITTER_CLIENT_ID",
    "TWITTER_CLIENT_SECRET",
  ],
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
    SESSION_SECRET: { type: "string" },
    JWT_KEY: { type: "string" },
    GOOGLE_CLIENT_ID: { type: "string" },
    GOOGLE_CLIENT_SECRET: { type: "string" },
    TWITTER_API_KEY: { type: "string" },
    TWITTER_KEY_SECRET: { type: "string" },
    TWITTER_BEARER_TOKEN: { type: "string" },
    TWITTER_CLIENT_ID: { type: "string" },
    TWITTER_CLIENT_SECRET: { type: "string" },
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
