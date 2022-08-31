const categoryRouter = require('express').Router();

const {commonMiddleware} = require("../../middlewares");
const {productController} = require("../../controllers");
const {productQueryValidator} = require("../../validators");
/*
- /category/cream/face
- /category/cream/body
- /category/eyebrow
- /category/eyeshadow/palette
- /category/eyeshadow/pencil
- /category/eyeshadow/cream
- /category/lipstick/lipstick
- /category/lipstick/lipgloss
- /category/mascara
- /category/powder
*/

categoryRouter.get('/cream/face',
    commonMiddleware.isDataValid(productQueryValidator.allProductsValidator, 'query'),
    productController.getAllProductsByCategory);
categoryRouter.get('/cream/body',
    commonMiddleware.isDataValid(productQueryValidator.allProductsValidator, 'query'),
    productController.getAllProductsByCategory);
categoryRouter.get('/eyebrow',
    commonMiddleware.isDataValid(productQueryValidator.allProductsValidator, 'query'),
    productController.getAllProductsByCategory);
categoryRouter.get('/eyeshadow/palette',
    commonMiddleware.isDataValid(productQueryValidator.allProductsValidator, 'query'),
    productController.getAllProductsByCategory);
categoryRouter.get('/eyeshadow/pencil',
    commonMiddleware.isDataValid(productQueryValidator.allProductsValidator, 'query'),
    productController.getAllProductsByCategory);
categoryRouter.get('/eyeshadow/cream',
    commonMiddleware.isDataValid(productQueryValidator.allProductsValidator, 'query'),
    productController.getAllProductsByCategory);
categoryRouter.get('/lipstick/lipstick',
    commonMiddleware.isDataValid(productQueryValidator.allProductsValidator, 'query'),
    productController.getAllProductsByCategory);
categoryRouter.get('/lipstick/lipgloss',
    commonMiddleware.isDataValid(productQueryValidator.allProductsValidator, 'query'),
    productController.getAllProductsByCategory);
categoryRouter.get('/mascara',
    commonMiddleware.isDataValid(productQueryValidator.allProductsValidator, 'query'),
    productController.getAllProductsByCategory);
categoryRouter.get('/powder',
    commonMiddleware.isDataValid(productQueryValidator.allProductsValidator, 'query'),
    productController.getAllProductsByCategory);

module.exports = categoryRouter;
