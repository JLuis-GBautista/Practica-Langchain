import express from 'express';
import ENV from './config/env';
import { easyResponseIA, easyResponseStreamIA } from './functions/LLMs';
import { basicPromptTemplate } from './functions/Prompts';
import { jsonOutputParser, outputParserZod } from './functions/OutputParser';
import { customParserExample } from './functions/CustomParser';
import { basicTools } from './functions/Tools';





//import ConnectMongoDB from './config/db';

const app = express();

app.use(express.static('Public'));
app.use(express.json());

app.listen(ENV.PORT, async() => {
    console.log(`El servidor esta activo en el puerto ${ENV.PORT}.\nModo ${ENV.TYPE}`);
    try {   
        //console.log(await easyResponseIA("Translate the following from English into Spanish", "hi!"));
        //console.log(await easyResponseStreamIA("Translate the following from English into Spanish", "hi!"));
        //console.log(await basicPromptTemplate("Translate the following from English into {language}", "Spanish", "Hi!"));
        //console.log(await outputParserZod());
        // console.log(await jsonOutputParser())
        //console.log(await customParserExample());
        console.log(await basicTools());
    } catch (error) {
        console.log(error);
    }
});