import Groq from "groq-sdk";
import {
  recordMemory,
  recallSimilar,
  recallRecent,
  type RecalledMemory,
} from "@/lib/memory";

const SYSTEM_PROMPT =
  "you are arlo, a thoughtful AI companion with continuous memory. you remember everything the user has shared with you across all your conversations. when relevant memories are provided in your context under 'things you remember', use them naturally to ground your replies. be warm, curious, and genuinely engaged. respond in 1-3 sentences unless the user asks for more.";

function buildSystemPrompt(memories: RecalledMemory[]): string {
  let prompt = SYSTEM_PROMPT;
  if (memories.length > 0) {
    const lines = memories.map((m) => `- ${m.content}`).join("\n");
    prompt += `\n\nthings you remember:\n${lines}`;
  }
  return prompt;
}

function dedupe(arr: RecalledMemory[]): RecalledMemory[] {
  const seen = new Set<string>();
  const out: RecalledMemory[] = [];
  for (const m of arr) {
    if (!seen.has(m.id)) {
      seen.add(m.id);
      out.push(m);
    }
  }
  return out;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body?.message;

    if (typeof message !== "string" || !message.trim()) {
      return Response.json({ error: "message required" }, { status: 400 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const [similar, recent] = await Promise.all([
      recallSimilar(message, 5),
      recallRecent(5),
    ]);
    const memories = dedupe([...similar, ...recent]);

    const systemPrompt = buildSystemPrompt(memories);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 300,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const responseText = (
      completion.choices[0]?.message?.content ?? ""
    ).trim();

    await Promise.all([
      recordMemory({
        content: message,
        role: "user_message",
        stage_at_time: "continuous",
        attachment_context: "stranger",
        importance: 50,
      }),
      recordMemory({
        content: responseText,
        role: "arlo_reply",
        stage_at_time: "continuous",
        attachment_context: "self",
        importance: 50,
      }),
    ]);

    return Response.json({
      response: responseText,
      recalled_count: memories.length,
    });
  } catch (err) {
    console.error("chat api error:", err);
    return Response.json({ error: "she is resting" }, { status: 500 });
  }
}
