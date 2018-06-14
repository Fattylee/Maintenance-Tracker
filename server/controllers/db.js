import pg from 'pg';

const Pool = pg.Pool;
const pool = new Pool({
  connectionString: 'postgresql://postgres:loocer212@@localhost:5432/maintenance-tracker',
  ssl: false
});

export default pool;

