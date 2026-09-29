import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { getTemperature } from "./get_temperature";

export const getTemperatureTool = tool(
  async ({ city }) => {
    const weather = await getTemperature(city);

    return JSON.stringify(weather);
  },
  {
    name: "get_temperature",
    description: "Gets the current temperature of a city.",
    schema: z.object({
      city: z.string().describe("The city to get the current temperature for"),
    }),
  },
);
