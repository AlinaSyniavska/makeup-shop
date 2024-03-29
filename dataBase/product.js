const { Schema, model } = require('mongoose');

const { priceSignEnum } = require("../constants");

const ProductSchema = new Schema({
    brand: {
        type: String,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    priceSign: {
        type: String,
        trim: true,
        enum: Object.values(priceSignEnum),
        required: true,
    },
    total: {
        type: Number,
        trim: true,
        required: true,
    },
    imageLink: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
    },
    category: {
        type: String,
        trim: true,
        required: true,
    },
    productType: {
        type: String,
        trim: true,
        required: true,
    },
    tagList: {
        type: [String],
    },
}, {timestamps: true});

module.exports = model('product', ProductSchema);
