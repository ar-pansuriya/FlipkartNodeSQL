const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Sequelize connection to remote MySQL database
const sequelize = new Sequelize(
  "defaultdb",
  "doadmin",
  "AVNS_Dfb1DQN4Fixm4-H-acL",
  {
    host: "db-mysql-blr1-86042-do-user-17334879-0.f.db.ondigitalocean.com",
    port: 25060,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.join(__dirname, "..", "ca-certificate.crt")), // Adjusted path to go one level up
      },
    },
  }
);

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
