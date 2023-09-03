import { Client, Message } from "whatsapp-web.js";
import {
  convertWhatsappMessageToLangChainMessage,
  getUserChatsHistory,
} from "./utils.js";
import { aiResponse } from "./ai.js";

export async function handleMessage(
  client: Client,
  message: Message
): Promise<string> {
  // Get chat history with message sender
  const history = await getUserChatsHistory(client, message.from);
  // Get the previous messages and convert those messages to LangChain Format
  const previousMessages = await convertWhatsappMessageToLangChainMessage(
    history.slice(0, -1)
  );
  // Get latest sender message (the input)
  const currentMessageBody = history[history.length - 1].body;

  // Put previous message and latest message then store the AI response
  const response = await aiResponse(previousMessages, currentMessageBody);

  // Return response output
  return response.output;
}
