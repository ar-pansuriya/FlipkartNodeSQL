const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASS,DB_NAME } = process.env
console.log(DB_HOST, DB_USER, DB_PASS,DB_NAME);

// Sequelize connection to remote MySQL database
const sequelize = new Sequelize(DB_NAME,DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync('/etc/mysql/ssl/ca-cert.pem'),
      cert: fs.readFileSync('/etc/mysql/ssl/server-cert.pem'),
      key: fs.readFileSync('/etc/mysql/ssl/server-key.pem'),
    },
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
