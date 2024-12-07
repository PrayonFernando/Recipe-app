const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.header("Authorization");
    console.log("Authorization Header:", authorizationHeader); // Debugging

    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = parts[1]; // Extract the actual token
    console.log("Extracted Token:", token); // Debugging

    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = { id: user.id };
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
  console.log("Authorization Header:", req.header("Authorization")); // To verify the actual header being received
};

module.exports = authenticateUser;
