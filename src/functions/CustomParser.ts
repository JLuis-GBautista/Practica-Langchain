import { AIMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "../config/oLlama";
import { RunnableLambda } from "@langchain/core/runnables";

export class CustomParser<T> {
    private schema: string;

    constructor(schema: string) {
        this.schema = schema;
    }

    extractJSON(output: AIMessage): T {
        let text = output.content as string;
        console.log(text)
        // Define the regular expression pattern to match JSON blocks
        const pattern = /```json(.*?)```/gs;
        if (text.startsWith("{")) text = "```json\n"+ text + "\n```";
        // Find all non-overlapping matches of the pattern in the string
        const matches = text.match(pattern);
          console.log(matches)
      
        // Process each match, attempting to parse it as JSON
        try {
          return (
            matches?.map((match) => {
              // Remove the markdown code block syntax to isolate the JSON string
              const jsonStr = match.replace(/```json|```/g, "").trim();
              return JSON.parse(jsonStr);
            }) ?? []
          ) as T;
        } catch (error) {
          throw new Error(`Failed to parse: ${output}`);
        }
    }

    async response(query: string) {
        const prompt = await ChatPromptTemplate.fromMessages([
            [
                "system",
                `Answer the user query. Output your answer as JSON that
            matches the given schema: \`\`\`json\n{schema}\n\`\`\`.
            Make sure to wrap the answer in \`\`\`json and \`\`\` tags`,
            ],
            ["human", "{query}"],
        ]).partial({
            schema: this.schema,
        });
    
        
        //console.log((await prompt.format({ query })).toString());
    
        const chain = prompt
      .pipe(model)
      .pipe(new RunnableLambda({ func: this.extractJSON }));
    
        return await chain.invoke({ query });
    }
}

type AddressUser = {
    street: string;
    noExt: string;
    noInt: string;
    postalCode: string;
    state: string;
    country: string
}

type User = {
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    age: number;
    address: AddressUser;
    pets: string[]
}

const userSchema: User = {name: "", paternalSurname: "", maternalSurname: "", age: 0, address: {street: "", noExt: "", noInt: "", postalCode: "", state: "", country: ""}, pets: [""]};

export const customParserExample = async () => {
    const UserParser = new CustomParser<User>(JSON.stringify(userSchema));
    return await UserParser.response("El usuario Juan Perez Dolores tiene la edad de 42 años de edad y le gusta escribir libros. Actualmente vive el la calle 5 de mayo numero 12 y su código postal es 56334 y vive en la ciudad de México. Este usuario tiene 3 mascotas, 1 perro y dos gatos.");
}
