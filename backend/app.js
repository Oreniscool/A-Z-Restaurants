import express from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const pool = mariadb.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 5,
});

//get all restaurants
app.get('/restaurants', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * from restaurant');
    console.log(rows);
    const jsonS = JSON.stringify(rows);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(jsonS);
  } catch (e) {
    console.error(e);
  }
});

//get all customers
app.get('/customers', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * from customer');
    console.log(rows);
    const jsonS = JSON.stringify(rows);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(jsonS);
  } catch (e) {
    console.error(e);
  }
});

const PORT = 5000;
http
  .createServer(app)
  .listen(PORT, () => console.log(`Express server started at ${PORT}`));
