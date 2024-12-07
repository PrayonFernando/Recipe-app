// src/models/Favorite.js
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipeId: { type: String, required: true },
    recipeName: { type: String, required: true },
    recipeCategory: { type: String, required: true },
    recipeImage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
