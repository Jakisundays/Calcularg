const fp = require("fastify-plugin");
const multer = require('fastify-multer') // or import multer from 'fastify-multer'
const upload = multer({ dest: 'uploads/' })

const multerOps = (fastify, options, done) => {
    fastify.register(multer.contentParser)
    done()
}

module.exports = fp(multerOps);