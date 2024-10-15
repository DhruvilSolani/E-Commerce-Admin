const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const app = express();

app.use(express.json());
app.use(cors());

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// User registration
app.post("/register", async (req, resp) => {
    let users = new User(req.body);
    let result = await users.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, (err, token) => {
        if (err) {
            resp.send({ result: 'Something went wrong, please try after some time!' });
        }
        resp.send({ result, auth: token });
    });
});

// User login
app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: 'Something went wrong, please try after some time!' });
                }
                resp.send({ user, auth: token });
            });
        } else {
            resp.send({ result: 'Email or password is incorrect!' });
        }
    } else {
        resp.send({ result: 'User not found' });
    }
});

// Add product with image upload
app.post("/add-product", upload.single('image'), async (req, resp) => {
    const { name, price, category, subcategory, company } = req.body;
    const image = req.file ? req.file.filename : null;

    let product = new Product({
        name,
        price,
        category,
        subcategory,
        company,
        image
    });

    let result = await product.save();
    resp.send(result);
});

// Get all products
app.get("/products", async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No products found" });
    }
});

// Delete product by ID
app.delete("/product/:id", async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

// Get product by ID
app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No Record Found" });
    }
});

// Update product by ID with image upload support
app.put("/product/:id", upload.single('image'), async (req, resp) => {
    const { name, price, category, subcategory, company } = req.body;
    const image = req.file ? req.file.filename : null;

    const updatedData = {
        name,
        price,
        category,
        subcategory,
        company,
        ...(image && { image }) // Only include image if it is uploaded
    };

    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: updatedData }
    );
    resp.send(result);
});

// Search for products
app.get("/search/:key", async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key, $options: 'i' } },
            { price: { $regex: req.params.key, $options: 'i' } },
            { category: { $regex: req.params.key, $options: 'i' } },
            { subcategory: { $regex: req.params.key, $options: 'i' } },
            { company: { $regex: req.params.key, $options: 'i' } }
        ]
    });
    resp.send(result);
});

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
