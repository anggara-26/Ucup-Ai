import "dotenv/config";

import qrcode from "qrcode-terminal";
import whatsappWeb from "whatsapp-web.js";
import { handleMessage } from "./message";
const { Client, LocalAuth } = whatsappWeb;

async function main() {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    },
  });

  client.on("qr", (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
    console.log(qr);
  });

  client.on("ready", () => {
    console.log("Ucup is ready!");
  });

  client.on("message", async (msg) => {
    if (!msg.fromMe) {
      const response = await handleMessage(client, msg);
      console.log(response);
      client.sendMessage(msg.from, `${response}`);
    }
  });

  client.initialize();
}

main();
