import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('La variable de entorno DATABASE_URL es obligatoria');
}

export const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const testDbConnection = async () => {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
  } finally {
    client.release();
  }
};
