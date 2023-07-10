const fastify = require("fastify");
const app = fastify({ logger: false });
const mongoose = require("mongoose");
const MesInflacion = require("./models/inflacionMes.model");
const AnualInflacion = require("./models/inflacionAnual.model");

app.register(require("./plugins/envKeeper"));
app.register(require("./plugins/axiosCaller"));
app.register(require("./plugins/corsOpts"));

app.setErrorHandler((error, request, reply) => {
  if (reply.sent) {
    return reply.send(error);
  }
  reply.status(error.statusCode || 500).send({
    message: error.message || "An unknown error occurred",
  });
});

// Declare a route
app.get("/", async (request, reply) => {
  return { Calacularg: "Finance tool." };
});

app.register(require("./routes/bcra.route"), { prefix: "/api/brca" });
app.register(require("./routes/dolar.route"), { prefix: "/api/dolar" });
app.register(require("./routes/real.route"), { prefix: "/api/real" });

const obtenerInflacionMensual = async () => {
  try {
    const { data } = await app.axios.inflacion("/inflacion_mensual_oficial");
    const lastItem = data[data.length - 1];
    await MesInflacion.deleteMany({});
    const nuevaInflacion = new MesInflacion({
      fecha: lastItem.d,
      valor: lastItem.v,
    });
    await nuevaInflacion.save();
    console.log("Mensual saved successfully!");
  } catch (error) {
    console.log(error);
  }
};

const obtenerInflacionAnual = async () => {
  try {
    const { data } = await app.axios.inflacion("/inflacion_esperada_oficial");
    const lastItem = data[data.length - 1];
    await AnualInflacion.deleteMany({});
    const nuevaInflacion = new AnualInflacion({
      fecha: lastItem.d,
      valor: lastItem.v,
    });
    await nuevaInflacion.save();
    console.log("Anual saved successfully!");
  } catch (error) {
    console.log(error);
  }
};

const obtenerDatosPeriodicamente = () => {
  obtenerInflacionMensual();
  obtenerInflacionAnual();
  setInterval(obtenerInflacionMensual, 1000 * 60 * 60 * 24 * 15);
  setInterval(obtenerInflacionAnual, 1000 * 60 * 60 * 24 * 15);
};

const development = false;

// Run the server!
const start = async () => {
  await app.after();
  try {
    await mongoose
      .connect(app.config.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to DB");
      });
  } catch (error) {
    console.log(error);
  }
  app.listen(
    { port: app.config.PORT, host: development ? "localhost" : "0.0.0.0" },
    (err, address) => {
      if (err) {
        console.log(err);
        app.log.error(err);
        process.exit(1);
      }
      if (development) {
        obtenerDatosPeriodicamente();
      }
      console.log(`Server listening on ${address}`);
    }
  );
};
start();
