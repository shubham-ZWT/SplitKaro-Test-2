require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.get("/health", (req, res) => {
  res.status(200).json({ message: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
