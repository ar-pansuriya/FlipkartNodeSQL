const Category = require("../Model/Category");
const Order = require("../Model/order");
const Product = require("../Model/Product");


const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ data: categories, message: 'Categories fetched', success: true });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




const postCategories=async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        console.log('New user created:', product.toJSON());
        if(!product)
        {
         return  res.json({success:false,message:"Not Insert",statusCode:400})
        }
        res.json({success:true,message:"Insert",statusCode:200,data:product.toJSON()})

      } catch (error) {
        res.json({success:false,message:error.message,statusCode:400})
      }
}


const postOrders=async(req,res)=>{
    try {
        const order = await Order.create(req.body)
        console.log('New order created:', order.toJSON());
        if(!order)
        {
         return  res.json({success:false,message:"Not Insert",statusCode:400})
        }
        res.json({success:true,message:"Insert",statusCode:200,data:order.toJSON()})

      } catch (error) {
        res.json({success:false,message:error.message,statusCode:400})
      }
}

const getAllProducts = async (req, res) => {
    try {
        const Product1 = await Product.findAll();
        res.status(200).json({ data: Product1, message: 'Product fetched', success: true });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal server error',success: false,error:error.message });
    }
}


module.exports = {
    getAllCategories,
    postCategories,
    getAllProducts,
    postOrders
}