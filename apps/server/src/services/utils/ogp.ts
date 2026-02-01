import { OEmbedData, OpenGraphData, Provider } from "~/lib/types";
import * as cheerio from "cheerio";
import providers from "~/assets/oembed-providers.json";

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
  console.log("[extractOpenGraphData] START - URL:", url);
  const startTime = Date.now();

  try {
    console.log("[extractOpenGraphData] Fetching URL...");
    const fetchStart = Date.now();
    const response = await fetch(url);
    console.log(
      "[extractOpenGraphData] Fetch completed in",
      Date.now() - fetchStart,
      "ms",
    );
    console.log(
      "[extractOpenGraphData] Response status:",
      response.status,
      response.statusText,
    );

    if (!response.ok) {
      console.log(
        "[extractOpenGraphData] Response not OK, returning empty object",
      );
      return {};
    }

    console.log("[extractOpenGraphData] Reading response text...");
    const html = await response.text();
    console.log("[extractOpenGraphData] HTML length:", html.length);

    console.log("[extractOpenGraphData] Loading HTML into cheerio...");
    const $ = cheerio.load(html);

    console.log("[extractOpenGraphData] Extracting OGP metadata...");
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
    console.log("[extractOpenGraphData] Base OGP extracted:", {
      hasTitle: !!ogp.title,
      hasDescription: !!ogp.description,
      hasImage: !!ogp.image,
      hasSiteName: !!ogp.siteName,
    });

    // Have to handle google drive separately
    // TODO: Make a special cases handler
    if (url.includes("drive.google.com")) {
      console.log("[extractOpenGraphData] Detected Google Drive URL");
      const fileId = extractGoogleDriveFileId(url);
      console.log(
        "[extractOpenGraphData] Extracted Google Drive file ID:",
        fileId,
      );
      ogp.image = `https://lh3.googleusercontent.com/d/${fileId}?authuser=0`;
      console.log("[extractOpenGraphData] Set Google Drive image URL");
    }

    // Extract favicon
    console.log("[extractOpenGraphData] Extracting favicon...");
    let favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      $('link[rel="apple-touch-icon"]').attr("href");

    console.log("[extractOpenGraphData] Raw favicon:", favicon);

    if (favicon && !favicon.startsWith("http")) {
      console.log("[extractOpenGraphData] Normalizing favicon URL...");
      const urlObj = new URL(url);
      if (favicon.startsWith("//")) {
        favicon = urlObj.protocol + favicon;
        console.log("[extractOpenGraphData] Favicon with protocol:", favicon);
      } else if (favicon.startsWith("/")) {
        favicon = `${urlObj.protocol}//${urlObj.host}${favicon}`;
        console.log("[extractOpenGraphData] Favicon absolute path:", favicon);
      } else {
        favicon = `${urlObj.protocol}//${urlObj.host}/${favicon}`;
        console.log("[extractOpenGraphData] Favicon relative path:", favicon);
      }
    }
    ogp.favicon = favicon;

    const totalTime = Date.now() - startTime;
    console.log(
      "[extractOpenGraphData] COMPLETE in",
      totalTime,
      "ms - Result:",
      ogp,
    );
    return ogp;
  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error(
      "[extractOpenGraphData] ERROR after",
      totalTime,
      "ms:",
      error,
    );
    console.error("[extractOpenGraphData] Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
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
  console.log("[getOembedData] START - URL:", url);
  const startTime = Date.now();

  // Handle Google Drive separately, kinda ugly implementation, but works for now
  // TODO: Make a special cases handler
  if (url.includes("drive.google.com")) {
    console.log("[getOembedData] Detected Google Drive URL");
    const fileId = extractGoogleDriveFileId(url);
    console.log("[getOembedData] Extracted file ID:", fileId);

    if (fileId) {
      const result = {
        title: "Google Drive File",
        provider_name: "Google Drive",
        html: `<iframe src="https://drive.google.com/file/d/${fileId}/preview" width="640" height="720" allow="autoplay"></iframe>`,
        description: "Embedded Google Drive file",
      };
      console.log(
        "[getOembedData] COMPLETE (Google Drive) in",
        Date.now() - startTime,
        "ms",
      );
      return result;
    }
    console.log("[getOembedData] No file ID found, returning null");
    return null;
  }

  console.log("[getOembedData] Matching URL to oEmbed provider...");
  const match = matchUrlToProvider(url);

  if (!match) {
    console.log("[getOembedData] No oEmbed provider found for URL");
    return null;
  }

  console.log("[getOembedData] Matched provider:", match.providerName);
  console.log("[getOembedData] API URL:", match.apiUrl);

  const oembedUrl = new URL(match.apiUrl);
  oembedUrl.searchParams.set("url", url);
  oembedUrl.searchParams.set("format", "json");

  console.log(
    "[getOembedData] Fetching oEmbed data from:",
    oembedUrl.toString(),
  );
  const fetchStart = Date.now();

  try {
    const response = await fetch(oembedUrl.toString());
    console.log(
      "[getOembedData] Fetch completed in",
      Date.now() - fetchStart,
      "ms",
    );
    console.log(
      "[getOembedData] Response status:",
      response.status,
      response.statusText,
    );

    if (!response.ok) {
      console.log("[getOembedData] Response not OK, returning null");
      return null;
    }

    console.log("[getOembedData] Parsing JSON response...");
    const data = await response.json();
    console.log(
      "[getOembedData] COMPLETE in",
      Date.now() - startTime,
      "ms - Result:",
      data,
    );
    return data as OEmbedData;
  } catch (error) {
    console.error(
      "[getOembedData] ERROR after",
      Date.now() - startTime,
      "ms:",
      error,
    );
    console.error("[getOembedData] Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return null;
  }
}
