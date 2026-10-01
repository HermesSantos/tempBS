import { ask } from "./ask";
import { db } from "./db";
import { saveDocuments } from "./save_documents";

(async function main() {
  // Run once to fill the table; running again duplicates the documents
  // await saveDocuments();

  const question = "Meu cachorro passou mal de madrugada, o que eu faço?";
  const results = await ask(question);

  console.log(`Question: ${question}\n`);

  for (const result of results) {
    console.log(`[${result.similarity.toFixed(3)}] (${result.metadata.topic}) ${result.content}\n`);
  }

  await db.close();
})();
