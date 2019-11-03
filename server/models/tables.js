import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createTables = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);
DROP TABLE IF EXISTS entries CASCADE;
CREATE TABLE entries(
  slug VARCHAR PRIMARY KEY NOT NULL,
  created_on VARCHAR NOT NULL,
  user_id INTEGER NOT NULL,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  updated_on  VARCHAR NOT NULL
)
`);
export default createTables;
