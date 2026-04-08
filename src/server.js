import express from "express";
import { config } from "dotenv";

// import routes
import movieRoutes from "./routes/movieRoutes.js";
import { connectDB, disconnectDB } from "./config/db.js";

config();
connectDB();

const app = express();

const PORT = 5001;

// api routes
app.use("/movies", movieRoutes);

app.get("/hello", (req, res) => {
  res.json({ message: "Hello World" });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection", error);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (error) => {
  console.error("Uncaught Exception", error);
    await disconnectDB()
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
