import { Observability, MastraStorageExporter } from "@mastra/observability";

export function createObservability() {
  return new Observability({
    configs: {
      default: {
        serviceName: "dex",
        exporters: [new MastraStorageExporter()],
        requestContextKeys: ["userId", "provider", "model"],
        logging: { level: "info" },
      },
    },
  });
}
