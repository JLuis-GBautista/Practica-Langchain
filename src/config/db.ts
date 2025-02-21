// import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
// import { MongoClient } from "mongodb";
// // import { OpenAIEmbeddings } from "@langchain/openai";
// import ENV from "./env";


// export default class ConnectMongoDB {
//     private static client = new MongoClient(ENV.URL_MONGO || '');
//     private static db = "Langchain";
//     private static collection = this.client.db(this.db).collection("Vectores");

//     public static async vectorStore() {
//         return await MongoDBAtlasVectorSearch.fromTexts(
//             ["Dolor de cabeza", "Dolor de muela"],
//             [{ id: 2, quality: 'padecimiento' }, { id: 1, quality: 'medicamento' }],
//             // new OpenAIEmbeddings({openAIApiKey: ENV.OPENAI_API_KEY, modelName: ENV.OPENAI_MODEL, dimensions: 1024 }),
//             embeddings,
//             {
//               collection: this.collection,
//               indexName: "default", // The name of the Atlas search index. Defaults to "default"
//               textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
//               embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
//             }
//         );
//     }
//     public static async document(vectorStore: MongoDBAtlasVectorSearch) {
//         const assignedIds = await vectorStore.addDocuments([
//             { pageContent: "upsertable", metadata: {} },
//           ]);
//         const upsertedDocs = [{ pageContent: "overwritten", metadata: {} }];

//         await vectorStore.addDocuments(upsertedDocs, { ids: assignedIds });
//     }

//     public static async closeDB() {
//         await this.client.close();
//     }
// }