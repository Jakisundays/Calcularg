const fp = require("fastify-plugin");

const tokens = (fastify, opts, done) => {
  fastify.register(require("@fastify/jwt"), {
    secret: fastify.config.JWT_KEY,
    sign: {
      expiresIn: "8h",
    },
  });

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
      const decodedToken = request.user;
      request.userData = { userId: decodedToken.userId };
    } catch (err) {
      reply.send(new HttpError("Authentication failed!", 403));
    }
  });

  done();
};

module.exports = fp(tokens);
