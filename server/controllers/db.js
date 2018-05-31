import pg from 'pg';
import jwt from 'jsonwebtoken';

require('dotenv').config()


const Pool = pg.Pool;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default pool;