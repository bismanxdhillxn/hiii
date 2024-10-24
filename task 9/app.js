const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// Setup multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Store images in the public/images directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({ storage });

// Sample product data
const products = [
    { id: 1, name: 'Product 1', description: 'Description of Product 1', image: 'images/product1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description of Product 2', image: 'images/product2.jpg' },
    { id: 3, name: 'Product 3', description: 'Description of Product 3', image: 'images/product3.jpg' }
];

// Route to display the product catalog
app.get('/', (req, res) => {
    res.render('catalog', { products });
});

// Route to handle image uploads
app.post('/upload', upload.single('productImage'), (req, res) => {
    const { productName, productDescription } = req.body;
    const newProduct = {
        id: products.length + 1,
        name: productName,
        description: productDescription,
        image: `images/${req.file.filename}`
    };
    products.push(newProduct); // Add the new product to the array
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
