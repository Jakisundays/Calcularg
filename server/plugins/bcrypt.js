const fp = require("fastify-plugin");
const bcrypt = (fastify, options, done) => {
  fastify.register(require("fastify-bcrypt"), {
    saltWorkFactor: 10,
  });
  done();
};
module.exports = fp(bcrypt);
