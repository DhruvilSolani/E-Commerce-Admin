const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    company: { type: String, required: true },
    image: { type: String, required: false }
});

module.exports = mongoose.model('products', productSchema);
