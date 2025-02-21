import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "../config/oLlama";

export const basicPromptTemplate = async (systemTemplate: string, parameterSystem: string, parameterInput: string) => {
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", parameterInput],
  ]);

  const promptValue = await promptTemplate.invoke({
    language: parameterSystem,
    text: parameterInput,
  });
  
  return ((await model.invoke(promptValue.toChatMessages())).content);
}



