const {Schema, model} = require('mongoose');

const CartSchema = new Schema({
    name: {
        type: String,
        required: true,
    },


}, {timestamps: true});

module.exports = model('cart', CartSchema);