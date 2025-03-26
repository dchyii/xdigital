const express = require("express");
const router = express.Router();
const pool = require("../db");
const prisma = require("../db");

const cookieMaxAge = 60000 * 60; //1hr

router.get("/", (req, res) => {
  // res.cookie("cookieId", "testCookie", { maxAge: cookieMaxAge });
  res.status(200).json({
    message: "user API working!",
  });
});

//! vvv without prisma orm vvv !//
// router.get("/setupdb", async (req, res) => {
//   try {
//     await pool.query(
//       "CREATE TABLE IF NOT EXISTS users( id SERIAL PRIMARY KEY, username VARCHAR(80), password VARCHAR(100), isActive BOOLEAN)"
//     );
//     res.status(200).json({
//       message: "successfully created table",
//     });
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

// router.get("/seed", async (req, res) => {
//   try {
//     await pool.query(
//       "INSERT INTO users (username, password, isActive) VALUES ('alpha','passworda','True'), ('bravo', 'passwordb','True'), ('charlie', 'passwordc','True')"
//     );
//     res.status(200).json({
//       message: "successfully seeded users table",
//     });
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

// router.get("/allusers", async (req, res) => {
//   try {
//     const data = await pool.query("SELECT * FROM users");
//     res.status(200).send(data.rows);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

//! ^^^ without prisma orm ^^^ !//

//! vvv with prisma orm vvv !//
router.get("/allusers", async (req, res) => {
  console.log("all users");
  try {
    const users = await prisma.user.findMany();
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("database connection error");
  }
});

router.post("/newuser", async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
        isActive: true,
      },
    });
    console.log("new user created: ", newUser);
    res.cookie(
      "userCookie",
      { userId: newUser.id, username: newUser.username },
      { maxAge: cookieMaxAge, signed: true }
    );
    res.status(200).send(newUser);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("new user not created");
  }
});

router.get("/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });
    if (!user.isActive) {
      return res.status(400).send("User account is deleted");
    }
    const checkPassword = user.password === req.body.password;
    if (!user || !checkPassword) {
      return res.status(400).send("invalid credentials");
    }
    res.cookie(
      "userCookie",
      { userId: user.id, username: user.username },
      { maxAge: cookieMaxAge, signed: true }
    );
    res.status(200).send("logged in");
  } catch (err) {
    console.log(err.message);
    res.status(400).send("user not found");
  }
});

router.get("/:username", async (req, res) => {
  if (!req?.signedCookies?.userCookie?.username) {
    return res.status(401).send("invalid cookie");
  }
  const username = req.params.username;
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    const userInfo = {
      id: user.id,
      username: user.username,
      isActive: user.isActive,
    };
    res.status(200).send(userInfo);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("user not found");
  }
});

//! ^^^ with prisma orm ^^^ !//

module.exports = router;
