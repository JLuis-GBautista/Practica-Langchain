import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { model } from '../config/oLlama';

export const easyResponseIA = async(systemMessage: string, inputMessage: string) => {
    const messages = [
        new SystemMessage(systemMessage),
        new HumanMessage(inputMessage),
    ];
    return (await model.invoke(messages)).content;
}

export const easyResponseStreamIA = async(systemMessage: string, inputMessage: string) => {
  const messages = [
    new SystemMessage(systemMessage),
    new HumanMessage(inputMessage),
  ];
  const stream = await model.stream(messages);

  const chunks = [];
  for await (const chunk of stream) {
      chunks.push(chunk.content);
      console.log(`${chunk.content}|`);
  }
  return {chunks: chunks, content: chunks.join("")}
}

