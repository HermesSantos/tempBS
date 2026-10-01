import { db } from "./db";
import { embeddings } from "./embeddings";

export async function ask(question: string, limit = 3) {
  const vector = await embeddings.embedQuery(question);

  // `<=>` is pgvector's cosine distance (0 = same direction), so similarity = 1 - distance
  return db`
    SELECT
      id,
      content,
      metadata,
      1 - (embedding <=> ${JSON.stringify(vector)}::vector) AS similarity
    FROM documents
    ORDER BY embedding <=> ${JSON.stringify(vector)}::vector
    LIMIT ${limit}
  `;
}
