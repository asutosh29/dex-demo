import { OEmbedData, OpenGraphData, Provider } from "~/lib/types";
import * as cheerio from "cheerio";
import providers from "~/assets/oembed-providers.json";

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
      image: $('meta[property="og:image"]').attr("content"),
      siteName: $('meta[property="og:site_name"]').attr("content"),
      url: $('meta[property="og:url"]').attr("content") || url,
      type: $('meta[property="og:type"]').attr("content"),
    };

    // Extract favicon
    let favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      $('link[rel="apple-touch-icon"]').attr("href");

    if (favicon && !favicon.startsWith("http")) {
      const urlObj = new URL(url);
      if (favicon.startsWith("//")) {
        favicon = urlObj.protocol + favicon;
      } else if (favicon.startsWith("/")) {
        favicon = `${urlObj.protocol}//${urlObj.host}${favicon}`;
      } else {
        favicon = `${urlObj.protocol}//${urlObj.host}/${favicon}`;
      }
    }
    ogp.favicon = favicon;

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
  const match = matchUrlToProvider(url);
  if (!match) return null;

  const oembedUrl = new URL(match.apiUrl);
  oembedUrl.searchParams.set("url", url);
  oembedUrl.searchParams.set("format", "json");
  const response = await fetch(oembedUrl.toString());
  if (!response.ok) return null;
  const data = await response.json();
  return data as OEmbedData;
}
