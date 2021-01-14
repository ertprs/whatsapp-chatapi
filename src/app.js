const express = require("express");
const app = express();
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const dotenv = require("dotenv/config");

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const whatsapi_token = process.env.WHATSAPP_TOKEN,
  whatsapi_url = process.env.WHATSAPP_URL;

const apiChatApi = async (method, params) => {
  const options = {};
  options["method"] = "POST";
  options["body"] = JSON.stringify(params);
  options["headers"] = { "Content-Type": "application/json" };

  const url = `${whatsapi_url}/${method}?token=${whatsapi_token}`;

  const apiResponse = await fetch(url, options);
  const jsonResponse = await apiResponse.json();

  return jsonResponse;
};

app.get("/", (req, res) => {
  res.send("API Whatsapp On");
});

app.post("/webhook", async (req, res) => {
  const data = req.body;
  for (var i in data.messages) {
    const author = data.messages[i].author;
    const body = data.messages[i].body;
    const chatId = data.messages[i].chatId;
    const senderName = data.messages[i].senderName;

    if (data.messages[i].fromMe) return;

    console.log("Mensagem Chegou", senderName, author, chatId, body);
  }
});

app.listen(port, () => {
  console.log(`Listen on port http://localhost:${port}`);
});
