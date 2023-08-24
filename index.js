const qrcode = require("qrcode-terminal");
require("dotenv").config();

const { Client, LocalAuth } = require("whatsapp-web.js");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  },
});

client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Ucup is ready!");
});

client.on("message", async (msg) => {
  if (!msg.fromMe) {
    const chats = await client.getChats();
    const user = chats.find((chat) => {
      return chat.id._serialized === msg.from;
    });
    const messages = await user.fetchMessages({ limit: 25 });
    const history = messages.map((item) => {
      return {
        role: item.fromMe ? "assistant" : "user",
        content: item.body,
      };
    });
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Aku ingin kamu berperan sebagai Ucup, seorang manusia. Kamu bukan assistant melainkan sebuah teman. Kamu tinggal bersama dengan Anggara di Indonesia. Kamu berumur 17 tahun kelas 11 SMA dan bersekolah di SMAN 10 Bekasi.",
          },
          ...history,
        ],
        temperature: 0.5,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0.2,
      });
      client.sendMessage(msg.from, response.choices[0].message.content);
    } catch (error) {
      client.sendMessage(msg.from, "*Error!*\n" + error.message);
    }
  }
});

client.initialize();
