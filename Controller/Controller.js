const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const Category = require("../Model/Category");
const Product = require("../Model/Product");
const upload = require('../Config/multerConfig');
const AdminDetail = require('../Model/Admin');
const Order = require('../Model/order');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const axios = require('axios');


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
    console.log(req.body);
    try {
        const order = await Order.create(req.body)
        if (!order) {
            return res.status(404).json({ success: false, message: "Not Insert" })
        }
        res.status(200).json({ success: true, message: "Insert", data: order.toJSON() })

    } catch (error) {
        console.log(error.message);
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

        const totalResult = await Product.findAll({
            order: [['rank', 'ASC']],
        });
        if (products.length == 0) return res.status(404).json({ success: false, message: "Not Founded" })

        res.status(200).json({ success: true, message: "Products Founded", data: products, totalResult: totalResult.length })
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
        const totalResult = await Product.findAll({
            where: {
                CategoryId: category.id
            },
        });
        if (products.length == 0) {
            return res.status(404).json({ success: false, message: "products not found" })
        }
        res.status(200).json({ success: true, message: "Products Founded", data: products, totalResult: totalResult.length })
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

const isGoogleEnable = async (req, res) => {
    try {
        // Replace 'admin1' with the actual username you're looking for
        const adminDetail = await AdminDetail.findOne({ where: { username: 'Admin@123' } });
        if (adminDetail) {
            res.status(200).json({
                message: 'Data fetched',
                success: true,
                isGoogleEnabled: adminDetail.isGoogleEnabled,
                upi: adminDetail.upi
            });
        } else {
            res.status(404).json({ message: 'Admin not found', success: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message, success: false });
    }
}

const getAdminDetail = async (req, res) => {
    try {
        // Replace 'admin1' with the actual username you're looking for
        const { adminId, isGoogleEnabled, facebookPixelId, googlePixelId, username, upi, marchantId, keyIndex, PhonePayAPIKey } = await AdminDetail.findOne({ where: { adminId: 1 } });
        if (adminId) {
            res.status(200).json({
                message: 'Data fetched',
                success: true,
                adminId, isGoogleEnabled, facebookPixelId, googlePixelId, username, upi, marchantId, keyIndex, PhonePayAPIKey
            });
        } else {
            res.status(404).json({ message: 'Admin not found', success: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message, success: false });
    }
}

const updateAdminDetail = async (req, res) => {
    const { adminId } = req.params;
    const { isGoogleEnabled, facebookPixelId, googlePixelId, username, upi, marchantId, keyIndex, PhonePayAPIKey } = req.body;

    try {
        if (!adminId) return res.status(400).json({ message: 'Admin ID is required', success: false });

        const adminDetail = await AdminDetail.findByPk(adminId);
        if (!adminDetail) return res.status(404).json({ message: 'Admin not found', success: false });

        await adminDetail.update({
            isGoogleEnabled: isGoogleEnabled ?? adminDetail.isGoogleEnabled,
            facebookPixelId: facebookPixelId ?? adminDetail.facebookPixelId,
            googlePixelId: googlePixelId ?? adminDetail.googlePixelId,
            username: username ?? adminDetail.username,
            upi: upi ?? adminDetail.upi,
            marchantId: marchantId ?? adminDetail.marchantId,
            keyIndex: keyIndex ?? adminDetail.keyIndex,
            PhonePayAPIKey: PhonePayAPIKey ?? adminDetail.PhonePayAPIKey
        });

        res.status(200).json({
            message: 'Admin details updated successfully',
            success: true,
            adminId, isGoogleEnabled: adminDetail.isGoogleEnabled, facebookPixelId: adminDetail.facebookPixelId, googlePixelId: adminDetail.googlePixelId, username: adminDetail.username, upi: adminDetail.upi, marchantId: adminDetail.marchantId,
            keyIndex: adminDetail.keyIndex,
            PhonePayAPIKey: adminDetail.PhonePayAPIKey
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'An error occurred', error: error.message, success: false });
    }
};

const phonepePayment = async (req, res) => {
    const { uniqueOrderId } = req.body;

    const order = await Order.findOne({
        where: { uniqueOrderId },
    });

    if (!order) throw new Error('Order not found');

    const { dataValues } = order;

    const {marchantId, keyIndex, PhonePayAPIKey } = await AdminDetail.findOne({ where: { adminId: 1 } });

    const transactionid = "Tr-" + uuidv4().slice(-6);

    const payload = {
        merchantId:marchantId,// for testing PGTESTPAYUAT86
        merchantTransactionId: transactionid,
        // merchantUserId: 'MUID-' + uuidv4().slice(-6),
        name: dataValues.customerDetail.fullName,
        amount: dataValues.totalAmount * 100,
        redirectUrl: `${process.env.BACKEND_URL}/api/paymentStatus?transactionid=${transactionid}&uniqueOrderId=${uniqueOrderId}`,
        redirectMode: "POST",
        mobileNumber: dataValues.customerDetail.phoneNumber,
        paymentInstrument: {
            type: "PAY_PAGE",
        },
    };

    const dataPayload = JSON.stringify(payload);
    dataBase64 = Buffer.from(dataPayload).toString('base64');
    const fullURL = dataBase64 + '/pg/v1/pay' + PhonePayAPIKey; //for testing 96434309-7796-489d-8924-ab56988a6076 api key or salt key
    const dataSha256 = crypto.createHash('sha256').update(fullURL).digest('hex');

    const checksum = `${dataSha256}###${keyIndex}`;

    try {
        const PAY_API_URL = process.env.PHONE_PAY_API_URL;

        const option = {
            method: 'POST',
            url: PAY_API_URL,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
            },
            data: {
                request: dataBase64
            }
        }
        const response = await axios(option)
        const url = response.data.data.instrumentResponse.redirectInfo.url
        res.status(200).json({ message: 'Successfull', url, success: true });
    } catch (error) {
        console.error('Payment initiation failed:', error);
        res.status(500).json({ error: 'Payment initiation failed' });
    }
}


const paymentStatus = async (req, res) => {
    try {
        const frontendUrl = process.env.FRONTEND_URL;
        const { transactionid, uniqueOrderId } = req.query;
        console.log(`Transaction ID from query: ${transactionid}`);

        // Fetch admin details
        const adminDetails = await AdminDetail.findOne({ where: { adminId: 1 } });
        if (!adminDetails) {
            throw new Error('Admin details not found');
        }
        const { PhonePayAPIKey, keyIndex,marchantId } = adminDetails;
        const merchantId = marchantId; // Testing merchant ID

        // Create the string to be hashed
        const stringToHash = `/pg/v1/status/${merchantId}/${transactionid}${PhonePayAPIKey}`;
        const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
        const checksum = `${sha256}###${keyIndex}`;
        console.log(`Generated Checksum: ${checksum}`);

        // Construct the URL
        const url = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionid}`;

        // Options for the request
        const options = {
            method: 'GET',
            url: url,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
                'X-MERCHANT-ID': merchantId
            },
        };

        // Make the request to PhonePe API
        console.log('Making API request to PhonePe...');
        const { data } = await axios(options);
        console.log('Response from PhonePe:', data);
        // Determine the status from the PhonePe response
        const orderStatus = data.success ? data.data.state : 'FAILED';
        const paymentMode = data.success ? data.data.paymentInstrument.type : null;

        // Update the order status in the database
        const updateResult = await Order.update(
            {
                paymentStatus: orderStatus,
                paymentMode: paymentMode
            },
            { where: { uniqueOrderId } }
        );

        if (updateResult[0] === 0) {
            throw new Error('Order not found or update failed');
        }
        // Redirect to the frontend with the payment status
        return res.redirect(`${frontendUrl}?status=${orderStatus}`);

    } catch (error) {
        console.error('Error occurred during payment status check:', error.message);
        return res.redirect(`${frontendUrl}?status=FAILED`);
    }
};


module.exports = {
    getAllCategories,
    postProduct,
    editProduct,
    paymentStatus,
    getAllProducts,
    getProductDetail,
    deleteProduct,
    getAllProductsByCategory,
    postOrders,
    getOrders,
    adminLogin,
    phonepePayment,
    deleteOrders,
    testing,
    isGoogleEnable,
    getAdminDetail,
    updateAdminDetail
}