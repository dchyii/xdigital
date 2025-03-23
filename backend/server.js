require("dotenv").config();
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");
const pool = require("./db");
const port = process.env.PORT;

const userController = require("./controllers/userController");
const fileController = require("./controllers/fileController");

const app = express();

//*middelware
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);

//*middelware for routes
app.use("/api/users", userController);
app.use("/api/files", fileController);

//*routes
app.get("/", (req, res) => {
  //   console.log(req.session);
  //   console.log(req.session.id);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`server has started on port ${port}!`));
