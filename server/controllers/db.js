import pg from 'pg';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const Pool = pg.Pool;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

export default pool;