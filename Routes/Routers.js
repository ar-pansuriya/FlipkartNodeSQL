const express = require('express');
const { getAllCategories,
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
    deleteOrders,
    isGoogleEnable,
    getAdminDetail,
    updateAdminDetail, 
    phonepePayment,
    paymentStatus} = require('../Controller/Controller');
    

const authenticateJWT = require('../Middleware/auth');
const router = express.Router();

router.get('/categories', getAllCategories);
router.get('/products',getAllProducts);
router.get('/category/:categoryId',getAllProductsByCategory);
router.get('/products/:productId',getProductDetail);
router.post('/products',authenticateJWT,postProduct);
router.get('/testing',testing)
router.put('/products/:productId',authenticateJWT,editProduct);
router.delete('/products/:productId',authenticateJWT,deleteProduct);
router.post('/orders',postOrders);
router.get('/orders',authenticateJWT,getOrders)
router.post('/admin/login',adminLogin)
router.delete('/orders',authenticateJWT,deleteOrders)
router.get('/isGoogleEnable', isGoogleEnable);
router.get('/adminDetail', getAdminDetail);
router.put('/admin/:adminId', updateAdminDetail);
router.post('/payment', phonepePayment);
router.post('/paymentStatus',paymentStatus);






module.exports = router;