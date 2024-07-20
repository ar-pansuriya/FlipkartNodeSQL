const express = require('express');
const { getAllCategories,postProducts,getProductByRank,postOrders,getProductById,deleteProductById,getCategoriesById, editProduct } = require('../Controller/Controller');
const router = express.Router();


router.get('/categories', getAllCategories);

router.get('/products', getProductByRank);

router.get('/products/:categoryId',getCategoriesById);

router.get('/products/:productId',getProductById);

router.post('/products',postProducts);

router.put('/products/:productId',editProduct);

router.delete('/products/:productId',deleteProductById);

router.post('/order',postOrders);







module.exports = router;