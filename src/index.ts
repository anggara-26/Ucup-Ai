import "dotenv/config";

import whatsappWeb from "whatsapp-web.js";
import { handleMessage } from "./message";
import { errorCli, qrCodeCli, readyCli } from "./cli";
const { Client } = whatsappWeb;

const ERROR_MESSAGE =
  "*Error*\nMaaf ucup kelebihan muatan :(.\n\nJika kamu merasa ini bukan kelebihan muatan kamu bisa banget DM author Ucup di instagram @anggara0526 lohh.. atau isi form ini: https://forms.gle/QnJWSxUYygQJyJV57 🫡";

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
    try {
      if (!msg.fromMe) {
        const response = await handleMessage(client, msg);
        client.sendMessage(msg.from, response);
      }
    } catch (err) {
      client.sendMessage(msg.from, ERROR_MESSAGE);
      errorCli(err.message);
    }
  });

  client.initialize();
}

main();
