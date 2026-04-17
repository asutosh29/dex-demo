import type { Processor, ProcessInputStepArgs } from "@mastra/core/processors";
import type { MastraDBMessage } from "@mastra/core/memory";
import { SUPPORTED_MODELS } from "~/constants/models";

export class ReasoningToMessageProcessor implements Processor {
  id = "reasoning-to-message";

  async processInputStep({
    messages,
    model,
  }: ProcessInputStepArgs): Promise<MastraDBMessage[]> {
    // Check if the current model is NOT a thinking/reasoning model
    // Adjust this check to match your model identifiers
    const modelId =
      typeof model === "string" ? model : ((model as any)?.modelId ?? "");
    const isThinkingModel = SUPPORTED_MODELS.some((model) => {
      if (model.modelId === modelId && model.reasoning === true) {
        return true;
      }
    });

    console.log("IS THINKING MODEL", isThinkingModel);

    if (isThinkingModel) {
      // Leave reasoning parts as-is for thinking models
      console.log("IS THINKING MODEL, RETURNING AS IS");
      return messages;
    }

    // Transform reasoning parts into a formatted assistant text message
    for (const msg of messages) {
      if (msg.role === "assistant" && msg.content?.parts) {
        const reasoningParts = msg.content.parts.filter(
          (p: any) => p.type === "reasoning",
        );

        if (reasoningParts.length === 0) continue;

        // Extract reasoning text from each reasoning part
        const reasoningTexts = reasoningParts
          .map((p: any) => {
            if (p.details && Array.isArray(p.details)) {
              return p.details
                .filter((d: any) => d.type === "text")
                .map((d: any) => d.text)
                .join("");
            }
            return p.reasoning || "";
          })
          .filter(Boolean);

        if (reasoningTexts.length === 0) continue;

        // Build the formatted reasoning message body
        const reasoningBody = reasoningTexts
          .map((text: string) => `- ${text}`)
          .join("\n");
        const formattedReasoning = `# Reasoning\n\n${reasoningBody}`;

        // Replace reasoning parts with a text part
        msg.content.parts = msg.content.parts
          .map((p: any) => {
            if (p.type === "reasoning") return null;
            return p;
          })
          .filter(Boolean);

        // Insert the formatted reasoning as a text part at the start
        console.log("NORMALISED: ", formattedReasoning);
        msg.content.parts.unshift({
          type: "text",
          text: formattedReasoning,
        });
      }
    }
    console.log("NOT THINKING MODEL, RETURNING NORMALISED");
    return messages;
  }
}
