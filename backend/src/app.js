require("dotenv").config();
const express = require("express");
const cors = require("cors");

const groupRoutes = require("./routes/group.routes");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "ok" });
});

// Group Routes
app.use("/api", groupRoutes);

//error handler
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
