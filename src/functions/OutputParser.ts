import {z} from "zod";
import { model } from "../config/oLlama";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const dataUser = z.object({
    name: z.string().describe("Nombre del usuario sin los apellidos del usuario").nullable(),
    paternalSurname: z.string().describe("Apellido paterno del usuario").nullable(),
    maternalSurname: z.string().describe("Apellido materno del usuario").nullable(),
    age: z.number().describe("La edad del usuario").nullable(),
    address: z.object({
        street: z.string().describe("Nombre de la calle donde vive el usuario").nullable(),
        noExt: z.string().describe("Numero exterior del usuario o S/N").nullable(),
        noInt: z.string().describe("Numero interior del usuario").nullable(),
        postalCode: z.string().describe("Código postal el usuario en numero").nullable(),
        state: z.string().describe("El estado donde habita el usuario").nullable(),
        country: z.string().describe("El país donde habita el usuario").nullable()
    }).describe("La dirección del usuario").nullable(),
    pets: z.array(z.string()).describe("Los tipos de mascotas del usuario")
}).describe("La información del usuario sera proporcionada en español");

const structuredLlm = model.withStructuredOutput(dataUser, { name: "data User"});

export const outputParserZod = async () => {
    return await structuredLlm.invoke("El usuario Juan Perez Dolores tiene la edad de 42 años de edad y le gusta escribir libros. Actualmente vive el la calle 5 de mayo numero 12 y su código postal es 56334 y vive en la ciudad de México. Este usuario tiene 3 mascotas, 1 perro y dos gatos.");
}

type Person = {
    name: string;
    height_in_meters: number;
  };
  
  type People = {
    people: Person[];
  };
  
  const formatInstructions = `Respond only in valid JSON. The JSON object you return should match the following schema:
  {{ people: [{{ name: "string", height_in_meters: "number" }}] }}
  
  Where people is an array of objects, each with a name and height_in_meters field.
  `;

export const jsonOutputParser = async () => {
      // Set up a parser
  const parser = new JsonOutputParser<People>();
  
  // Prompt
  const prompt = await ChatPromptTemplate.fromMessages([
    [
      "system",
      "Answer the user query. Wrap the output in `json` tags\n{format_instructions}",
    ],
    ["human", "{query}"],
  ]).partial({
    format_instructions: formatInstructions,
  });

  const query = "Anna is 23 years old and she is 6 feet tall";

  console.log((await prompt.format({ query })).toString());

  const chain = prompt.pipe(model).pipe(parser);

  await chain.invoke({ query });
}
  

