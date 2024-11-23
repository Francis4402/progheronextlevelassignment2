import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABSE_URL,
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
};
