import { OEmbedData, OpenGraphData, Provider } from "~/lib/types";
import * as cheerio from "cheerio";
import providers from "~/assets/oembed-providers.json";

function normalizeUrl(
  relativeUrl: string | undefined,
  baseUrl: string,
): string | undefined {
  if (!relativeUrl || relativeUrl.startsWith("http")) return relativeUrl;
  const urlObj = new URL(baseUrl);
  if (relativeUrl.startsWith("//")) return urlObj.protocol + relativeUrl;
  if (relativeUrl.startsWith("/"))
    return `${urlObj.protocol}//${urlObj.host}${relativeUrl}`;
  return `${urlObj.protocol}//${urlObj.host}/${relativeUrl}`;
}

function extractGoogleDriveFileId(url: string): string | null {
  // Match various Google Drive URL formats
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/i,
    /[?&]id=([a-zA-Z0-9_-]+)/i,
    /\/folders\/([a-zA-Z0-9_-]+)/i,
    /\/d\/([a-zA-Z0-9_-]+)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }

  return null;
}

export async function extractOpenGraphData(
  url: string,
): Promise<OpenGraphData> {
  try {
    const response = await fetch(url);
    if (!response.ok) return {};

    const html = await response.text();
    const $ = cheerio.load(html);

    const ogp: OpenGraphData = {
      title:
        $('meta[property="og:title"]').attr("content") || $("title").text(),
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content"),
      image: normalizeUrl($('meta[property="og:image"]').attr("content"), url),
      siteName: $('meta[property="og:site_name"]').attr("content"),
      url: $('meta[property="og:url"]').attr("content") || url,
      type: $('meta[property="og:type"]').attr("content"),
    };

    // Have to handle google drive separately
    // TODO: Make a special cases handler
    if (url.includes("drive.google.com")) {
      const fileId = extractGoogleDriveFileId(url);
      console.log("Extracted Google Drive file ID:", fileId);
      ogp.image = `https://lh3.googleusercontent.com/d/${fileId}?authuser=0`;
    }

    // Extract favicon
    ogp.favicon = normalizeUrl(
      $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href") ||
        $('link[rel="apple-touch-icon"]').attr("href"),
      url,
    );
    console.log("Extracted OGP data:", ogp);
    return ogp;
  } catch (error) {
    console.error("Error extracting OGP data:", error);
    return {};
  }
}

export function matchUrlToProvider(
  url: string,
): { apiUrl: string; providerName: string } | null {
  for (const provider of providers as Provider[]) {
    for (const endpoint of provider.endpoints) {
      if (!endpoint.schemes) continue;

      for (const scheme of endpoint.schemes) {
        // Convert wildcard pattern to regex
        const pattern = scheme
          .replace(/\./g, "\\.")
          .replace(/\*/g, ".*")
          .replace(/\?/g, "\\?");

        const regex = new RegExp(`^${pattern}$`);

        if (regex.test(url)) {
          return {
            apiUrl: endpoint.url,
            providerName: provider.provider_name,
          };
        }
      }
    }
  }

  return null;
}

export async function getOembedData(url: string): Promise<OEmbedData | null> {
  // Handle Google Drive separately, kinda ugly implementation, but works for now
  // TODO: Make a special cases handler
  if (url.includes("drive.google.com")) {
    const fileId = extractGoogleDriveFileId(url);
    if (fileId) {
      return {
        title: "Google Drive File",
        provider_name: "Google Drive",
        html: `<iframe src="https://drive.google.com/file/d/${fileId}/preview" width="640" height="720" allow="autoplay"></iframe>`,
        description: "Embedded Google Drive file",
      };
    }
  }
  const match = matchUrlToProvider(url);
  if (!match) return null;

  const oembedUrl = new URL(match.apiUrl);
  oembedUrl.searchParams.set("url", url);
  oembedUrl.searchParams.set("format", "json");
  const response = await fetch(oembedUrl.toString());
  console.log("Fetching oEmbed data from:", oembedUrl.toString());
  if (!response.ok) return null;
  const data = await response.json();
  return data as OEmbedData;
}
