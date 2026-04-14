import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const DEFAULT_MODEL = "groq/moonshotai/kimi-k2-instruct-0905";

// We use any for Model factory return since AI SDK has complex polymorphic types
const PROVIDERS: Record<string, any> = {
  openai: (id: string, opts: { apiKey: string }) =>
    createOpenAI({ apiKey: opts.apiKey })(id),
  anthropic: (id: string, opts: { apiKey: string }) =>
    createAnthropic({ apiKey: opts.apiKey })(id),
  groq: (id: string, opts: { apiKey: string }) =>
    createGroq({ apiKey: opts.apiKey })(id),
  // Note: openrouter uses the openai provider format under the hood typically
  openrouter: (id: string, opts: { apiKey: string }) =>
    createOpenAI({
      apiKey: opts.apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    })(id),
  google: (id: string, opts: { apiKey: string }) =>
    createGoogleGenerativeAI({ apiKey: opts.apiKey })(id),
};

export function resolveModel(
  provider: string,
  modelId: string,
  apiKey: string,
) {
  const factory = PROVIDERS[provider];
  if (!factory) throw new Error(`Unsupported provider: ${provider}`);

  // Clean the "provider/model_id" format if the frontend sends it
  let cleanModelId = modelId;
  const prefix = `${provider}/`;
  if (modelId.startsWith(prefix)) {
    cleanModelId = modelId.slice(prefix.length);
  }

  return factory(cleanModelId, { apiKey });
}
