import { AIMessage, HumanMessage } from "langchain/schema";
import { Client, Message } from "whatsapp-web.js";
import { LangChainMessage } from "./types";

const FETCH_MESSAGES_LIMIT = 15;

export const convertWhatsappMessageToLangChainMessage = async (
  messages: Message[]
): Promise<LangChainMessage[]> => {
  return messages.map((message: Message) => {
    if (message.fromMe) {
      // Check whether the sender of the message is AI or human.
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
  const chats = await client.getChats();
  const user = chats.find((chat) => {
    return chat.id._serialized === from;
  });
  return (await user?.fetchMessages({ limit: FETCH_MESSAGES_LIMIT })) ?? [];
};
