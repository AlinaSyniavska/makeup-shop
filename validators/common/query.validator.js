const Joi = require("joi");
const {regexEnum} = require("../../constants");

module.exports = {
    allProductsValidator: Joi.object({
        name: Joi.string().regex(regexEnum.NAME_PRODUCT).trim(true).min(2).max(100),
        brand: Joi.string().regex(regexEnum.NAME_PRODUCT).trim(true).min(2).max(100),
        category: Joi.string().regex(regexEnum.NAME_PRODUCT).trim(true).min(2).max(100),
        productType: Joi.string().regex(regexEnum.NAME_PRODUCT).trim(true).min(2).max(100),

        page: Joi.number().integer().min(1),
        perPage: Joi.number().integer().min(1).max(50),
        // search: Joi.string().alphanum().trim(true),
        // ageGte: Joi.number().integer().min(1).max(120),
        // ageLte: Joi.number().integer().min(1).max(120),
    }),
};