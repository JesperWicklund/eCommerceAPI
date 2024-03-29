const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String, 
    category: String,
    images: [String], 
    createdAt: Date,
    updatedAt: Date,

})
module.exports = mongoose.model('Product', productSchema)

