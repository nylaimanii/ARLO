import { getEmotionState } from "@/lib/emotion";

export async function GET() {
  try {
    const state = await getEmotionState();
    return Response.json({ state });
  } catch (err) {
    console.error("emotion fetch error:", err);
    return Response.json({ error: "she is resting" }, { status: 500 });
  }
}
