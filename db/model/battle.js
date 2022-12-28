import { Schema } from "mongoose";

let battleSchema = new Schema(
  {
    idUsers: [{ type: Schema.Types.ObjectId, ref: "user" }],
    category: { type: String },
    winner: { type: String },
  },
  { timestamps: true }
);

const Battle = mongoose.model("Battle", userSchema);
export default Battle;
