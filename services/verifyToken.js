import config from "../config.js";
import User from "../db/model/user.js";
import jwt from "jsonwebtoken";
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    
    const decoded = jwt.verify(token, config.JWT_SECRET);
 
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
 
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user
    next();
  } catch (e) {
    console.log(e)
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default verifyToken;
