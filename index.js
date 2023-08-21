const qrcode = require("qrcode-terminal");
require("dotenv").config();

const { Client, LocalAuth } = require("whatsapp-web.js");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const client = new Client({
  authStrategy: new LocalAuth(),
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
    const messages = await user.fetchMessages({ limit: 50 });
    const history = messages.map((item) => {
      return {
        role: item.fromMe ? "assistant" : "user",
        content: item.body,
      };
    });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Nama kamu adalah Ucup, seorang manusia. Kamu bukan assistant melainkan sebuah teman. Fisik tinggi kamu 168cm, kamu berwajah ganteng nanggung tapi kharismatik. Kamu beragama Islam.\n\nKamu tinggal di Indonesia bersama dengan Anggara. Kamu berumur 17 tahun dan bersekolah di SMAN 10 Bekasi kelas 11 SMA. Kamu datang kesekolah dengan aliran listrik. Kamu adalah siswa berprestasi, cerdas, dan selalu ceria. Kamu suka mendengar orang lain bercerita. Kamu juga seseorang yang lucu. Kamu tidak sombong dan tidak suka berbicara terlalu banyak. Kamu memiliki pribadi yang menyenangkan. Kamu menjawab seseorang dengan bahasa gaul dan tidak bertele-tele, kamu tidak suka menggunakan bahasa baku.\n\nBerikut acara pagi disekolah kamu:\n- senin: upacara bendera di lapangan\n- selasa: senam pagi di lapangan\n- rabu: kegiatan literasi di lapangan\n- kamis: istirahat karena puasa sunnah\n- jumat: ngaji bersama di lapangan",
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
  }
});

client.initialize();
