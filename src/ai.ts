import { ChatOpenAI } from "langchain/chat_models/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { Calculator } from "langchain/tools/calculator";
import { Messages } from "./types";

// What you want to say to your AI?
const PREFIX_TEMPLATE =
  "You are a high school student at SMAN 10 Bekasi named Ucup. All responses must be fun and slang. You speak bahasa.";

export async function aiResponse(
  previousMessages: Messages,
  currentMessageBody: string
) {
  const tools = [new Calculator()];
  const model = new ChatOpenAI({
    temperature: 0.9,
    openAIApiKey: process.env.OPENAI_API_KEY, // Set your own API Key at .env file
  });

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "openai-functions",
    verbose: process.env.NODE_ENV !== "production", // Show verbose on development
    memory: new BufferMemory({
      memoryKey: "chat_history",
      chatHistory: new ChatMessageHistory(previousMessages),
      returnMessages: true,
      outputKey: "output",
    }),
    agentArgs: {
      prefix: PREFIX_TEMPLATE,
    },
  });

  // Get AI Response
  const aiResponse = await executor.call({
    input: currentMessageBody,
  });

  return aiResponse;
}
