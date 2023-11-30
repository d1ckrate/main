const mongoose = require("mongoose");
const pagoSchema = new mongoose.Schema({
  ruleta: { type: mongoose.Schema.Types.ObjectId, ref: "Ruleta" },
  userid: { type: String, unique: true, required: true },
  ruletaHash: String,
  idpago: String,
  giros: Number,
  created_at: Date,
  status: String,
  premioRuleta: {},
  email: String,
  amount: Number,
  json_mp: {},
});

module.exports = mongoose.models.Pago || mongoose.model("Pago", pagoSchema);
