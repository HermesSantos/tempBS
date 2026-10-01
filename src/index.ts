import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent } from "langchain";
import { contextSchema } from "./context";
import { getTemperatureTool } from "./get_temperature_tool";
import { getUserCityTool } from "./get_user_city_tool";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-3.8-flash",
  temperature: 0.9,
});

const agent = createAgent({
  model: llm,
  tools: [getUserCityTool, getTemperatureTool],
  contextSchema,
});

const question = "Qual a temperatura atual? Faça um comentário engraçado sobre.";
const userId = "user-1"; // or "user-2"

async function main() {
  console.log(`=== ${userId}: "${question}" ===`);

  const result = await agent.invoke(
    { messages: [{ role: "user", content: question }] },
    { context: { userId } },
  );

  console.log(result.messages.at(-1)?.content);
}

main();
