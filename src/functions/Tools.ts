import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { model } from "../config/oLlama";
import { RunnableConfig } from "@langchain/core/runnables";

const multiply = tool(
  ({ a, b }: { a: number; b: number }): number => {
    /**
     * Multiply a and b.
     */
    return a * b;
  },
  {
    name: "multiply",
    description: "Multiplies a and b.",
    schema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  }
);

const add = tool(
    ({ a, b }: { a: number; b: number }): number => {
      /**
       * Multiply a and b.
       */
      return a + b;
    },
    {
      name: "add",
      description: "Adds a and b.",
      schema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    }
  );

// Tool creation
const tools = [multiply, add];
// Tool binding
const modelWithTools = model.bindTools(tools);

// Tool calling
const toolsByName = {
    add: add,
    multiply: multiply,
  };

export const basicTools = async () => {
    //console.log(await modelWithTools.invoke("Hello world!"));
    const aiMessage = await modelWithTools.invoke("What is 30 * 12? Also, what is 51 + 49?");

    return new Promise((resolve) => {
        setTimeout(async() => { // Al parecer se lleva tiempo en hacer la operación, el setTimeout es un auxiliar
            const responses = [];
            if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0)
                for (const toolCall of aiMessage.tool_calls) {
                  console.log(toolCall.name)
                  const selectedTool = toolsByName[toolCall.name as "add" | "multiply"];
                  const toolMessage = await selectedTool.invoke(toolCall);
                  responses.push(toolMessage);
                }
            resolve(responses);
        },1000);
    });
}
