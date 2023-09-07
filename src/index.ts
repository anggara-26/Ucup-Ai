import "dotenv/config";

import { Message } from "whatsapp-web.js";
import { handleMessage } from "./message.js";
import { errorCli, qrCodeCli, readyCli } from "./cli.js";
import { decideClientAuthStrategy } from "./utils.js";

const ERROR_MESSAGE =
  "*Error*\nMaaf ucup kelebihan muatan :(.\n\nJika kamu merasa ini bukan kelebihan muatan kamu bisa banget DM author Ucup di instagram @anggara0526 lohh.. atau isi form ini: https://forms.gle/QnJWSxUYygQJyJV57 🫡";

async function main() {
  const client = await decideClientAuthStrategy();

  client.on("qr", qrCodeCli); // Show qrcode & qrcode text

  client.on("ready", readyCli); // Show something to console when the bot is ready.

  client.on("message", async (msg: Message) => {
    try {
      if (!msg.fromMe) {
        console.log(msg.body);
        const response = await handleMessage(client, msg); // Handle incoming message and return a response message
        console.log(response);
        client.sendMessage(msg.from, response); // Send response message to user
      }
    } catch (err) {
      client.sendMessage(msg.from, ERROR_MESSAGE); // Send error message to user, you can modify the text in variable above
      errorCli(err); // Show error to console
    }
  });

  client.initialize();
}

main(); // RUN!!!
