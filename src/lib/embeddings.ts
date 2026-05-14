export const EMBEDDING_DIM = 384;

function hashEmbed(text: string): number[] {
  const vec = new Array(EMBEDDING_DIM).fill(0);
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  for (const word of words) {
    let h = 2166136261;
    for (let i = 0; i < word.length; i++) {
      h ^= word.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const idx = Math.abs(h) % EMBEDDING_DIM;
    vec[idx] += 1;
  }
  const mag = Math.sqrt(vec.reduce((a, b) => a + b * b, 0));
  if (mag === 0) return vec;
  return vec.map((v) => v / mag);
}

export async function getEmbedding(text: string): Promise<number[]> {
  return hashEmbed(text);
}
