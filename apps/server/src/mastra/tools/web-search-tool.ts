import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { tavily } from "@tavily/core";
import { env } from "~/lib/env";

export const webSearch = createTool({
  id: "web-search",
  description:
    "Searches the web to find relevant URLs and brief summaries for a given query. Always use this tool first to discover sources before attempting to read full pages.",
  inputSchema: z.object({
    query: z.string().min(1).max(50).describe("The search query"),
  }),
  outputSchema: z.array(
    z.object({
      title: z.string().nullable(),
      url: z.string(),
      content: z.string(),
      publishedDate: z.string().optional(),
    }),
  ),
  execute: async (inputData) => {
    const tvly = tavily({ apiKey: env.TAVILY_API_KEY });
    const results = await tvly.search(inputData.query);

    return results.results.map((result) => ({
      title: result.title,
      url: result.url,
      content: result.content.slice(0, 500),
      publishedDate: result.publishedDate,
    }));
  },
});
