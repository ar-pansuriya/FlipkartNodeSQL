const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('flipkart', 'root', 'Str0ngP@ssw0rd!', {
  host: 'localhost',
  dialect: 'mysql'
});

async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  testConnection();
  

module.exports=sequelize