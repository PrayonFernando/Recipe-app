const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
// Configuring dotenv to use .env files
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // To allow cross-origin requests
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", favoriteRoutes);

// // Starting the server
// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

module.exports = app;
