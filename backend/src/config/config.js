import { config as conf } from "dotenv";
conf();

const _config = {
  mongoString: process.env.MONGO_STRING,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET
};


export const config = Object.freeze(_config);
