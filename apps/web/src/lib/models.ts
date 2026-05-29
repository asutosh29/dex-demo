// TODO: Move to shared workspace library in the future
export type ModelProvider =
  | "groq"
  | "openai"
  | "anthropic"
  | "google"
  | "openrouter";
export type Model = {
  provider: ModelProvider;
  id: string;
  name: string;
  modelId: string;
  description: string;
  reasoning?: boolean;
  toolCalling?: boolean;
};
export const SUPPORTED_MODELS: Model[] = [
  // Groq
  // { // Not a tool calling model
  //   provider: "groq",
  //   id: "groq/llama-3.3-70b-versatile",
  //   name: "Llama 3.3 70B",
  //   description: "Heavy hitter for general-purpose, open-source reasoning.",
  //   reasoning: false,
  //   toolCalling: false,
  // },
  {
    provider: "openrouter",
    id: "openrouter/moonshotai/kimi-k2-thinking",
    modelId: "moonshotai/kimi-k2-thinking",
    name: "Kimi K2 Thinking",
    description: "Solid, fast, multimodal middle ground.",
    reasoning: true,
  },
  {
    provider: "openrouter",
    id: "openrouter/deepseek/deepseek-v4-pro",
    modelId: "deepseek/deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    description: "Solid, fast, multimodal middle ground.",
    reasoning: true,
  },
  {
    provider: "groq",
    id: "groq/meta-llama/llama-4-scout-17b-16e-instruct",
    modelId: "meta-llama/llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Scout (17B)",
    description: "Solid, fast, multimodal middle ground.",
    reasoning: false,
  },
  {
    provider: "groq",
    id: "groq/openai/gpt-oss-120b",
    modelId: "openai/gpt-oss-120b",
    name: "GPT-OSS 120B",
    description: "OpenAI's flagship open-weight model.",
    reasoning: true,
    toolCalling: true,
  },
  {
    provider: "groq",
    id: "groq/openai/gpt-oss-20b",
    modelId: "openai/gpt-oss-20b",
    name: "GPT-OSS 20B",
    description: "OpenAI's flagship open-weight model but smaller",
    reasoning: true,
    toolCalling: true,
  },
  {
    provider: "groq",
    id: "groq/qwen/qwen3-32b",
    modelId: "qwen/qwen3-32b",
    name: "Qwen3 32B",
    description: "Highly capable, especially strong in coding.",
    reasoning: true,
    toolCalling: true,
  },

  // OpenAI
  {
    provider: "openai",
    id: "openai/gpt-5.4",
    modelId: "gpt-5.4",
    name: "GPT-5.4",
    description: "Flagship model for complex reasoning and professional work.",
  },
  {
    provider: "openai",
    id: "openai/gpt-5.4-mini",
    modelId: "gpt-5.4-mini",
    name: "GPT-5.4 mini",
    description: "Standard for high-volume, cost-effective tasks.",
  },
  {
    provider: "openai",
    id: "openai/gpt-5.4-nano",
    modelId: "gpt-5.4-nano",
    name: "GPT-5.4 nano",
    description: "Standard for high-volume, cost-effective tasks.",
  },
  {
    provider: "openai",
    id: "openai/o4-mini",
    modelId: "o4-mini",
    name: "o4-mini",
    description:
      "Latest reasoning models for deep, multi-step problem-solving.",
  },
  {
    provider: "openai",
    id: "openai/o3-pro",
    modelId: "o3-pro",
    name: "o3-pro",
    description:
      "Latest reasoning models for deep, multi-step problem-solving.",
  },
  {
    provider: "openai",
    id: "openai/gpt-4o",
    modelId: "gpt-4o",
    name: "GPT-4o",
    description:
      "Highly reliable, fast for standard conversational interfaces.",
  },
  {
    provider: "openai",
    id: "openai/gpt-4o-mini",
    modelId: "gpt-4o-mini",
    name: "GPT-4o-mini",
    description:
      "Highly reliable, fast for standard conversational interfaces.",
  },

  // Anthropic
  {
    provider: "anthropic",
    id: "anthropic/claude-4-6-sonnet",
    modelId: "claude-4-6-sonnet",
    name: "Claude 4.6 Sonnet",
    description: "Gold standard for coding and balanced performance.",
  },
  {
    provider: "anthropic",
    id: "anthropic/claude-4-6-opus",
    modelId: "claude-4-6-opus",
    name: "Claude 4.6 Opus",
    description: "Most capable model for highly complex, multi-step tasks.",
  },
  {
    provider: "anthropic",
    id: "anthropic/claude-4-5-haiku",
    modelId: "claude-4-5-haiku",
    name: "Claude 4.5 Haiku",
    description: "Blazing fast and cheap, ideal for simple extractions.",
  },
  {
    provider: "anthropic",
    id: "anthropic/claude-3-7-sonnet",
    modelId: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    description: "Widely utilized and a great fallback option.",
  },

  // Gemini
  {
    provider: "google",
    id: "google/gemini-3.1-pro-preview",
    modelId: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro",
    description: "Most advanced model for vibe coding and deep agentic tasks.",
  },
  {
    provider: "google",
    id: "google/gemini-3-flash-preview",
    modelId: "gemini-3-flash-preview",
    name: "Gemini 3 Flash",
    description: "Extremely fast, cost-effective models.",
  },
  {
    provider: "google",
    id: "google/gemini-3.1-flash-lite-preview",
    modelId: "gemini-3.1-flash-lite-preview",
    name: "Gemini 3.1 Flash-Lite",
    description: "Extremely fast, cost-effective models.",
  },
  {
    provider: "google",
    id: "google/gemini-2.5-pro",
    modelId: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description: "Solid, highly reliable previous iterations.",
  },
  {
    provider: "google",
    id: "google/gemini-2.5-flash",
    modelId: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description: "Solid, highly reliable previous iterations.",
  },
];
