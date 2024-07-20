const Category = require("../Model/Category");
const Order = require("../Model/order");
const Product = require("../Model/Product");


const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ data: categories, message: 'Categories fetched', success: true });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({success:false,message:error.message})
    }
}


const postProducts=async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        console.log('New user created:', product.toJSON());
        if(!product)
        {
         return  res.json({success:false,message:"Not Insert",statusCode:400})
        }
        res.status(200).json({success:true,message:"Insert",data:product.toJSON()})

      } catch (error) {
        res.status(500).json({success:false,message:error.message})
      }
}


const postOrders=async(req,res)=>{
    try {
        const order = await Order.create(req.body)
        console.log('New order created:', order.toJSON());
        if(!order)
        {
         return  res.status(404).json({success:false,message:"Not Insert"})
        }
        res.json({success:true,message:"Insert",statusCode:200,data:order.toJSON()})

      } catch (error) {
        res.status(500).json({success:false,message:error.message})
      }
}

// with first sort by rank and then in 10 datas for pagination
const getProductByRank = async (req, res) => {
    try {
        
        const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10; 
    
        if (pageNumber < 1 || pageSize < 1) {
          return res.status(400).json({ error: 'Invalid page number or page size' });
        }
    
        const products = await Product.findAll({
          order: [['rank', 'ASC']], 
          limit: pageSize, 
          offset: (pageNumber - 1) * pageSize, 
        });
    

        if(products.length==0) return res.status(404).json({success:false,message:"Not Founded"})

        res.status(200).json({success:true,message:"Products Founded",data:products})
      } catch (error) {
        console.error('Error fetching products:', error);
         res.status(500).json({success:false,message:error.message})
      }
}

// get product By productId
const getProductById = async (req, res) => {
    try {
        const id = req.params.productId;
        const products = await Product.findByPk(id);
        if(!products) return res.status(404).json({success:false,message:"Not Founded"})
        res.status(200).json({success:true,message:"Products Founded",data:products})
      } catch (error) {
        console.error('Error fetching products:', error);
         res.status(500).json({success:false,message:error.message})
      }
}

// delete product By productId
const deleteProductById = async (req, res) => {
    try {
        const id = req.params.productId;
        const products = await Product.destroy({where:{productId:id}});
        if(!products) return res.status(404).json({success:false,message:"Not Founded"})
        res.status(200).json({success:true,message:"Products Deleted",data:products})
      } catch (error) {
        console.error('Error fetching products:', error);
         res.status(500).json({success:false,message:error.message})
      }
}


const getCategoriesById=async(req,res)=>{
    try {
        const id=req.params.categoryId
        const category = await Category.findByPk(id);

        const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10; 
    
        if (pageNumber < 1 || pageSize < 1) {
          return res.status(400).json({ error: 'Invalid page number or page size' });
        }
        
        if (!category) {
            return res.status(404).json({success:false,message:"Category not found"})
        }
    
        const products = await Product.findAll({
          where: {
            CategoryId: category.id
          },
          limit: pageSize, 
          offset: (pageNumber - 1) * pageSize, 
        });
    
        if (products.length==0) {
            return res.status(404).json({success:false,message:"products not found"})
        }
        res.status(200).json({success:true,message:"Products Founded",data:products})
      } catch (error) {
        res.status(500).json({success:false,message:error.message})
        console.error('Error fetching category and products:', error);
      }
  }

module.exports = {
    getAllCategories,
    postProducts,
    getProductByRank,
    postOrders,
    getProductById,
    deleteProductById,
    getCategoriesById
}