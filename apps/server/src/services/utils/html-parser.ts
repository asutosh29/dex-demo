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
  try {
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) return null;

    const apiKey = env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.warn("YOUTUBE_API_KEY not found in environment variables");
      return null;
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) return null;

    const data = (await response.json()) as YouTubeVideoResponse;
    const video = data.items?.[0];

    if (!video?.snippet) return null;

    const parts: string[] = [];
    const snippet = video.snippet;

    if (snippet.channelTitle) parts.push(`Channel: ${snippet.channelTitle}`);
    if (snippet.title) parts.push(`Title: ${snippet.title}`);
    if (snippet.description) parts.push(`Description: ${snippet.description}`);
    if (snippet.tags && snippet.tags.length > 0) {
      parts.push(`Tags: ${snippet.tags.join(", ")}`);
    }

    return {
      content: parts.join(" ").trim() || "",
    };
  } catch (error) {
    console.warn("YouTube API fetch failed:", error);
    return null;
  }
}

export async function parseHtmlContent(
  url: string,
  oembed: OEmbedData | null,
  options: ParseOptions = {},
): Promise<ParsedContent> {
  const { maxChunks = 1000 } = options;
  const maxCharacters = maxChunks * 4;

  try {
    // Special handling for Twitter/X
    if (
      oembed &&
      ["twitter", "x"].includes((oembed.provider_name as string).toLowerCase())
    ) {
      const twitterText = cheerio.load(oembed.html!).text();
      if (twitterText) {
        const cleaned = twitterText.replace(/\s+/g, " ").trim();
        return {
          content:
            cleaned.length > maxCharacters
              ? cleaned.substring(0, maxCharacters)
              : cleaned,
        };
      }
    }

    if (
      oembed &&
      (oembed.provider_name as string).toLowerCase() === "youtube"
    ) {
      const youtubeContent = await fetchYouTubeContent(url);
      if (youtubeContent) {
        const cleaned = youtubeContent.content.replace(/\s+/g, " ").trim();
        return {
          content:
            cleaned.length > maxCharacters
              ? cleaned.substring(0, maxCharacters)
              : cleaned,
        };
      }
    }

    // Standard HTML parsing for all other sites
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch URL: ${response.status} ${response.statusText}`,
      );
    }

    const html = await response.text();

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    // Remove script, style, and other non-content elements
    $(
      "script, style, noscript, iframe, nav, header, footer, aside, .ad, .advertisement",
    ).remove();

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

    for (const selector of mainSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        mainContent = element.text();
        if (mainContent.trim().length > 0) {
          break;
        }
      }
    }

    // If no main content found, fall back to body
    if (!mainContent.trim()) {
      mainContent = $("body").text();
    }

    // Clean up whitespace
    mainContent = mainContent
      .replace(/\s+/g, " ") // Replace multiple whitespace with single space
      .trim();

    // Limit to max characters (max_chunks * 4)
    if (mainContent.length > maxCharacters) {
      mainContent = mainContent.substring(0, maxCharacters);
    }

    return {
      content: mainContent,
    };
  } catch (error) {
    throw new Error(
      `Failed to parse HTML content: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
}
