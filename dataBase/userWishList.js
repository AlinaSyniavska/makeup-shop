const {Schema, model} = require('mongoose');

const UserWishListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },


}, {timestamps: true});

module.exports = model('userWishList', UserWishListSchema);
