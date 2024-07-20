const express = require('express');
const { getAllCategories,postProducts,getProductByRank,postOrders,getProductById,deleteProductById,getCategoriesById } = require('../Controller/Controller');
const router = express.Router();

// GET /categories - Retrieve all categories
router.get('/categories', getAllCategories);

router.post('/products',postProducts)

router.post('/order',postOrders)

router.get('/products', getProductByRank);

router.get('/products/:productId',getProductById)

router.delete('/products/:productId',deleteProductById)

router.get('/products/:categoryId',getCategoriesById)


module.exports = router;