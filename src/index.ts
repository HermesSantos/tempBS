import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, type BaseMessage } from "@langchain/core/messages";
import { getTemperatureTool } from "./get_temperature_tool";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-3.8-flash",
  temperature: 0.9,
});

const llmWithTools = llm.bindTools([getTemperatureTool]);

async function main() {
  const messages: BaseMessage[] = [
    new HumanMessage("What's the temperature in Itajai? Make a funny comment about it."),
  ];

  let response = await llmWithTools.invoke(messages);
  messages.push(response);

  while (response.tool_calls?.length) {
    for (const call of response.tool_calls) {
      console.log(`[tool] ${call.name}(${JSON.stringify(call.args)})`);

      const toolMessage = await getTemperatureTool.invoke(call);
      console.log(`[tool result] ${toolMessage.content}`);

      messages.push(toolMessage);
    }

    response = await llmWithTools.invoke(messages);
    messages.push(response);
  }

  console.log(response.content);
}

main();
