const homeRouter = require('express').Router();

const {productController} = require("../../controllers");
const {commonMiddleware} = require("../../middlewares");
const {queryValidator} = require("../../validators");
//  /home?sortOrder=5
homeRouter.get('/',
    commonMiddleware.isDataValid(queryValidator.allProductsValidator, 'query'),
    productController.getAllProducts);

module.exports = homeRouter;
