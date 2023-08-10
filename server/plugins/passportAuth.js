const fp = require("fastify-plugin");

const { Authenticator } = require("@fastify/passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/user.model");

const passportAuth = (fastify, opts, done) => {
  const fastifyPassport = new Authenticator({
    userProperty: "authUser",
  });

  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  fastifyPassport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: fastify.config.GOOGLE_CLIENT_ID,
        clientSecret: fastify.config.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/users/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        // console.log("acessing gooleStrategy");

        const { displayName } = profile;
        const { sub, picture, email } = profile._json;
        let user;
        try {
          user = await User.findOne({ email }, "-password");
        } catch (err) {
          console.log({ err });
        }
        if (!user) {
          try {
            const hashedPassword = await fastify.bcrypt.hash(
              sub + displayName + sub
            );
            user = new User({
              username: displayName,
              email,
              password: hashedPassword,
              avatar: picture,
            });
            await user.save();
          } catch (err) {
            console.log({ err });
          }
        }
        return cb(undefined, user);
      }
    )
  );

  fastifyPassport.use(
    "twitter",
    new TwitterStrategy(
      {
        consumerKey: fastify.config.TWITTER_API_KEY,
        consumerSecret: fastify.config.TWITTER_KEY_SECRET,
        callbackURL: "/api/users/auth/twitter/callback",
        includeEmail: true,
      },
      async (accessToken, refreshToken, profile, cb) => {
        // console.log("acessing twitterStrategy");
        const { username } = profile;
        const { id, profile_image_url, email } = profile._json;
        let user;
        try {
          user = await User.findOne({ email }, "-password");
        } catch (err) {
          console.log(err);
        }
        if (!user) {
          try {
            const hashedPassword = await fastify.bcrypt.hash(
              id + username + id
            );
            user = new User({
              name: username,
              email,
              password: hashedPassword,
              avatar: profile_image_url ?? DEFAULT_AVATAR,
            });
            await user.save();
          } catch (err) {
            console.log(err);
          }
        }
        return cb(null, user);
      }
    )
  );

  fastifyPassport.registerUserSerializer(async (user, req) => {
    return user;
  });

  fastifyPassport.registerUserDeserializer(async (user, req) => {
    // console.log("deserializing user");
    let myUser;
    try {
      myUser = await User.findById(user._id);
    } catch (err) {
      return err.message;
    }
    return { user: myUser };
  });

  fastify.get(
    "/api/users/auth/google",
    fastifyPassport.authenticate("google", {
      scope: ["email", "profile"],
      session: false,
    })
  );
  fastify.get(
    "/api/users/auth/twitter",
    fastifyPassport.authenticate("twitter", {
      scope: ["email", "profile"],
      session: false,
    })
  );

  fastify.get(
    "/api/users/auth/google/callback",
    {
      preValidation: fastifyPassport.authenticate("google", {
        scope: ["email", "profile"],
        failureRedirect: "/api/users/auth/failed",
      }),
    },
    async (request, reply) => {
      // console.log("google callback");
      request.session.user = request.authUser;
      reply.redirect(
        `${fastify.config.CLIENT_URL}/#/success/${request.authUser._id}`
      );
    }
  );
  fastify.get(
    "/api/users/auth/twitter/callback",
    {
      preValidation: fastifyPassport.authenticate("twitter", {
        scope: ["email", "profile"],
        failureRedirect: "/api/users/auth/failed",
      }),
    },
    async (req, reply) => {
      // console.log("twitter callback");
      req.session.user = req.authUser;
      reply.redirect(
        `${fastify.config.CLIENT_URL}/#/success/${req.authUser._id}`
      );
    }
  );

  done();
};

module.exports = fp(passportAuth);
