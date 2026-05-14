import type { EmotionState } from "@/lib/emotion";
import type { Stage } from "@/lib/stage";

export function shouldSimulate(params: {
  state: EmotionState;
  stage: Stage;
  userMessage: string;
}): boolean {
  const { state, stage, userMessage } = params;

  if (stage === "nursery") return false;

  if (stage === "toddler") {
    return state.curiosity > 60 || userMessage.includes("?");
  }

  const wordCount = userMessage.trim().split(/\s+/).length;
  return state.curiosity > 50 || wordCount > 10;
}
