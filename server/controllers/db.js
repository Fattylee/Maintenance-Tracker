import pg from 'pg';

const Pool = pg.Pool;
const pool = new Pool({
  connectionString: 
  
  // 'postgresql://postgres:loocer212@@localhost:5432/maintenance-tracker',
  'postgres://qkfrkxrrdlqrse:87b0e33f56a055cd021b5cd1ba77cf4058f03ff7756524353df200a374f4b424@ec2-107-20-133-82.compute-1.amazonaws.com:5432/dd148ckbb7siqu',
  ssl: true
});

export default pool;

