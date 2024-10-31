import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyJWT from './middleware/verifyJWT.js';
import pool from './database/db.js';
import userRoutes from './routes/userRoutes.js';
//set up
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent
  })
);

app.use('/user', userRoutes);

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
      conn.end();
      if (row.length == 0) {
        return res.status(401).json({ message: 'Invalid username' });
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        row[0].password_hash
      );

      if (!isPasswordValid) {
        return res.status(402).json({ message: 'Invalid password' });
      } else {
        const id = row[0].c_id;
        const token = jwt.sign({ id }, process.env.JWTSECRET, {
          expiresIn: '15m',
        });

        return res.json({ auth: true, token: token, result: row });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
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
