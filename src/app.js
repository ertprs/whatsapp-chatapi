const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv/config");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API Whatsapp On");
});

app.listen(port, () => {
  console.log(`Listen on port http://localhost:${port}`);
});
