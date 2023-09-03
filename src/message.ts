import { Client, Message } from "whatsapp-web.js";
import {
  convertWhatsappMessageToLangChainMessage,
  getUserChatsHistory,
} from "./utils";
import { aiResponse } from "./ai";

export async function handleMessage(
  client: Client,
  message: Message
): Promise<string> {
  const history = await getUserChatsHistory(client, message.from);
  const previousMessages = await convertWhatsappMessageToLangChainMessage(
    history.slice(0, -1)
  );
  const currentMessageBody = history[history.length - 1].body;

  const response = await aiResponse(previousMessages, currentMessageBody);

  return response.output;
}
