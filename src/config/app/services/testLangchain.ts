
import { ChatOpenAI } from "@langchain/openai";
import ENV from "../../env";

const chatModel = new ChatOpenAI({
  openAIApiKey: ENV.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo'
});

const testLangchain = async (exercise: number) => {
    let responseBot: string;
    switch (exercise) {
        case 1:
            const msg = await chatModel.invoke('Dime 10 lenguajes de programacion');
            console.log(msg);
            break;
    
        default:
            break;
    }
}

export default testLangchain;