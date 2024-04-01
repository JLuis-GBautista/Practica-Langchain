interface Env {
  [name: string]: string;
  TYPE: string;
  PORT: string;
  URL_MONGO:string;
  OPENAI_API_KEY: string;
  OPENAI_MODEL: string;
}

const ENV = process.env as Env;

export default ENV;