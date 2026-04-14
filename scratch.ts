import { mastra } from "./apps/server/src/mastra/index";
import { randomUUID } from "crypto";

async function main() {
  const agent = mastra.getAgent("dexAgent");
  if (!agent) {
    console.log("No agent");
    return;
  }

  // check if agent.getMemory or agent.memory exists
  console.log("agent keys:", Object.keys(agent));

  // check if mastra.memory exists
  console.log("mastra keys:", Object.keys(mastra));
}

main().catch(console.error);
