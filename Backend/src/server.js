require("dotenv").config();

const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { initSocket } = require("./config/socket");

const PORT = process.env.PORT || 5000;

/* -------------------- MongoDB Connection -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* -------------------- HTTP + Socket Server -------------------- */
const server = http.createServer(app);
initSocket(server);

/* -------------------- Start Server -------------------- */
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/* -------------------- Graceful Shutdown -------------------- */
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...");
  await mongoose.connection.close();
  server.close(() => {
    console.log("✅ Server closed gracefully");
    process.exit(0);
  });
});
