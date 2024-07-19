const express = require('express');
const { getAllCategories,postCategories,getAllProducts,postOrders } = require('../Controller/Controller');
const router = express.Router();

// GET /categories - Retrieve all categories
router.get('/categories', getAllCategories);

router.post('/products',postCategories)

router.post('/order',postOrders)

router.get('/products', getAllProducts);



module.exports = router;