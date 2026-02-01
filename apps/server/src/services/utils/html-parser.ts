import * as cheerio from "cheerio";
import { env } from "~/lib/env";
import { OEmbedData } from "~/lib/types";

interface ParseOptions {
  maxChunks?: number;
}

interface YouTubeVideoResponse {
  items?: Array<{
    snippet?: {
      title?: string;
      description?: string;
      channelTitle?: string;
      tags?: string[];
    };
  }>;
}

export interface ParsedContent {
  content: string;
}

/**
 * Extracts YouTube video ID from URL
 */
function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * Fetches YouTube video data using YouTube Data API
 */
export async function fetchYouTubeContent(
  url: string,
): Promise<ParsedContent | null> {
  console.log("[fetchYouTubeContent] START - URL:", url);
  const startTime = Date.now();

  try {
    console.log("[fetchYouTubeContent] Extracting video ID...");
    const videoId = extractYouTubeVideoId(url);
    console.log("[fetchYouTubeContent] Video ID:", videoId);

    if (!videoId) {
      console.log("[fetchYouTubeContent] No video ID found, returning null");
      return null;
    }

    const apiKey = env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.warn(
        "[fetchYouTubeContent] YOUTUBE_API_KEY not found in environment variables",
      );
      return null;
    }
    console.log("[fetchYouTubeContent] API key found");

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    console.log("[fetchYouTubeContent] Fetching from YouTube API...");
    const fetchStart = Date.now();
    const response = await fetch(apiUrl);
    console.log(
      "[fetchYouTubeContent] Fetch completed in",
      Date.now() - fetchStart,
      "ms",
    );
    console.log("[fetchYouTubeContent] Response status:", response.status);

    if (!response.ok) {
      console.log("[fetchYouTubeContent] Response not OK, returning null");
      return null;
    }

    console.log("[fetchYouTubeContent] Parsing JSON response...");
    const data = (await response.json()) as YouTubeVideoResponse;
    const video = data.items?.[0];
    console.log(
      "[fetchYouTubeContent] Video items found:",
      data.items?.length || 0,
    );

    if (!video?.snippet) {
      console.log(
        "[fetchYouTubeContent] No video snippet found, returning null",
      );
      return null;
    }

    console.log("[fetchYouTubeContent] Building content from snippet...");
    const parts: string[] = [];
    const snippet = video.snippet;

    if (snippet.channelTitle) {
      parts.push(`Channel: ${snippet.channelTitle}`);
      console.log("[fetchYouTubeContent] Added channel:", snippet.channelTitle);
    }
    if (snippet.title) {
      parts.push(`Title: ${snippet.title}`);
      console.log("[fetchYouTubeContent] Added title:", snippet.title);
    }
    if (snippet.description) {
      parts.push(`Description: ${snippet.description}`);
      console.log(
        "[fetchYouTubeContent] Added description length:",
        snippet.description.length,
      );
    }
    if (snippet.tags && snippet.tags.length > 0) {
      parts.push(`Tags: ${snippet.tags.join(", ")}`);
      console.log(
        "[fetchYouTubeContent] Added tags count:",
        snippet.tags.length,
      );
    }

    const content = parts.join(" ").trim() || "";
    const result = { content };
    console.log(
      "[fetchYouTubeContent] COMPLETE in",
      Date.now() - startTime,
      "ms",
    );
    console.log("[fetchYouTubeContent] Content length:", content.length);
    return result;
  } catch (error) {
    console.error(
      "[fetchYouTubeContent] ERROR after",
      Date.now() - startTime,
      "ms:",
      error,
    );
    console.error("[fetchYouTubeContent] Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return null;
  }
}

