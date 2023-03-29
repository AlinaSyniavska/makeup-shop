const { Schema, model } = require('mongoose');

const favorite = {
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
};

const UserWishListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    products: [favorite],


}, {timestamps: true});

module.exports = model('userWishList', UserWishListSchema);
