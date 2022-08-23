const homeRouter = require('express').Router();

const {productController} = require("../../controllers");
const {commonMiddleware} = require("../../middlewares");
const {productQueryValidator} = require("../../validators");
//  /home?sortOrder=5
homeRouter.get('/',
    commonMiddleware.isDataValid(productQueryValidator.allProductsValidator, 'query'),
    productController.getAllProducts);

module.exports = homeRouter;
