import mongoose from "mongoose";
const Schema = mongoose.Schema;
let battleSchema = new Schema(
  {
    idOpponents: [{ type: Schema.Types.ObjectId, ref: "User" }],
    category: { type: String },
    quizzpoints: [{ type: Number }],
    winner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

battleSchema.statics.findBattlesOfthisUser = async function (idUser) {
  const b = await Battle.find({ idOpponents: idUser }).populate(
    "idOpponents winner",
    "username avatar"
  );
  return b;
};
battleSchema.set("toJSON", { getters: true, virtuals: false });
const Battle = mongoose.model("Battle", battleSchema);
export default Battle;
