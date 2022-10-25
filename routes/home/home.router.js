const homeRouter = require('express').Router();

const {productController} = require("../../controllers");
const {commonMiddleware, adminCommonMiddleware} = require("../../middlewares");
const {queryValidator} = require("../../validators");
const {Product} = require("../../dataBase");
//  /home?sortOrder=5
homeRouter.get('/',
    commonMiddleware.isDataValid(queryValidator.allProductsValidator, 'query'),
    productController.getAllProducts);
homeRouter.get('/product/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemPresent(Product),
    productController.getProductById);

module.exports = homeRouter;
