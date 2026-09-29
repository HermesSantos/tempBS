import type { DataResponse } from "./types.d.ts";

export async function getTemperature(city: string) {
  const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);

  const data = (await response.json()) as DataResponse;

  return {
    city,
    temperature: data.current_condition[0]?.temp_C,
  };
}
