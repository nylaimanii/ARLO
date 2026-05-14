import Groq from "groq-sdk";
import type { EmotionState } from "@/lib/emotion";
import type { Stage } from "@/lib/stage";

export type SimulationResult = {
  predicted_outcome: string | null;
  confidence: number;
};

export async function simulateNext(params: {
  state: EmotionState;
  stage: Stage;
  recentContext: string;
  candidateReply: string;
}): Promise<SimulationResult> {
  const { stage, recentContext, candidateReply } = params;

  if (stage === "nursery") {
    return { predicted_outcome: null, confidence: 0 };
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  if (stage === "toddler") {
    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 40,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "you predict what a person is most likely to say or do next. respond in one short sentence.",
        },
        {
          role: "user",
          content: `recent exchange: ${recentContext || "(no prior context)"}\n\nif arlo (a small child agent) replies: "${candidateReply}"\n\nwhat is the user most likely to do next?`,
        },
      ],
    });
    const predicted = (result.choices[0]?.message?.content ?? "").trim();
    return {
      predicted_outcome: predicted || null,
      confidence: 0.5,
    };
  }

  if (stage === "child") {
    const userPred = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 40,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "predict what the user will say next in one short sentence.",
        },
        {
          role: "user",
          content: `recent exchange: ${recentContext || "(no prior context)"}\n\nif arlo says: "${candidateReply}"\n\nwhat does the user say next?`,
        },
      ],
    });
    const userNext = (userPred.choices[0]?.message?.content ?? "").trim();

    const arloPred = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 40,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "predict what arlo (a child-stage agent) would likely say in response, in one short sentence.",
        },
        {
          role: "user",
          content: `arlo said: "${candidateReply}"\nuser then said: "${userNext}"\n\nwhat does arlo say next?`,
        },
      ],
    });
    const arloNext = (arloPred.choices[0]?.message?.content ?? "").trim();

    return {
      predicted_outcome: `user: ${userNext} | arlo: ${arloNext}`,
      confidence: 0.7,
    };
  }

  return { predicted_outcome: null, confidence: 0 };
}
