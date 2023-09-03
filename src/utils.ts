import whatsappWeb, { Client, Message } from "whatsapp-web.js";
const { LocalAuth, RemoteAuth } = whatsappWeb;
import { MongoStore } from "wwebjs-mongo";
import mongoose from "mongoose";
import { AIMessage, HumanMessage } from "langchain/schema";
import { LangChainMessage } from "./types";
import { useAuthStrategyCli } from "./cli.js";

const FETCH_MESSAGES_LIMIT = 15;

export const convertWhatsappMessageToLangChainMessage = async (
  messages: Message[]
): Promise<LangChainMessage[]> => {
  return messages.map((message: Message) => {
    // Check whether the sender of the message is AI or human.
    if (message.fromMe) {
      return new AIMessage(message.body);
    } else {
      return new HumanMessage(message.body);
    }
  });
};

export const getUserChatsHistory = async (
  client: Client,
  from: string
): Promise<Message[]> => {
  const chats = await client.getChats(); // Get all chats
  const user = chats.find((chat) => {
    // Find message sender
    return chat.id._serialized === from;
  });

  // Return chat history of a certain amount with the message sender
  return (await user?.fetchMessages({ limit: FETCH_MESSAGES_LIMIT })) ?? [];
};

export const decideClientAuthStrategy = async () => {
  const URI = process.env.MONGODB_URI;
  /* Check wheter you have MONGODB_URI set at env or not and
    decide to use RemoteAuth or LocalAuth Strategy */
  return URI ? useRemoteAuth(URI) : useLocalAuth();
};

const useRemoteAuth = async (uri: string) => {
  return await mongoose.connect(uri).then(() => {
    useAuthStrategyCli("Remote Auth"); // Show strategy used to console
    const store = new MongoStore({ mongoose: mongoose });
    return new Client({
      authStrategy: new RemoteAuth({
        store: store,
        backupSyncIntervalMs: 300000,
      }),
      puppeteer: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });
  });
};

const useLocalAuth = () => {
  useAuthStrategyCli("Local Auth"); // Show strategy used to console
  return new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  });
};
