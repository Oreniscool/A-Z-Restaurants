import express from 'express';
import verifyJWT from '../middleware/verifyJWT.js';
import pool from '../database/db.js';
const app = express.Router();

app.get('/getAll', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let obj = {};
    let rows = await conn.query(
      'SELECT restaurant.*, family.birthday_package, family.kids_entertainment FROM restaurant INNER JOIN family ON restaurant.r_id=family.r_id'
    );
    obj.family = rows;
    rows = await conn.query(
      'SELECT r.*, f.drive_thru_avail,f.avg_service_time FROM restaurant AS r INNER JOIN fast_food AS f ON r.r_id=f.r_id'
    );
    obj.fast_food = rows;
    rows = await conn.query(
      'SELECT r.*, f.michelin_star,f.personalised_service,f.dress_code FROM restaurant AS r INNER JOIN fine_dine AS f ON r.r_id=f.r_id'
    );
    obj.fine_dine = rows;
    console.log(obj);
    res.status(200).json({ restaurants: obj });
  } catch (e) {
    console.error(e);
    conn.end();
    return res.status(500).send('Internal server error');
  }
  conn.end();
});

export default app;