export async function parseHtmlContent(
  url: string,
  oembed: OEmbedData | null,
  options: ParseOptions = {},
): Promise<ParsedContent> {
  console.log("[parseHtmlContent] START - URL:", url);
  console.log("[parseHtmlContent] Options:", options);
  console.log(
    "[parseHtmlContent] oEmbed provider:",
    oembed?.provider_name || "none",
  );
  const startTime = Date.now();

  const { maxChunks = 1000 } = options;
  const maxCharacters = maxChunks * 4;
  console.log("[parseHtmlContent] Max characters:", maxCharacters);

  try {
    // Special handling for Twitter/X
    if (
      oembed &&
      ["twitter", "x"].includes((oembed.provider_name as string).toLowerCase())
    ) {
      console.log("[parseHtmlContent] Detected Twitter/X content");
      console.log("[parseHtmlContent] Loading oEmbed HTML into cheerio...");
      const twitterText = cheerio.load(oembed.html!).text();
      console.log(
        "[parseHtmlContent] Extracted Twitter text length:",
        twitterText.length,
      );

      if (twitterText) {
        const cleaned = twitterText.replace(/\s+/g, " ").trim();
        console.log(
          "[parseHtmlContent] Cleaned Twitter text length:",
          cleaned.length,
        );
        const result = {
          content:
            cleaned.length > maxCharacters
              ? cleaned.substring(0, maxCharacters)
              : cleaned,
        };
        console.log(
          "[parseHtmlContent] COMPLETE (Twitter) in",
          Date.now() - startTime,
          "ms",
        );
        console.log(
          "[parseHtmlContent] Final content length:",
          result.content.length,
        );
        return result;
      }
    }

    if (
      oembed &&
      (oembed.provider_name as string).toLowerCase() === "youtube"
    ) {
      console.log("[parseHtmlContent] Detected YouTube content");
      console.log("[parseHtmlContent] Fetching YouTube API data...");
      const ytStart = Date.now();
      const youtubeContent = await fetchYouTubeContent(url);
      console.log(
        "[parseHtmlContent] YouTube fetch completed in",
        Date.now() - ytStart,
        "ms",
      );

      if (youtubeContent) {
        console.log(
          "[parseHtmlContent] YouTube content length:",
          youtubeContent.content.length,
        );
        const cleaned = youtubeContent.content.replace(/\s+/g, " ").trim();
        const result = {
          content:
            cleaned.length > maxCharacters
              ? cleaned.substring(0, maxCharacters)
              : cleaned,
        };
        console.log(
          "[parseHtmlContent] COMPLETE (YouTube) in",
          Date.now() - startTime,
          "ms",
        );
        console.log(
          "[parseHtmlContent] Final content length:",
          result.content.length,
        );
        return result;
      }
    }

    // Standard HTML parsing for all other sites
    console.log("[parseHtmlContent] Using standard HTML parsing");
    console.log("[parseHtmlContent] Fetching URL...");
    const fetchStart = Date.now();
    const response = await fetch(url);
    console.log(
      "[parseHtmlContent] Fetch completed in",
      Date.now() - fetchStart,
      "ms",
    );
    console.log(
      "[parseHtmlContent] Response status:",
      response.status,
      response.statusText,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch URL: ${response.status} ${response.statusText}`,
      );
    }

    console.log("[parseHtmlContent] Reading response text...");
    const html = await response.text();
    console.log("[parseHtmlContent] HTML length:", html.length);

    // Load HTML into Cheerio
    console.log("[parseHtmlContent] Loading HTML into cheerio...");
    const $ = cheerio.load(html);

    // Remove script, style, and other non-content elements
    console.log("[parseHtmlContent] Removing non-content elements...");
    const removedCount = $(
      "script, style, noscript, iframe, nav, header, footer, aside, .ad, .advertisement",
    ).remove().length;
    console.log(
      "[parseHtmlContent] Removed",
      removedCount,
      "non-content elements",
    );

    // Try to find main content areas in order of preference
    let mainContent = "";

    // Look for common main content selectors
    const mainSelectors = [
      "main",
      "article",
      '[role="main"]',
      ".main-content",
      ".content",
      "#content",
      ".post-content",
      ".entry-content",
      "body",
    ];

    console.log("[parseHtmlContent] Searching for main content...");
    for (const selector of mainSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        mainContent = element.text();
        if (mainContent.trim().length > 0) {
          console.log(
            "[parseHtmlContent] Found content in selector:",
            selector,
          );
          console.log("[parseHtmlContent] Content length:", mainContent.length);
          break;
        }
      }
    }

    // If no main content found, fall back to body
    if (!mainContent.trim()) {
      console.log(
        "[parseHtmlContent] No main content selector matched, using body",
      );
      mainContent = $("body").text();
      console.log(
        "[parseHtmlContent] Body content length:",
        mainContent.length,
      );
    }

    // Clean up whitespace
    console.log("[parseHtmlContent] Cleaning whitespace...");
    mainContent = mainContent
      .replace(/\s+/g, " ") // Replace multiple whitespace with single space
      .trim();
    console.log(
      "[parseHtmlContent] Cleaned content length:",
      mainContent.length,
    );

    // Limit to max characters (max_chunks * 4)
    if (mainContent.length > maxCharacters) {
      console.log(
        "[parseHtmlContent] Truncating content from",
        mainContent.length,
        "to",
        maxCharacters,
      );
      mainContent = mainContent.substring(0, maxCharacters);
    }

    const result = {
      content: mainContent,
    };
    console.log("[parseHtmlContent] COMPLETE in", Date.now() - startTime, "ms");
    console.log(
      "[parseHtmlContent] Final content length:",
      result.content.length,
    );
    return result;
  } catch (error) {
    console.error(
      "[parseHtmlContent] ERROR after",
      Date.now() - startTime,
      "ms:",
      error,
    );
    console.error("[parseHtmlContent] Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw new Error(
      `Failed to parse HTML content: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
}
