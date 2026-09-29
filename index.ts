import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";

type DataResponse = {
  current_condition: {
    temp_C: string;
  }[];
};

async function getTemperature(city: string) {
  const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);

  const data = (await response.json()) as DataResponse;

  return {
    city,
    temperature: data.current_condition[0]?.temp_C,
  };
}

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-3.8-flash",
  temperature: 0.9,
});

async function main() {
  const weather = await getTemperature("Itajai");

  const prompt = `
A temperatura em ${weather.city} é ${weather.temperature}°C.

Faça um comentário curto e humorado sobre essa temperatura.
Não invente outras informações sobre o clima.
`;

  const response = await llm.invoke(prompt);

  console.log(response.content);
}

main();

