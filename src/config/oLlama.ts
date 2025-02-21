import { OllamaEmbeddings, ChatOllama } from "@langchain/ollama";


export const embeddings = new OllamaEmbeddings({
  model: "mxbai-embed-large",
  baseUrl: "http://localhost:11434", 
  maxConcurrency: 5,
});

export const model = new ChatOllama({
    model: "llama3.1",
    temperature: .6
})