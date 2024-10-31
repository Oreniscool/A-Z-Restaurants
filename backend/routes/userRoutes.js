import express from 'express';
import verifyJWT from '../middleware/verifyJWT.js';
import pool from '../database/db.js';
const app = express.Router();

app.get('/isAuth', verifyJWT, (req, res) => {
  res.status(200).send('Authenticated');
});

app.get('/getUsername', verifyJWT, async (req, res) => {
  const id = req.userId;
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      'SELECT username FROM customer WHERE c_id=?',
      [id]
    );
    res.status(200).json({ username: rows[0].username });
  } catch (e) {
    console.error(e);
    conn.end();
    return res.status(500).send('Internal server error');
  }
  conn.end();
});

export default app;
