import { Schema, model} from "mongoose";

let battleSchema = new Schema(
  {
    idOpponents: [{ type: Schema.Types.ObjectId, ref: "user" }],
    category: { type: String },
    quizzpoints: [{ type: Number }],
    winner:{ type: Schema.Types.ObjectId, ref: "user" }
  },
  { timestamps: true }
);

battleSchema.statics.findBattlesOfthisUser = async function(idUser){
  const b=await Battle.find({ 'idOpponents': idUser  })
  return b;
}
battleSchema.set('toJSON', { getters: true, virtuals: false });
const Battle = model("Battle", battleSchema);
export default Battle;
