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
      `CREATE TABLE IF NOT EXISTS files(
                fileid SERIAL PRIMARY KEY, 
                filename VARCHAR(80), 
                url TEXT, 
                userid INTEGER NOT NULL, 
                date_created TIMESTAMPTZ DEFAULT NOW(), 
                description TEXT, 
                category  VARCHAR(25),
                CONSTRAINT chk_category CHECK (category IN ('voice recording', 'music', 'soundtrack')),
                CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES users(id)
                )`
    );
    res.status(200).json({
      message: "successfully created files table",
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/seed", async (req, res) => {
  try {
    await pool.query(
      `INSERT INTO files (filename, url, userid, description, category) 
                VALUES 
                ('file1','link','1','test music 1', 'music'),
                ('file2','link','1','test music 2', 'soundtrack'),
                ('file3','link','2','test music 3', 'music'),
                ('file4','link','3','test music 4', 'voice recording')`
    );
    res.status(200).json({
      message: "successfully seeded files table",
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/allfiles", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM files");
    res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
