const { Schema, model } = require('mongoose');

const ProductTypeSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        set: capitalize,
    },
}, {timestamps: true});

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.substring(1);
}

module.exports = model('productType', ProductTypeSchema);

