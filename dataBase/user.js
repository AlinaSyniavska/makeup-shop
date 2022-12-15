const {Schema, model} = require('mongoose');

const {genderEnum} = require("../constants");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: Object.values(genderEnum),
        required: true,
    },
    phone: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    favoriteList: [{ type: Schema.Types.ObjectId, ref: 'product' }],

}, {timestamps: true});

module.exports = model('user', UserSchema);
