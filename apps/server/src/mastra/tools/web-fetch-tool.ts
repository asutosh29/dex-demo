import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { tavily } from "@tavily/core";
import { env } from "~/lib/env";

export const webFetch = createTool({
  id: "web-fetch",
  description:
    "Extracts the full, clean text content from specific webpage URLs. Use this only when you already have a specific URL (e.g., from a search result) and need to read the entire page to get deep context.",
  inputSchema: z.object({
    urls: z
      .array(z.url())
      .min(1)
      .max(20)
      .describe("An array of webpage URLs to extract content from"),
  }),
  outputSchema: z.array(
    z.object({
      url: z.string(),
      rawContent: z.string(),
    }),
  ),
  execute: async (inputData) => {
    const tvly = tavily({ apiKey: env.TAVILY_API_KEY });
    // The extract endpoint accepts an array of URLs directly
    const response = await tvly.extract(inputData.urls);
    return response.results.map((result) => ({
      url: result.url,
      title: result.title,
      rawContent: result.rawContent || "",
    }));
  },
});
