const {Schema, model} = require('mongoose');


const productLiked = {
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
    products: [productLiked],


}, {timestamps: true});

module.exports = model('userWishList', UserWishListSchema);
