import config from "../config.js";
import User from "../db/model/user.js";
import jwt from "@fastify/jwt";
import fp from "fastify-plugin";
/* const verifyToken = async (req, res, done) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!request.headers.authorization) {
      throw new Error("No token was sent");
    }
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Unauthorized");
    }

    req.token = token;
    req.user = user;
    done();
  } catch (e) {
    console.log(e);
    res.code(401).send({ error: e });
  }
}; */

export default fp(async (fastify, opts) => {
  fastify.register(jwt, {
    secret: config.JWT_SECRET,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
      const token = request.headers["authorization"].replace("Bearer ", "");
      if (!request.headers.authorization) {
        throw new Error("No token was sent");
      }

      const user = await User.findOne({
        _id: request.user._id,
        "tokens.token": token,
      });

      if (!user) {
        throw new Error("Unauthorized");
      }
      request.user = user;
    } catch (err) {
      reply.send(err);
    }
  });
});
