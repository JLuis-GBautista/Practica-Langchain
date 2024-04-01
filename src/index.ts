import express from 'express';
import ENV from './config/env';
import ConnectMongoDB from './config/db';

const app = express();

app.use(express.static('Public'));
app.use(express.json());

app.listen(ENV.PORT, () => {
    console.log(`El servidor esta activo en el puerto ${ENV.PORT}.\nModo ${ENV.TYPE}`);
    const testVectors = async () => {
        try {
            const vectorStore = await ConnectMongoDB.vectorStore();
            console.log(vectorStore);
            const document = await ConnectMongoDB.document(vectorStore);
            console.log(document);
        } catch (error) {
            console.log(error);
        }
    }
    testVectors();
});