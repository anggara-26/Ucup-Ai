import "dotenv/config";

import whatsappWeb from "whatsapp-web.js";
import { handleMessage } from "./message";
import { qrCodeCli, readyCli } from "./cli";
const { Client } = whatsappWeb;

async function main() {
  const client = new Client({
    // authStrategy: new LocalAuth(),
    puppeteer: {
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
      ],
    },
  });

  client.on("qr", qrCodeCli); // show qrcode & qrcode text

  client.on("ready", readyCli); // Show something to console when the bot is ready.

  client.on("message", async (msg) => {
    if (!msg.fromMe) {
      const response = await handleMessage(client, msg);
      client.sendMessage(msg.from, response);
    }
  });

  client.initialize();
}

main();
