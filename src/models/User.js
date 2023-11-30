const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
});

const userSchema = new mongoose.Schema({
  mercadopagoId: { type: String, unique: true },
  public_key: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  firstName: String,
  lastName: String,
  accessTokenMP: String,
  refreshTokenMP: String,
  nickname: String,
  country_id: String,
  address: addressSchema,
  permalink: String,
  accessTokenPP: String,
  refreshTokenPP: String,
  nonce: String,
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
