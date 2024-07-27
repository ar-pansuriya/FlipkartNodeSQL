const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Sequelize connection to remote MySQL database
const sequelize = new Sequelize('project1', 'admin', 'Fenil#0566Fenil#0566', {
  host: 'vigsaley.online',
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
