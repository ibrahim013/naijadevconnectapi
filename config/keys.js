import dotenv from 'dotenv';

dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const key = process.env.KEY;
module.exports = {
  mongoURI: `mongodb://${user}:${password}@ds133632.mlab.com:33632/naijadevconnect`,
  secretorkey: `${key}`
};
