const express = require('express');
const { getAllCategories,postProduct, editProduct, getAllProducts, getAllProductsByCategory, getProductDetail, deleteProduct } = require('../Controller/Controller');
const router = express.Router();


router.get('/categories', getAllCategories);

router.get('/products', getAllProducts);

router.get('/category/:categoryId',getAllProductsByCategory);

router.get('/products/:productId',getProductDetail);

router.post('/products',postProduct);

router.put('/products/:productId',editProduct);

router.delete('/products/:productId',deleteProduct);




module.exports = router;