import { Agent } from "@mastra/core/agent";
import { weatherTool } from "../tools/weather-tool";
import { Memory } from "@mastra/memory";
import { SUPPORTED_MODELS } from "~/constants/models";
import { DEFAULT_MODEL } from "~/lib/model-resolver";

export const weatherAgent = new Agent({
  id: "weather-agent",
  name: "Weather Agent",
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn't in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  // model: "groq/llama-3.3-70b-versatile",
  model: async ({ requestContext, mastra }) => {
    const provider = requestContext?.get("provider") as
      | "openai"
      | "anthropic"
      | "groq"
      | "openrouter"
      | "google"
      | undefined;
    const model = requestContext?.get("model") as string | undefined;
    const logger = mastra?.getLogger();
    logger?.info(JSON.stringify(requestContext));
    if (!model || !provider) {
      logger?.warn(
        "Failed to resolve dynamic model for user, using default model.",
      );
      return DEFAULT_MODEL;
    }
    const isSupported = SUPPORTED_MODELS.some(
      (m) => m.provider === provider && m.id === model,
    );
    if (!isSupported) {
      logger?.warn(
        `Requested unsupported model: ${model} from provider: ${provider}`,
      );
      return DEFAULT_MODEL;
    }

    logger?.info(`Resolved model: ${model} from provider: ${provider}`);
    return model;
  },
  tools: { weatherTool },
  memory: new Memory(),
});
