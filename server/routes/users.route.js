const User = require("../models/user.model");
const HttpError = require("../models/http-error.model");
const multer = require("fastify-multer"); // or import multer from 'fastify-multer'
const upload = multer({ dest: "uploads/" });
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

const userRoutes = (fastify, _, done) => {
  fastify.register(multer.contentParser);

  fastify.post(
    "/signup",
    { preHandler: upload.single("avatar") },
    async (req, reply) => {
      const { username, email, password } = req.body;
      const { path: avatarPath } = req.file;

      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new HttpError(
            "Usuario ya está registrado. Inicia sesión.",
            409
          );
        }

        const pfpUrl = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload(
            avatarPath,
            { public_id: "avatar" },
            (err, res) => {
              if (err) {
                console.error({ err });
                return reject(
                  new HttpError("Error al subir la imagen del avatar.", 500)
                );
              }
              resolve(res.url);
            }
          );
        });

        const hashedPassword = await fastify.bcrypt.hash(password);
        const createdUser = new User({
          username,
          email,
          password: hashedPassword,
          avatar: pfpUrl,
        });

        await createdUser.save();
        fs.unlinkSync(avatarPath);

        const token = fastify.jwt.sign({ userId: createdUser.id, email });
        return {
          user: {
            username: createdUser.username,
            userId: createdUser.id,
            email: createdUser.email,
            avatar: createdUser.avatar,
            token,
          },
        };
      } catch (err) {
        console.error({ err });
        throw new HttpError(
          "Error en la creación de cuenta, por favor intenta de nuevo.",
          500
        );
      }
    }
  );

  fastify.post("/login", async (req, reply) => {
    const { username, password } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ username });
    } catch (err) {
      console.error({ err });
      return err;
    }
    //user doesn't exist (invalid credentials)
    if (!existingUser) {
      const error = new Error(
        "Usuario no encontrado. Regístrate para acceder."
      );
      reply.code(404).send({ error: error.message });
      return;
    }

    //compare passwords
    const isValidPassword = fastify.bcrypt.compare(
      password,
      await fastify.bcrypt.hash(password)
    );

    //invalid password
    if (!isValidPassword) {
      const error = new Error("Acceso denegado. Verifica usuario/clave.");
      reply.code(401).send({ error: error.message });
      return;
    }

    //everything ok => generate token
    const token = fastify.jwt.sign({ userId: existingUser.id, username });
    const user = {
      username: existingUser.username,
      userId: existingUser.id,
      email: existingUser.email,
      token,
    };
    return { user };
  });
  fastify.get("/count", async (request, reply) => {
    if (!request.session.counter) {
      request.session.counter = 1;
    } else {
      request.session.counter += 1;
    }
    console.log({
      count: request.session.counter,
      req_id: request.session.sessionId,
    });

    return {
      count: request.session.counter,
      req_id: request.id,
      sesh_id: request.session.sessionId,
    };
  });
  fastify.get("/auth/success/:id", async (req, reply) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId).select('-password');;
      if (!user) {
        return reply.code(404).send({ error: "User not found" });
      }
      const token = fastify.jwt.sign({
        userId: user._id,
        username: user.username,
      });
      return{
        username: user.username,
        userId: user._id,
        email: user.email,
        avatar: user.avatar,
        token,
      };
      // reply.send({ user, token }); // Fix: Use reply.send() to send the response
    } catch (err) {
      console.log({ err });
      reply.code(500).send({ error: "Internal Server Error" });
    }
  });

  fastify.get("/delete", async (req, reply) => {
    try {
      await User.deleteMany({});
      return "All users deleted";
    } catch (error) {
      return new HttpError("Deleting users failed, please try again", 500);
    }
  });
  fastify.get("/auth/logout", async (req, reply) => {
    if (req.session.user) {
      req.logout();
      return { message: "Logout successful" };
    }
  });

  done();
};

module.exports = userRoutes;
