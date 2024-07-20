const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect'); 
const Category = require('./Category'); 

const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  subprice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  productImages: {
    type: DataTypes.JSON, 
    allowNull: true,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Product.belongsTo(Category, { foreignKey: 'CategoryId' });

const products = [
  {
    productName: 'Product1',
    productDescription: 'A high-quality electronic device.',
    CategoryId: 1,
    price: 299.99,
    subprice: 250,
    stockQuantity: 20,
    productImages: ['imageA1.jpg', 'imageA2.jpg'],
    size: 'L',
    color: 'BLACK',
    rank: 1,
  },
  {
    productName: 'Product2',
    productDescription: 'Comfortable and stylish clothing item.',
    CategoryId: 2,
    price: 59.99,
    subprice: 50,
    stockQuantity: 35,
    productImages: ['imageB1.jpg', 'imageB2.jpg'],
    size: 'M',
    color: 'BLUE',
    rank: 2,
  },
  {
    productName: 'Product3',
    productDescription: 'Eco-friendly gadget with modern features.',
    CategoryId: 3,
    price: 199.99,
    subprice: 180,
    stockQuantity: 15,
    productImages: ['imageC1.jpg', 'imageC2.jpg'],
    size: 'S',
    color: 'GREEN',
    rank: 3,
  },
  {
    productName: 'Product4',
    productDescription: 'Luxury item with advanced technology.',
    CategoryId: 1,
    price: 999.99,
    subprice: 950,
    stockQuantity: 10,
    productImages: ['imageD1.jpg', 'imageD2.jpg'],
    size: 'XL',
    color: 'SILVER',
    rank: 4,
  },
  {
    productName: 'Product5',
    productDescription: 'Casual wear with comfortable fit.',
    CategoryId: 2,
    price: 39.99,
    subprice: 35,
    stockQuantity: 50,
    productImages: ['imageE1.jpg', 'imageE2.jpg'],
    size: 'L',
    color: 'RED',
    rank: 5,
  },
  {
    productName: 'Product6',
    productDescription: 'Compact and portable accessory.',
    CategoryId: 3,
    price: 89.99,
    subprice: 80,
    stockQuantity: 25,
    productImages: ['imageF1.jpg', 'imageF2.jpg'],
    size: 'M',
    color: 'WHITE',
    rank: 6,
  },
  {
    productName: 'Product7',
    productDescription: 'Smart device with latest features.',
    CategoryId: 1,
    price: 499.99,
    subprice: 450,
    stockQuantity: 12,
    productImages: ['imageG1.jpg', 'imageG2.jpg'],
    size: 'M',
    color: 'GRAY',
    rank: 7,
  },
  {
    productName: 'Product8',
    productDescription: 'Stylish and durable footwear.',
    CategoryId: 2,
    price: 79.99,
    subprice: 70,
    stockQuantity: 30,
    productImages: ['imageH1.jpg', 'imageH2.jpg'],
    size: '8',
    color: 'BROWN',
    rank: 8,
  },
  {
    productName: 'Product9',
    productDescription: 'High-performance gadget for professionals.',
    CategoryId: 3,
    price: 299.99,
    subprice: 275,
    stockQuantity: 18,
    productImages: ['imageI1.jpg', 'imageI2.jpg'],
    size: 'S',
    color: 'BLACK',
    rank: 9,
  },
  {
    productName: 'Product10',
    productDescription: 'Elegant and versatile accessory.',
    CategoryId: 1,
    price: 149.99,
    subprice: 130,
    stockQuantity: 22,
    productImages: ['imageJ1.jpg', 'imageJ2.jpg'],
    size: 'L',
    color: 'GOLD',
    rank: 10,
  },
  {
    productName: 'Product11',
    productDescription: 'Lightweight and breathable fabric.',
    CategoryId: 2,
    price: 29.99,
    subprice: 25,
    stockQuantity: 60,
    productImages: ['imageK1.jpg', 'imageK2.jpg'],
    size: 'M',
    color: 'GREEN',
    rank: 11,
  },
  {
    productName: 'Product12',
    productDescription: 'Innovative tool for modern needs.',
    CategoryId: 3,
    price: 159.99,
    subprice: 140,
    stockQuantity: 20,
    productImages: ['imageL1.jpg', 'imageL2.jpg'],
    size: 'L',
    color: 'BLUE',
    rank: 12,
  },
  {
    productName: 'Product13',
    productDescription: 'Advanced tech product with sleek design.',
    CategoryId: 1,
    price: 349.99,
    subprice: 320,
    stockQuantity: 14,
    productImages: ['imageM1.jpg', 'imageM2.jpg'],
    size: 'S',
    color: 'SILVER',
    rank: 13,
  },
  {
    productName: 'Product14',
    productDescription: 'Fashionable item with premium quality.',
    CategoryId: 2,
    price: 89.99,
    subprice: 75,
    stockQuantity: 45,
    productImages: ['imageN1.jpg', 'imageN2.jpg'],
    size: 'XL',
    color: 'PURPLE',
    rank: 14,
  },
  {
    productName: 'Product15',
    productDescription: 'Portable and versatile gadget.',
    CategoryId: 3,
    price: 219.99,
    subprice: 200,
    stockQuantity: 17,
    productImages: ['imageO1.jpg', 'imageO2.jpg'],
    size: 'M',
    color: 'RED',
    rank: 15,
  },
  {
    productName: 'Product16',
    productDescription: 'High-quality accessory with stylish finish.',
    CategoryId: 1,
    price: 399.99,
    subprice: 370,
    stockQuantity: 11,
    productImages: ['imageP1.jpg', 'imageP2.jpg'],
    size: 'M',
    color: 'BLACK',
    rank: 16,
  },
  {
    productName: 'Product17',
    productDescription: 'Elegant and comfortable clothing item.',
    CategoryId: 2,
    price: 69.99,
    subprice: 60,
    stockQuantity: 40,
    productImages: ['imageQ1.jpg', 'imageQ2.jpg'],
    size: 'L',
    color: 'ORANGE',
    rank: 17,
  },
  {
    productName: 'Product18',
    productDescription: 'Tech gadget with cutting-edge features.',
    CategoryId: 3,
    price: 249.99,
    subprice: 230,
    stockQuantity: 21,
    productImages: ['imageR1.jpg', 'imageR2.jpg'],
    size: 'S',
    color: 'WHITE',
    rank: 18,
  },
  {
    productName: 'Product19',
    productDescription: 'Versatile and durable product for daily use.',
    CategoryId: 1,
    price: 159.99,
    subprice: 140,
    stockQuantity: 24,
    productImages: ['imageS1.jpg', 'imageS2.jpg'],
    size: 'L',
    color: 'GREY',
    rank: 19,
  },
  {
    productName: 'Product20',
    productDescription: 'Stylish and functional accessory.',
    CategoryId: 2,
    price: 49.99,
    subprice: 45,
    stockQuantity: 55,
    productImages: ['imageT1.jpg', 'imageT2.jpg'],
    size: 'S',
    color: 'PINK',
    rank: 20,
  }
];




Product.sync()
  .then(() => {
    // return Product.bulkCreate(products);
    console.log('Product table has been created, if it did not already exist.');
  })
  .catch((error) => {
    console.error('Error creating Product table:', error.message);
  });

module.exports = Product;
