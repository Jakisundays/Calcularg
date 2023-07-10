const realRoutes = async (fastify, opts, done) => {
  fastify.get("/oficial", async (request, reply) => {
    try {
      const realOficial = await fastify.axios.real("/oficial");
      // console.log(realOficial.data);
      return realOficial.data;
    } catch (error) {
      console.log(error);
      
      return { error: "Failed to fetch data from the API" };
    }
  });
  fastify.get("/blue", async (request, reply) => {
    try {
      const realBlue = await fastify.axios.real("/blue");
      // console.log(realBlue.data);
      return realBlue.data;
    } catch (error) {
      console.log(error);
      return { error: "Failed to fetch data from the API" };
    }
  });
  done();
};

module.exports = realRoutes;
