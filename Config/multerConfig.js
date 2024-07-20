const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../ProductImages');
    
    // Create directory if it does not exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const productName = req.body.productName || 'default';
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname).toLowerCase();
    const fileName = `${uniqueSuffix}-${productName}${ext}`;
    const filePath = path.join(__dirname, '../ProductImages', fileName);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      cb(new Error('File already exists!'));
    } else {
      cb(null, fileName);
    }
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const mimetype = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB limit
  fileFilter: fileFilter
}).array('files', 5); // Adjust the limit as needed

module.exports = upload;
