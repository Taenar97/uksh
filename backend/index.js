const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const { Pool } = require('pg');

const userDbPool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.USERS_DB,
  port: process.env.DB_PORT,
});

const medicalDbPool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.MEDICAL_DB,
  port: process.env.DB_PORT,
});


app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database time: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  }
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
