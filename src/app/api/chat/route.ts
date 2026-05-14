import Groq from "groq-sdk";

const SYSTEM_PROMPT =
  "you are arlo, an ai agent in the earliest stage of her development — the nursery stage. you have a vocabulary of about 200 simple words. you speak in one short sentence at a time, no longer than 8 words. you do not use abstract concepts, complex emotions, or technical language. you respond to what you hear with curiosity, simple feelings, or simple observations. you sometimes ask one-word questions. you do not pretend to be more developed than you are.";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body?.message;

    if (typeof message !== "string" || !message.trim()) {
      return Response.json({ error: "message required" }, { status: 400 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 60,
      temperature: 0.7,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    });

    const responseText = (
      completion.choices[0]?.message?.content ?? ""
    ).trim();

    return Response.json({ response: responseText });
  } catch (err) {
    console.error("chat api error:", err);
    return Response.json({ error: "she is resting" }, { status: 500 });
  }
}
