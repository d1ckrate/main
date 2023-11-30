const mongoose = require("mongoose");
const ruletaSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userid: { type: String, unique: true, required: true },
  hash: {type: String, unique: true}
  precio: String,
  country_id: String,
});

module.exports =
  mongoose.models.Ruleta || mongoose.model("Ruleta", ruletaSchema);
