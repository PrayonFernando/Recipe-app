const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateUser = require("../middlewares/authMiddleware");

// Get favourites for the current user
router.get("/favourites", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ favourites: user.favourites });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Error fetching favourites" });
  }
});

// Add a meal to favourites
router.post("/favourites/add", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { mealId } = req.body;

    if (!mealId) {
      return res.status(400).json({ message: "Meal ID is required" });
    }

    if (!user.favourites.includes(mealId)) {
      user.favourites.push(mealId);
      await user.save();
    }

    res.json({ favourites: user.favourites });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Error adding to favourites" });
  }
});

// Remove a meal from favourites
router.post("/favourites/remove", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { mealId } = req.body;

    if (!mealId) {
      return res.status(400).json({ message: "Meal ID is required" });
    }

    user.favourites = user.favourites.filter((id) => id !== mealId);
    await user.save();

    res.json({ favourites: user.favourites });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Error removing from favourites" });
  }
});

module.exports = router;
