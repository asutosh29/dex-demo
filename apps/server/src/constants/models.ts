// TODO: Move to shared workspace library in the future
export type ModelProvider = "groq" | "openai" | "anthropic" | "google";
export type Model = {
  provider: ModelProvider;
  id: string;
  name: string;
  description: string;
};
export const SUPPORTED_MODELS: Model[] = [
  // Groq
  {
    provider: "groq",
    id: "groq/llama-3.3-70b-versatile",
    name: "Llama 3.3 70B",
    description: "Heavy hitter for general-purpose, open-source reasoning.",
  },
  {
    provider: "groq",
    id: "groq/meta-llama/llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Scout (17B)",
    description: "Solid, fast, multimodal middle ground.",
  },
  {
    provider: "groq",
    id: "groq/openai/gpt-oss-120b",
    name: "GPT-OSS 120B",
    description: "OpenAI's flagship open-weight model.",
  },
  {
    provider: "groq",
    id: "groq/qwen/qwen3-32b",
    name: "Qwen3 32B",
    description: "Highly capable, especially strong in coding.",
  },

  // OpenAI
  {
    provider: "openai",
    id: "openai/gpt-5.4",
    name: "GPT-5.4",
    description: "Flagship model for complex reasoning and professional work.",
  },
  {
    provider: "openai",
    id: "openai/gpt-5.4-mini",
    name: "GPT-5.4 mini",
    description: "Standard for high-volume, cost-effective tasks.",
  },
  {
    provider: "openai",
    id: "openai/gpt-5.4-nano",
    name: "GPT-5.4 nano",
    description: "Standard for high-volume, cost-effective tasks.",
  },
  {
    provider: "openai",
    id: "openai/o4-mini",
    name: "o4-mini",
    description:
      "Latest reasoning models for deep, multi-step problem-solving.",
  },
  {
    provider: "openai",
    id: "openai/o3-pro",
    name: "o3-pro",
    description:
      "Latest reasoning models for deep, multi-step problem-solving.",
  },
  {
    provider: "openai",
    id: "openai/gpt-4o",
    name: "GPT-4o",
    description:
      "Highly reliable, fast for standard conversational interfaces.",
  },
  {
    provider: "openai",
    id: "openai/gpt-4o-mini",
    name: "GPT-4o-mini",
    description:
      "Highly reliable, fast for standard conversational interfaces.",
  },

  // Anthropic
  {
    provider: "anthropic",
    id: "anthropic/claude-4-6-sonnet",
    name: "Claude 4.6 Sonnet",
    description: "Gold standard for coding and balanced performance.",
  },
  {
    provider: "anthropic",
    id: "anthropic/claude-4-6-opus",
    name: "Claude 4.6 Opus",
    description: "Most capable model for highly complex, multi-step tasks.",
  },
  {
    provider: "anthropic",
    id: "anthropic/claude-4-5-haiku",
    name: "Claude 4.5 Haiku",
    description: "Blazing fast and cheap, ideal for simple extractions.",
  },
  {
    provider: "anthropic",
    id: "anthropic/claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    description: "Widely utilized and a great fallback option.",
  },

  // Gemini
  {
    provider: "google",
    id: "google/gemini-3.1-pro",
    name: "Gemini 3.1 Pro",
    description: "Most advanced model for vibe coding and deep agentic tasks.",
  },
  {
    provider: "google",
    id: "google/gemini-3-flash",
    name: "Gemini 3 Flash",
    description: "Extremely fast, cost-effective models.",
  },
  {
    provider: "google",
    id: "google/gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash-Lite",
    description: "Extremely fast, cost-effective models.",
  },
  {
    provider: "google",
    id: "google/gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description: "Solid, highly reliable previous iterations.",
  },
  {
    provider: "google",
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description: "Solid, highly reliable previous iterations.",
  },
];
