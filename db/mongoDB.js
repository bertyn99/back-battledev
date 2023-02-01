//////////////////////////////////////////////////////////////////////////
//                            DATABASE CONNECTION                       //
//////////////////////////////////////////////////////////////////////////

import mongoose from "mongoose";
import config from "../config.js";
import  toJson from '@meanie/mongoose-to-json';
mongoose.connect(config.DBURL);

let connection = mongoose.connection;

connection.on(
  "error",
  console.error.bind(console, "Erreur lors de la connexion")
);
connection.once("open", () => {
  console.log("Connexion à la base OK");
});


mongoose.plugin(toJson);
export default connection;
