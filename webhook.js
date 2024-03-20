import express from "express";
import fs from "fs";

const filePath = "webhooks.txt";

class Webhook {
  constructor(data) {
    this.eventType = data.eventType;
    this.callbackUrl = data.callbackUrl;
    this.timeStamp = data.timeStamp;
  }
}

const app = express();
app.use(express.json());

app.post("/webhooks/register", async (req, res) => {
  const timestamp = new Date().toISOString();
  const { eventType, callbackUrl } = req.body;
  const data = `Event type: ${eventType}\nCallback URL: ${callbackUrl}\nTimestamp: ${timestamp}\n\n`;
  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File created and data written successfully.");
    }
  });
});

app.delete("/webhooks/:callbackUrl", async (req, res) => {
  const { callbackUrl } = req.params;
  const lines = fs
    .readFileSync(filePath, "utf-8")
    .split("\n\n")
    .map((line) => line.trim());
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(callbackUrl)) {
      lines.splice(i, 1);
    }
  }
  const modifiedContent = lines.join("\n\n");
  fs.writeFileSync(filePath, modifiedContent, "utf-8");
});

app.post("/ping", async (req, res) => {
  const lines = fs
    .readFileSync(filePath, "utf-8")
    .split("\n\n")
    .map((line) => line.trim());
  for (let i = 0; i < lines.length; i++) {
    console.log(`Webhook:\n${lines[i]}\n\n`);
  }
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));