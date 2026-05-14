import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const AGENT_ID = "arlo-1";

export type EmotionState = {
  mood: number;
  energy: number;
  curiosity: number;
  attachment: number;
};

const DEFAULT_STATE: EmotionState = {
  mood: 50,
  energy: 50,
  curiosity: 70,
  attachment: 30,
};

let _admin: SupabaseClient | null = null;

function admin(): SupabaseClient {
  if (!_admin) {
    _admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
  }
  return _admin;
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export async function getEmotionState(): Promise<EmotionState> {
  const { data, error } = await admin()
    .from("emotion_state")
    .select("mood, energy, curiosity, attachment")
    .eq("agent_id", AGENT_ID)
    .single();

  if (error || !data) {
    console.error("[emotion] read failed, using defaults:", error?.message);
    return DEFAULT_STATE;
  }
  return {
    mood: data.mood,
    energy: data.energy,
    curiosity: data.curiosity,
    attachment: data.attachment,
  };
}

export async function updateEmotionState(
  deltas: Partial<EmotionState>,
): Promise<EmotionState> {
  const current = await getEmotionState();
  const next: EmotionState = {
    mood: clamp(current.mood + (deltas.mood ?? 0)),
    energy: clamp(current.energy + (deltas.energy ?? 0)),
    curiosity: clamp(current.curiosity + (deltas.curiosity ?? 0)),
    attachment: clamp(current.attachment + (deltas.attachment ?? 0)),
  };

  const { error } = await admin()
    .from("emotion_state")
    .update({ ...next, updated_at: new Date().toISOString() })
    .eq("agent_id", AGENT_ID);

  if (error) {
    console.error("[emotion] update failed:", error.message);
  }
  return next;
}
