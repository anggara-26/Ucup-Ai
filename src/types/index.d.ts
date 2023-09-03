import { AIMessage, HumanMessage } from "langchain/schema";

type LangChainMessage = AIMessage | HumanMessage;
type Messages = AIMessage[] | HumanMessage[] | [];
