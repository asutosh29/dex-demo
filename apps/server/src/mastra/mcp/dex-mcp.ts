import { config } from "dotenv";
config();

// const dexMcpUrl = "https://apidex.sdslabs.co/mcp";
// const dexMcpUrl = "http://localhost:8787/mcp";

// export const dexMcp = new MCPClient({
//   id: "dex-mcp",
//   servers: {
//     dex: {
//       args: [
//         "-y",
//         "mcp-remote",
//         dexMcpUrl,
//         "--header",
//         `X-API-Key: ${process.env.DEX_API_KEY}`,
//       ],
//       command: "npx",
//     },
//   },
// });

// export const dexMcp = new MCPClient({
//   id: "dex-mcp",
//   servers: {
//     dex: {
//       url: new URL(dexMcpUrl),
//       requestInit: {
//         headers: {
//           "X-API-Key": process.env.DEX_API_KEY!,
//         },
//       },
//     },
//   },
// });
