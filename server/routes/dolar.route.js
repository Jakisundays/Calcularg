const dolarRoutes = async (fastify, opts, done) => {
  fastify.get("/", async (request, reply) => {
    try {
      const dolares = await fastify.axios.dolar("/");
      // console.log(dolares.data);
      return dolares.data;
    } catch (error) {
      console.log(error);
      return { error: "Failed to fetch data from the API" };
    }
  });
  done();
};

module.exports = dolarRoutes;
