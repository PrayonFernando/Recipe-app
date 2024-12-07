// src/controllers/favoriteController.js
const Favorite = require("../models/Favorites");

// Get all favorite recipes for the authenticated user
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id });
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new favorite recipe for the authenticated user
exports.addFavorite = async (req, res) => {
  const { recipeId, recipeName, recipeCategory, recipeImage } = req.body;

  try {
    const favorite = await Favorite.create({
      user: req.user._id,
      recipeId,
      recipeName,
      recipeCategory,
      recipeImage,
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove a favorite recipe for the authenticated user
exports.removeFavorite = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const favorite = await Favorite.findOneAndDelete({
      user: req.user._id,
      recipeId,
    });
    if (favorite) {
      res.status(200).json({ message: "Favorite removed" });
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};
