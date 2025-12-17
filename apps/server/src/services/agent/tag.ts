import { groq } from "@ai-sdk/groq";
import { Agent } from "@voltagent/core";

export const WebpageTaggerAgent = new Agent({
  name: "Webpage Tagger",
  instructions: `You are a webpage content analyzer that provides concise summaries and relevant tags.

    Your task:
    1. Read the provided webpage content carefully
    2. Generate a TLDR (Too Long; Didn't Read) - a brief 2-3 sentence summary of what the page is about
    3. Generate 5-10 relevant tags that categorize the content (topics, technologies, concepts, etc.)

    IMPORTANT: You must respond with ONLY valid JSON in this exact format:
    {
      "tldr": "Your concise 2-3 sentence summary here",
      "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
    }

    Keep the TLDR clear and informative. Tags should be single words or short phrases, lowercase.
    Do not include any text before or after the JSON object.`,
  model: groq("llama-3.3-70b-versatile"),
});

export const WebpageTaggerAgentWithTitle = new Agent({
  name: "Webpage Tagger",
  instructions: `You are a webpage content analyzer that provides concise summaries and relevant tags.

    Your task:
    1. Read the provided webpage content carefully.
    2. Generate a concise title for the webpage based on its content.
    3. Generate a TLDR (Too Long; Didn't Read) - a brief 2-3 sentence summary of what the page is about
    4. Generate 5-10 relevant tags that categorize the content (topics, technologies, concepts, etc.)

    IMPORTANT: You must respond with ONLY valid JSON in this exact format:
    {
      "title": "Your concise title here",
      "tldr": "Your concise 2-3 sentence summary here",
      "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
    }

    Keep the TLDR clear and informative. Tags should be single words or short phrases, lowercase.
    Do not include any text before or after the JSON object.`,
  model: groq("llama-3.3-70b-versatile"),
});
