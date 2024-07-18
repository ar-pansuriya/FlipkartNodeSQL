const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect'); // Import sequelize instance

// Define the User model
const User = sequelize.define('User', {
  // Define attributes
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});   

module.exports=User

// Function to create the table
// async function createTable() {
//   try {
//     await User.sync({ force: true }); 
//     console.log('User table created (if not exists) or updated!');
//   } catch (error) {
//     console.error('Error creating table:', error);
//   }
// }

// createTable();
