import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001",
});

(async function main() {
  const vector = await embeddings.embedQuery(
    "Como funciona o sistema de matrícula?"
  );
  
  console.log(vector);
})();