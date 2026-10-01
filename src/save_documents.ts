import { db } from "./db";
import { documents } from "./documents";
import { embeddings } from "./embeddings";

export async function saveDocuments() {
  const vectors = await embeddings.embedDocuments(documents.map((doc) => doc.content));

  for (const [i, doc] of documents.entries()) {
    // pgvector accepts the text format "[0.1,0.2,...]", which is exactly what JSON.stringify produces
    const [row] = await db`
      INSERT INTO documents (content, metadata, embedding)
      VALUES (${doc.content}, ${doc.metadata}, ${JSON.stringify(vectors[i])}::vector)
      RETURNING id
    `;

    console.log(`Saved document id=${row.id} (${doc.metadata.topic})`);
  }
}
