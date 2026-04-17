import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { z } from "zod";
import { DEX_PROMPT } from "./dex-prompt";
import { webSearch } from "../tools/web-search-tool";
import { agentService } from "~/services/agent.service";
import { aiKeyService } from "~/services/ai-key.service";
import { resolveModel, DEFAULT_MODEL } from "~/lib/model-resolver";
import { SUPPORTED_MODELS } from "~/constants/models";
import { ReasoningToMessageProcessor } from "../processors/normalise-reasoning";

/*
 ** Request Context Schema
 * This schema is used to pass request-scoped data to the agent.
 * This is the entry point to inject any user specific information.
 */

export const dexRequestContextSchema = z.object({
  userName: z.string().describe("First name or display name of the user"),
  provider: z
    .enum(["openai", "anthropic", "groq", "openrouter", "google"])
    .describe("The AI provider selected by the user"),
  model: z
    .string()
    .describe("The specific model ID to request from the provider"),
  userId: z.string().describe("The unique Better-Auth ID of the user"),
});

export const dexAgent = new Agent({
  id: "dex-agent",
  name: "Dex Agent",
  description: "A helpful assistant for managing collections and items in Dex",
  requestContextSchema: dexRequestContextSchema,
  // Entry point for user specfic information
  instructions: async ({ requestContext }) => {
    const userName = requestContext?.get("userName");
    if (!userName) return DEX_PROMPT;
    return `${DEX_PROMPT}\n\nYou are currently helping ${userName}. Personalize your responses.`;
  },
  inputProcessors: [new ReasoningToMessageProcessor()],
  model: async ({ requestContext, mastra }) => {
    const provider = requestContext?.get("provider") as
      | "openai"
      | "anthropic"
      | "groq"
      | "openrouter"
      | "google"
      | undefined;
    const modelId = requestContext?.get("model") as string | undefined;
    const userId = requestContext?.get("userId") as string | undefined;

    const logger = mastra?.getLogger();
    if (!provider || !modelId || !userId) {
      logger?.warn(
        "Failed to resolve dynamic model for user, using default model.",
      );
      return DEFAULT_MODEL;
    }

    const isSupported = SUPPORTED_MODELS.some(
      (m) => m.provider === provider && m.id === modelId,
    );

    if (!isSupported) {
      logger?.warn(
        `Requested unsupported model: ${modelId} from provider: ${provider}`,
      );
      return DEFAULT_MODEL;
    }

    try {
      const apiKey = await aiKeyService.getDecryptedKey(userId, provider);
      const model = resolveModel(provider, modelId, apiKey);
      logger?.info("Resolved model", model);
      return model;
    } catch (e) {
      logger?.error(
        "Failed to resolve dynamic model for user, using default model.",
        e,
      );
      // TODO:ADD Strict Logic and custom stream if keys are invalid...
      return DEFAULT_MODEL; // fallback if no key stored
    }
  },

  tools: { webSearch, ...agentService.getTools() },
  memory: new Memory({
    options: {
      generateTitle: true,
    },
  }),
});
