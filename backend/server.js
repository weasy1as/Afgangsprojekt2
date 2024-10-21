const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Routes
const settingsRoutes = require("./routes/settingsRoutes");
app.use("/api/settings", settingsRoutes);

app.listen(8080, () => {
  console.log("Server runnin on port 8080");
});
