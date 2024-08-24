const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uniqueOrderId:{
    type:DataTypes.STRING,
    allowNull:false
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerDetail: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  paymentStatus:{
    type:DataTypes.STRING,
    allowNull:true
  },
  paymentMode:{
    type:DataTypes.STRING,
    allowNull:true
  }
});


Order.sync()
  .then(() => {
    console.log('Order table has been created, if it did not already exist.');
    // const orders = [
    //     {
    //       productId: 6,
    //       pricePerUnit: 122,
    //       quantity: 1,
    //       totalAmount: 100,
    //       address: { zip: '62701', city: 'Springfield', state: 'IL', street: '123 Main St' },
    //       customerName: 'John',
    //       phoneNumber: '555-123-4567',
    //     },
    //     {
    //       productId: 7,
    //       pricePerUnit: 122,
    //       quantity: 2,
    //       totalAmount: 200,
    //       address: { zip: '62701', city: 'Springfield', state: 'IL', street: '124 Main St' },
    //       customerName: 'Jane',
    //       phoneNumber: '555-234-5678',
    //     },
    //     {
    //       productId: 8,
    //       pricePerUnit: 122,
    //       quantity: 3,
    //       totalAmount: 300,
    //       address: { zip: '62702', city: 'Springfield', state: 'IL', street: '125 Main St' },
    //       customerName: 'Alice',
    //       phoneNumber: '555-345-6789',
    //     },
    //     {
    //       productId: 9,
    //       pricePerUnit: 122,
    //       quantity: 4,
    //       totalAmount: 400,
    //       address: { zip: '62703', city: 'Springfield', state: 'IL', street: '126 Main St' },
    //       customerName: 'Bob',
    //       phoneNumber: '555-456-7890',
    //     },
    //     {
    //       productId: 10,
    //       pricePerUnit: 122,
    //       quantity: 5,
    //       totalAmount: 500,
    //       address: { zip: '62704', city: 'Springfield', state: 'IL', street: '127 Main St' },
    //       customerName: 'Charlie',
    //       phoneNumber: '555-567-8901',
    //     },
    //     // Repeat similar entries with different productId values
    //     {
    //       productId: 6,
    //       pricePerUnit: 122,
    //       quantity: 2,
    //       totalAmount: 244,
    //       address: { zip: '62705', city: 'Springfield', state: 'IL', street: '128 Main St' },
    //       customerName: 'David',
    //       phoneNumber: '555-678-9012',
    //     },
    //     {
    //       productId: 7,
    //       pricePerUnit: 122,
    //       quantity: 1,
    //       totalAmount: 122,
    //       address: { zip: '62706', city: 'Springfield', state: 'IL', street: '129 Main St' },
    //       customerName: 'Eva',
    //       phoneNumber: '555-789-0123',
    //     },
    //     {
    //       productId: 8,
    //       pricePerUnit: 122,
    //       quantity: 3,
    //       totalAmount: 366,
    //       address: { zip: '62707', city: 'Springfield', state: 'IL', street: '130 Main St' },
    //       customerName: 'Frank',
    //       phoneNumber: '555-890-1234',
    //     },
    //     {
    //       productId: 9,
    //       pricePerUnit: 122,
    //       quantity: 2,
    //       totalAmount: 244,
    //       address: { zip: '62708', city: 'Springfield', state: 'IL', street: '131 Main St' },
    //       customerName: 'Grace',
    //       phoneNumber: '555-901-2345',
    //     },
    //     {
    //       productId: 10,
    //       pricePerUnit: 122,
    //       quantity: 4,
    //       totalAmount: 488,
    //       address: { zip: '62709', city: 'Springfield', state: 'IL', street: '132 Main St' },
    //       customerName: 'Hank',
    //       phoneNumber: '555-012-3456',
    //     },
    //     {
    //       productId: 6,
    //       pricePerUnit: 122,
    //       quantity: 1,
    //       totalAmount: 122,
    //       address: { zip: '62710', city: 'Springfield', state: 'IL', street: '133 Main St' },
    //       customerName: 'Ivy',
    //       phoneNumber: '555-123-4568',
    //     },
    //     {
    //       productId: 7,
    //       pricePerUnit: 122,
    //       quantity: 5,
    //       totalAmount: 610,
    //       address: { zip: '62711', city: 'Springfield', state: 'IL', street: '134 Main St' },
    //       customerName: 'Jack',
    //       phoneNumber: '555-234-5679',
    //     },
    //     {
    //       productId: 8,
    //       pricePerUnit: 122,
    //       quantity: 3,
    //       totalAmount: 366,
    //       address: { zip: '62712', city: 'Springfield', state: 'IL', street: '135 Main St' },
    //       customerName: 'Kelly',
    //       phoneNumber: '555-345-6780',
    //     },
    //     {
    //       productId: 9,
    //       pricePerUnit: 122,
    //       quantity: 4,
    //       totalAmount: 488,
    //       address: { zip: '62713', city: 'Springfield', state: 'IL', street: '136 Main St' },
    //       customerName: 'Leo',
    //       phoneNumber: '555-456-7891',
    //     },
    //     {
    //       productId: 10,
    //       pricePerUnit: 122,
    //       quantity: 2,
    //       totalAmount: 244,
    //       address: { zip: '62714', city: 'Springfield', state: 'IL', street: '137 Main St' },
    //       customerName: 'Mia',
    //       phoneNumber: '555-567-8902',
    //     },
    //     {
    //       productId: 6,
    //       pricePerUnit: 122,
    //       quantity: 4,
    //       totalAmount: 488,
    //       address: { zip: '62715', city: 'Springfield', state: 'IL', street: '138 Main St' },
    //       customerName: 'Nick',
    //       phoneNumber: '555-678-9013',
    //     },
    //     {
    //       productId: 7,
    //       pricePerUnit: 122,
    //       quantity: 3,
    //       totalAmount: 366,
    //       address: { zip: '62716', city: 'Springfield', state: 'IL', street: '139 Main St' },
    //       customerName: 'Olivia',
    //       phoneNumber: '555-789-0124',
    //     },
    //   ];
    //   return Order.bulkCreate(orders);
  })
  .catch((error) => {
    console.error('Error creating Order table:', error.message);
  });

module.exports = Order;
