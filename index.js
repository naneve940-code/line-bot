const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const LINE_TOKEN = "ใส่_CHANNEL_ACCESS_TOKEN";

app.post("/webhook", async (req, res) => {
  try {
    const events = req.body.events || [];

    for (const event of events) {
      if (event.type !== "message") continue;

      const text = event.message.text;
      const replyToken = event.replyToken;

      await axios.post(
        "https://api.line.me/v2/bot/message/reply",
        {
          replyToken,
          messages: [
            {
              type: "text",
              text: "คุณพิมพ์ว่า: " + text,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LINE_TOKEN}`,
          },
        }
      );
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(200);
  }
});

app.get("/", (req, res) => {
  res.send("Bot is running ✔️");
});

app.listen(3000, () => console.log("Server started"));