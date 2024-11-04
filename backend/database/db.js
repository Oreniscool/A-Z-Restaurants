import mariadb from 'mariadb';
import dotenv from 'dotenv';
dotenv.config();
const pool = mariadb.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 5,
});

export default pool;
