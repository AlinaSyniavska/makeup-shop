const cartRouter = require('express').Router();

const {cartController} = require("../../controllers");
const {commonMiddleware, cartMiddleware, authMiddleware} = require("../../middlewares");
const {cartValidator} = require("../../validators");

cartRouter.post('/',
    commonMiddleware.isDataValid(cartValidator.productOrderValidator),
    cartMiddleware.isIdsValid,
    authMiddleware.checkAccessToken,
    cartMiddleware.isProductPresent,
    cartMiddleware.isProductAvailable,
    cartController.create);

module.exports = cartRouter;
