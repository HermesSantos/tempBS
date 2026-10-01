import { tool, type ToolRuntime } from "@langchain/core/tools";
import { z } from "zod";
import type { contextSchema } from "./context";

const usersCity: Record<string, string> = {
  "user-1": "Itajai",
  "user-2": "Tokyo",
};

export const getUserCityTool = tool(
  async (_input, runtime: ToolRuntime<unknown, typeof contextSchema>) => {
    const userId = runtime.context.userId;
    const city = usersCity[userId];

    console.log(`[tool] get_user_city -> userId=${userId}, city=${city}`);

    return city;
  },
  {
    name: "get_user_city",
    description: "Gets the city where the current user lives.",
    schema: z.object({}),
  },
);
