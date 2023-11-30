const mongoose = require("mongoose");
const premioSchema = new mongoose.Schema({
  ruleta: { type: mongoose.Schema.Types.ObjectId, ref: "Ruleta" },
  userid: { type: String, unique: true, required: true },
  hash: String,
  ruletaHash: String,
  titulo: String,
  isMedia: Boolean,
  path: String,
  probabilidad: Number,
});

module.exports =
  mongoose.models.Premio || mongoose.model("Premio", premioSchema);
