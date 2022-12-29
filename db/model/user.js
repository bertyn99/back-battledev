import mongoose from "mongoose";
import * as argon2  from "argon2";
import jwt from "jsonwebtoken";
import validator from "validator";
import config from "../../config.js";

const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain password.");
        }
        /* add number in password
            if(value.includes()){
                throw new Error('Password need to contain a number.')
            } 
            add one Maj a t least in the password
            if(value.includes()){
                throw new Error('Password need to contain a number.')
            } 
            
            */
      },
    },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    quizzPoints:{type:Number,default:0},
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    createIp: { type: String, required: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    badges: [],
    resetPassword: { type: Object, required: false },
    mobile: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);
userSchema.set('toJSON', { getters: true, virtuals: false });

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login.");
  }

  const isMatch = await argon2.verify(user.password, password);

  if (!isMatch) {
    throw new Error("Unable to login.");
  }
  return user;
};

userSchema.methods.addScoreBattle=async function (qpBattle) {

let newQuizzPoints=this.quizzPoints>=0?this.quizzPoints +qpBattle:0
  this.quizzPoints=newQuizzPoints<0 ? 0 : newQuizzPoints
  await this.save();
}


userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await argon2.hash(user.password);
  }

  next();
});

const User = mongoose.model("User", userSchema);
export default User;
