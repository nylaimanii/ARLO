import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getEmbedding } from "@/lib/embeddings";
import type { Stage } from "@/lib/stage";

const AGENT_ID = "arlo-1";

export type MemoryRole =
  | "user_message"
  | "arlo_reply"
  | "world_event"
  | "reflection";

export type AttachmentContext = "caregiver" | "stranger" | "self";

export type Memory = {
  content: string;
  role: MemoryRole;
  attachment_context?: AttachmentContext | null;
  importance?: number;
  stage_at_time: Stage;
};

export type RecalledMemory = {
  id: string;
  content: string;
  role: string;
  attachment_context: string | null;
  importance: number;
  stage_at_time: string;
  similarity?: number;
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

export async function recordMemory(memory: Memory): Promise<void> {
  const embedding = await getEmbedding(memory.content);
  const { error } = await admin().from("memories").insert({
    agent_id: AGENT_ID,
    content: memory.content,
    embedding,
    role: memory.role,
    attachment_context: memory.attachment_context ?? null,
    importance: memory.importance ?? 50,
    stage_at_time: memory.stage_at_time,
  });
  if (error) {
    console.error("[memory] record failed:", error.message);
  }
}

export async function recallSimilar(
  query: string,
  limit = 5,
): Promise<RecalledMemory[]> {
  const embedding = await getEmbedding(query);
  const { data, error } = await admin().rpc("match_memories", {
    query_embedding: embedding,
    match_threshold: 0.1,
    match_count: limit,
  });
  if (error || !data) {
    console.error("[memory] similar recall failed:", error?.message);
    return [];
  }
  return data as RecalledMemory[];
}

export async function recallRecent(limit = 5): Promise<RecalledMemory[]> {
  const { data, error } = await admin()
    .from("memories")
    .select("id, content, role, attachment_context, importance, stage_at_time")
    .eq("agent_id", AGENT_ID)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) {
    console.error("[memory] recent recall failed:", error?.message);
    return [];
  }
  return data as RecalledMemory[];
}
