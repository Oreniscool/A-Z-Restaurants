import express from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
dotenv.config();
const app = express();
app.use(express.json());
const pool = mariadb.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 5,
});

app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent
  })
);

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
  conn.end();
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
  conn.end();
});

app.post('/login', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { username, password } = req.body;
    if (!username || !password) {
      conn.end();
      return res.status(400).json({ message: 'All fields are required' });
    }
    try {
      const row = await conn.query(
        'SELECT * FROM customer WHERE customer.username=?',
        [username]
      );
      console.log(row);
      if (!row) {
        conn.end();
        return res.status(401).json({ message: 'Invalid username' });
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        row[0].password_hash
      );

      if (!isPasswordValid) {
        conn.end();
        return res.status(401).json({ message: 'Invalid password' });
      }
    } catch (e) {
      conn.end();
      console.log(e);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('worked');
});

app.post('/register', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const {
      username,
      firstName,
      lastName,
      building,
      block,
      street,
      city,
      sector,
      locality,
      dob,
      password,
      email,
    } = req.body;
    if (
      !username ||
      !firstName ||
      !lastName ||
      !building ||
      !locality ||
      !dob ||
      !password ||
      !email
    ) {
      conn.end();
      return res.status(400).json({ message: 'All fields are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await conn.query(
        'INSERT INTO customer(username,first_name,last_name,registered_date,building_name,block_no,street,city,sector,famous_locality,DOB,password_hash,email) values(?,?,?,CURDATE(),?,?,?,?,?,?,?,?,?)',
        [
          username,
          firstName,
          lastName,
          building,
          block,
          street,
          city,
          sector,
          locality,
          dob,
          hashedPassword,
          email,
        ]
      );
      conn.end();
    } catch (e) {
      console.log(e);
      if (e.code == 'ER_DUP_ENTRY') {
        conn.end();
        return res.status(400).json({ message: 'usrname_dup' });
      }
    }
  } catch (e) {
    conn.end();
    console.log(e);
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('worked');
});

const PORT = 5000;
http
  .createServer(app)
  .listen(PORT, () => console.log(`Express server started at ${PORT}`));
