const {Schema, model} = require('mongoose');

const {cartStatusEnum} = require("../constants");


const productOrdered = {
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: false
    }
};

const CartSchema = new Schema({
    products: [productOrdered],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        required: true,
        default: cartStatusEnum.IN_PROGRESS,
        enum: Object.values(cartStatusEnum)
    },
    sum: {
        type: Number,
        required: true,
        default: 0
    }

}, {timestamps: true});

module.exports = model('cart', CartSchema);


