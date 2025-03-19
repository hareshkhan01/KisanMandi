import { config as conf } from "dotenv";
conf();

const _config = {
  mongoString: 'mongodb+srv://debjyotisarkar929:debjyoti929@testcluster.bwjrv.mongodb.net/AUCTIONS',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'abcd'
};


export const config = Object.freeze(_config);
