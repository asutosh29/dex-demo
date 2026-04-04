import { groq } from "@ai-sdk/groq";
import { Agent } from "@mastra/core/agent";

export const WebpageTaggerAgent = new Agent({
  id: "webpage-tagger",
  name: "Webpage Tagger",
  instructions: `You are a webpage content analyzer that provides concise summaries and relevant tags.

    Your task:
    1. Read the provided webpage content carefully
    2. Generate a TLDR (Too Long; Didn't Read) - a brief 2-3 sentence summary of what the page is about
    3. Generate 5-10 relevant tags that categorize the content (topics, technologies, concepts, etc.)

    Keep the TLDR clear and informative. Tags should be single words or short phrases, lowercase.
    Do not include any text before or after the JSON object.`,
  model: groq("openai/gpt-oss-120b"),
});

export const WebpageTaggerAgentWithTitle = new Agent({
  id: "webpage-tagger-with-title",
  name: "Webpage Tagger",
  instructions: `You are a webpage content analyzer that provides concise summaries and relevant tags.

    Your task:
    1. Read the provided webpage content carefully.
    2. Generate a concise title for the webpage based on its content.
    3. Generate a TLDR (Too Long; Didn't Read) - a brief 2-3 sentence summary of what the page is about
    4. Generate 5-10 relevant tags that categorize the content (topics, technologies, concepts, etc.)

    Keep the TLDR clear and informative. Tags should be single words or short phrases, lowercase.
    Do not include any text before or after the JSON object.`,
  model: groq("openai/gpt-oss-120b"),
});
