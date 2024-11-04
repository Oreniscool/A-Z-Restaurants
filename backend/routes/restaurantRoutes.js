import express from 'express';
import verifyJWT from '../middleware/verifyJWT.js';
import pool from '../database/db.js';
const app = express.Router();

app.get('/getAll', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let rows = await conn.query('SELECT * FROM restaurant;');
    res.status(200).json({ restaurants: rows });
  } catch (e) {
    console.error(e);
    return res.status(500).send('Internal server error');
  } finally {
    conn.end();
  }
});

app.get('/getAllByCategory', async (req, res) => {
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
    res.status(200).json({ restaurants: obj });
  } catch (e) {
    console.error(e);
    return res.status(500).send('Internal server error');
  } finally {
    conn.end();
  }
});

app.get('/getById', async (req, res) => {
  const id = req.headers['r_id'];
  let conn;
  try {
    conn = await pool.getConnection();
    let restaurant = (
      await conn.query('SELECT * FROM restaurant WHERE r_id=?', [id])
    )[0];
    restaurant.family = (
      await conn.query(
        'SELECT birthday_package,kids_entertainment FROM family WHERE r_id=?',
        [id]
      )
    )[0];
    restaurant.fast_food = (
      await conn.query(
        'SELECT drive_thru_avail,avg_service_time FROM fast_food WHERE r_id=?',
        [id]
      )
    )[0];
    restaurant.fine_dine = (
      await conn.query(
        'SELECT michelin_star,personalised_service,dress_code FROM fine_dine WHERE r_id=?',
        [id]
      )
    )[0];
    const [starters, main, desserts, drinks] = await Promise.all([
      conn.query('CALL get_starters_menu_by_id(?);', [id]),
      conn.query('CALL get_main_menu_by_id(?);', [id]),
      conn.query('CALL get_dessert_menu_by_id(?);', [id]),
      conn.query('CALL get_drink_menu_by_id(?);', [id]),
    ]);

    restaurant.menu = {
      starters: starters[0], // Accessing the rows array
      main: main[0],
      desserts: desserts[0],
      drinks: drinks[0],
    };
    res.status(200).json({ info: restaurant });
  } catch (e) {
    console.error(e);
    return res.status(500).send('Internal server error');
  } finally {
    conn.end();
  }
});

app.get('/getFreeTables', async (req, res) => {
  const r_id = req.headers['r_id'];
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = (
      await conn.query('CALL GetFreeTables(?,?)', [res_date, r_id])
    )[0];
    res.status(200).json({ tables: rows });
  } catch (e) {
    console.error(e);
  } finally {
    conn.end();
  }
});

export default app;
