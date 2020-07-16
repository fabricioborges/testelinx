const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: Number,
    name: String,
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);