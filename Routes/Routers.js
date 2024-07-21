const express = require('express');
const {  getAllCategories,
    postProduct,
    editProduct,
    getAllProducts,
    getProductDetail,
    deleteProduct,
    getAllProductsByCategory,
    postOrders,
    getOrders,
    adminLogin,
    AllProducts } = require('../Controller/Controller');
const authenticateJWT = require('../Middleware/auth');
const router = express.Router();


router.get('/categories', getAllCategories);

router.get('/products', authenticateJWT,getAllProducts);

// router.get('/product',AllProducts)

router.get('/category/:categoryId',getAllProductsByCategory);

router.get('/products/:productId',getProductDetail);

// router.post('/products',authenticateJWT,postProduct);

// router.put('/products/:productId',authenticateJWT,editProduct);

// router.delete('/products/:productId',authenticateJWT,deleteProduct);

// router.post('/orders',authenticateJWT,postOrders);

// router.get('/orders',authenticateJWT,getOrders)

router.post('/products',postProduct);

router.put('/products/:productId',editProduct);

router.delete('/products/:productId',deleteProduct);

router.post('/orders',postOrders);

router.get('/orders',getOrders)

router.post('/admin/login',adminLogin)






module.exports = router;