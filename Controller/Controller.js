const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const Category = require("../Model/Category");
const Product = require("../Model/Product");
const upload = require('../Config/multerConfig');
const Order = require('../Model/order');


const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ data: categories, message: 'Categories fetched', success: true });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const postProduct = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: err.message, success: false });
        } else if (err) {
            return res.status(500).json({ message: err.message, success: false });
        }

        // Retrieve form data from req.body
        const { productName, productDescription, CategoryId, price, subprice, stockQuantity, size, color, rank } = req.body;
        // Construct array of uploaded file URLs
        const files = req.files;
        // const baseUrl = `http://localhost:${process.env.PORT || 3000}/ProductImages/`;
        const uploadedFiles = files.map(file => '/ProductImages/' + file.filename);

        try {
            // Save product data to database
            const newProduct = await Product.create({
                productName,
                productDescription,
                CategoryId,
                price,
                subprice,
                stockQuantity,
                productImages: uploadedFiles,
                size,
                color,
                rank
            });

            res.status(200).json({
                message: 'Product saved successfully!',
                data: newProduct,
                success: true
            });
        } catch (error) {
            res.status(500).json({ message: error.message, success: false });
        }
    });
}

const editProduct = async (req, res) => {
    console.log('pppp');
    const { productId } = req.params;
    const updateData = req.body;
    console.log(productId, updateData);
    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false });
        }

        Object.assign(product, updateData);

        await product.save();

        res.status(200).json({
            message: 'Product updated successfully!',
            success: true,
            product // Return the updated product data
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}


const postOrders = async (req, res) => {
    try {
        const order = await Order.create(req.body)
        if (!order) {
            return res.status(404).json({ success: false, message: "Not Insert" })
        }
        res.status(200).json({ success: true, message: "Insert", data: order.toJSON() })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// with first sort by rank and then in 10 datas for pagination
const getAllProducts = async (req, res) => {
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


        if (products.length == 0) return res.status(404).json({ success: false, message: "Not Founded" })

        res.status(200).json({ success: true, message: "Products Founded", data: products })
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const getProductDetail = async (req, res) => {
    try {
        const id = req.params.productId;
        const products = await Product.findByPk(id);
        if (!products) return res.status(404).json({ success: false, message: "Produc Not Founded" })
        res.status(200).json({ success: true, message: "Products Founded", data: products })
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findOne({ where: { productId: id } });
        if (!product) return res.status(404).json({ success: false, message: "Not Founded" });
        // Delete product images from the file system

        const imagePaths = product.productImages;
        imagePaths.forEach(imagePath => {
            const fullPath = path.join(__dirname, '..', imagePath);
            fs.unlink(fullPath, err => {
                if (err) {
                    console.error(`Error deleting file ${imagePath}:`, err);
                }
            });
        });
        const products = await Product.destroy({ where: { productId: id } });
        res.status(200).json({ success: true, message: "Products Deleted", data: products })
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const testing = async (req, res) => {
    try {
        const id = req.params.productId;
        const products = await Product.findByPk(1);
        process.exit(1)
        if (!products) return res.status(404).json({ success: false, message: "Produc Not Founded" })
        res.status(200).json({ success: true, message: "Products Founded", data: products })
    } catch (error) {
        process.exit(1)
    }
}

const getAllProductsByCategory = async (req, res) => {
    try {
        const id = req.params.categoryId
        const category = await Category.findByPk(id);

        const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;

        if (pageNumber < 1 || pageSize < 1) {
            return res.status(400).json({ error: 'Invalid page number or page size' });
        }

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" })
        }

        const products = await Product.findAll({
            where: {
                CategoryId: category.id
            },
            limit: pageSize,
            offset: (pageNumber - 1) * pageSize,
        });

        if (products.length == 0) {
            return res.status(404).json({ success: false, message: "products not found" })
        }
        res.status(200).json({ success: true, message: "Products Founded", data: products })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
        console.error('Error fetching category and products:', error);
    }
}


const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        if (orders.length == 0) return res.status(404).json({ message: 'Not Founded', success: true });
        res.status(200).json({ data: orders, message: 'orders fetched', success: true });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}


const adminLogin = async (req, res) => {

    try {
        const users = { username: 'Admin@123', password: 'Str0ngP@ssw0rd!' }
        const { username, password } = req.body;


        if (username === users.username && password === users.password) {
            const accessToken = jwt.sign({ username: users.username, password: users.password }, "Str0ngP@ssw0rd!", { expiresIn: '30m' });
            res.status(200).json({ token: accessToken, message: "User is Valid", success: true });
        }
        else {
            res.status(404).json({ message: 'Username or password incorrect', success: false })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const deleteOrders = async (req, res) => {
    try {
        const orders = await Order.destroy({
            where: {}, // No condition, deletes all rows
            truncate: true // This option can be used to reset the auto-increment value
        });
        console.log(orders)
        if (orders) return res.status(404).json({ message: "Not Founded" });
        res.status(200).json({ message: "Order Deleted" })
    } catch (error) {
        console.error('Error fetching Order:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    getAllCategories,
    postProduct,
    editProduct,
    getAllProducts,
    getProductDetail,
    deleteProduct,
    getAllProductsByCategory,
    postOrders,
    getOrders,
    adminLogin,
    deleteOrders,
    testing
}