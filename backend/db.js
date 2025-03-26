require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const prisma = new PrismaClient();

module.exports = pool;
module.exports = prisma;
