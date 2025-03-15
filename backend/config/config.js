import { config as conf } from "dotenv";
conf({ path: "../.env" });

const _config = {
  mongoString: process.env.MONGO_STRING,
  port: process.env.PORT,
};


export const config = Object.freeze(_config);
