const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        maxLength: 500
        },
    category:{
        type:String,
        required: true,
        enum: ['electronics', 'food', 'clothing', 'furniture', 'other']
    },
    price:{
        type: Number,
        min: 0.1,
        required: true
    },
    quantity:{
        type: Number,
        min:0,
        required: true
    }
},{timestamps: true})

const Product = mongoose.model('Product', productSchema)


module.exports = Product