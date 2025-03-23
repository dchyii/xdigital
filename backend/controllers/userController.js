const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "user API working!",
  });
});

router.get("/setupdb", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS users( id SERIAL PRIMARY KEY, username VARCHAR(80), password VARCHAR(100), isActive BOOLEAN)"
    );
    res.status(200).json({
      message: "successfully created table",
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/seed", async (req, res) => {
  try {
    await pool.query(
      "INSERT INTO users (username, password, isActive) VALUES ('alpha','passworda','True'), ('bravo', 'passwordb','True'), ('charlie', 'passwordc','True')"
    );
    res.status(200).json({
      message: "successfully seeded users table",
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/allusers", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM users");
    res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
