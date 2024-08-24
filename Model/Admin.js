const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');

const AdminDetail = sequelize.define('AdminDetail', {
  adminId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isGoogleEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  facebookPixelId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  googlePixelId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  upi:{
    type:DataTypes.STRING,
    allowNull:false
  },
  marchantId:{
    type:DataTypes.STRING,
    allowNull:false
  },
  keyIndex:{
    type: DataTypes.INTEGER,
    allowNull:false
  },
  PhonePayAPIKey:{
    type:DataTypes.STRING,
    allowNull:false
  }
});

AdminDetail.sync()
  .then(async() => {
    // await AdminDetail.create( {
    //     isGoogleEnabled: true, // Use boolean true
    //     facebookPixelId: 'FB_PIXEL_ID_3',
    //     googlePixelId: 'GOOGLE_PIXEL_ID_3',
    //     username: 'Admin@123',
    //     password: 'Str0ngP@ssw0rd!',
    //     upi:'mab.037322004480280@axisbank'
    //   })
    console.log('AdminDetail table has been created, if it did not already exist.');
  })
  .catch((error) => {
    console.error('Error creating AdminDetail table:', error.message);
  });

module.exports = AdminDetail;
