const fp = require("fastify-plugin");

const cookieSession = (fastify, opts, done) => {
  fastify.register(require("@fastify/cookie"));
  fastify.register(require("@fastify/session"), {
    secret: fastify.config.SESSION_SECRET,
    rolling: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      // httpOnly: true, // Set to true for security
    },
  });
  done();
};

module.exports = fp(cookieSession);
