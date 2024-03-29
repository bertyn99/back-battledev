// To declare
//db and schema
import User from "../db/model/user.js";
import database from "../db/connexion.js";
import { successRes, errorRes } from "../common/response.js";
import argon2 from "argon2";
import { AvatarService } from "../services/avatarService.js";
async function register(req, res) {
  const user = new User(req.body);

  try {
    const avatar = new AvatarService();
    user.avatar = avatar.getRandomAvatar(req.username);
    await user.save();
    //envoyer l'emaild e confirmation de création de compte
    const token = await user.generateAuthToken();
    const { password, ...useWithoutPassword } = user._doc;
    successRes(res, { ...useWithoutPassword, accessToken: token }, 201);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function logIn(req, res) {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    const {
      password,
      __v,
      tokens,
      createdAt,
      updatedAt,
      ...useWithoutPassword
    } = user._doc;
    successRes(res, { ...useWithoutPassword, accessToken: token }, 201);
  } catch (e) {
    console.log(e);
    errorRes(res, e, e.message, 500);
  }
}

async function logOut(req, res) {
  try {
    req.user.tokens = [];
    await req.user.save();

    successRes(res, {}, 200);
  } catch (e) {
    errorRes(res, e, 500);
  }
}

async function myInfo(req, res) {
  try {
    const avatar = new AvatarService();

    const { password, __v, tokens, createdAt, updatedAt, ...userClean } =
      req.user.toJSON();
    res.status(200).send({ user: userClean, accessToken: req.token });
  } catch (e) {
    console.log(e);
    res.status(404).send("This is a wrong id");
  }
}

async function userInfo(req, res) {
  const _id = req.params.id;

  try {
    const user = await User.findOne({ _id: _id });
    const { password, __v, tokens, createdAt, updatedAt, ...userClean } =
      user.toJSON();
    res.status(202).send({ user: userClean });
  } catch (e) {
    res.status(403).send("This is a wrong id");
  }
}

async function updateInfo(req, res) {
  const allowedUpdates = ["name", "email", "password"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Upadates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    const { password, __v, tokens, createdAt, updatedAt, ...userClean } =
      req.user.toJSON();
    res.status(202).send({ user: userClean });
  } catch (e) {
    res.status(400).send(e);
  }
}

async function deleteUser(req, res) {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
}

// Function
/* async function registerUser(req, res) {
    if (!req.body.mail || !req.body.firstname || !req.body.lastname || !req.body.address || !req.body.city || !req.body.zip || !req.body.mobile || !req.body.password) {
        return res.status(400).json({
            status: "Veuillez remplir completement le formulaire d'inscription",
        });
    }
 
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    //const ip = req.headers["x-forwarded-for"].split(',')[0] || req.connection.remoteAddress;
 
    if (await isUserExist.byMail(req.body.mail)) {
        return res.status(400).json({
            status: "Votre adresse mail est déjà utiliser",
        });
    }
 
    newUser = new UserShema(new User(req.body.mail, req.body.firstname, req.body.lastname, req.body.address, req.body.city, req.body.zip, password, req.body.mobile, ip));
 
    newUser.save((err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            return updateUser(data._id, randKey.generate(250), res);
        }
    });
} */

const user = {
  register,
  logIn,
  logOut,
  userInfo,
  myInfo,
  updateInfo,
};

export default user;
