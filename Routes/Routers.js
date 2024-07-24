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
    testing,
    deleteOrders } = require('../Controller/Controller');
const authenticateJWT = require('../Middleware/auth');
const router = express.Router();


router.get('/categories', getAllCategories);
router.get('/products', authenticateJWT,getAllProducts);
// router.get('/product',AllProducts)
router.get('/category/:categoryId',getAllProductsByCategory);
router.get('/products/:productId',getProductDetail);
router.post('/products',authenticateJWT,postProduct);
router.get('/testing',testing)
router.put('/products/:productId',authenticateJWT,editProduct);
router.delete('/products/:productId',authenticateJWT,deleteProduct);
router.post('/orders',authenticateJWT,postOrders);
router.get('/orders',authenticateJWT,getOrders)
router.post('/admin/login',adminLogin)
router.delete('/orders',authenticateJWT,deleteOrders)






module.exports = router;