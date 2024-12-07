// src/server.js
const app = require("./app");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

connectDB();
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 8081;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Gracefully handle port errors
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Please use a different port.`
    );
    process.exit(1); // Exit the process to avoid duplicate running servers
  } else {
    console.error(`Server error: ${err.message}`);
  }
});

// app
//   .listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   })
//   .on("error", (err) => {
//     if (err.code === "EADDRINUSE") {
//       console.error(
//         `Port ${PORT} is already in use. Please use a different port.`
//       );
//     } else {
//       console.error(`Server error: ${err.message}`);
//     }
//   });
