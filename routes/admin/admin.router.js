const adminRouter = require('express').Router();

const {Brand, Category, ProductType, Product} = require("../../dataBase");
const {adminController, adminProductController} = require("../../controllers");
const {adminCommonMiddleware, commonMiddleware} = require("../../middlewares");
const {adminCommonValidator, productQueryValidator, adminProductValidator} = require("../../validators");

// /brand
adminRouter.get('/brand',
    adminController.getAllBrands);
adminRouter.post('/brand',
    adminCommonMiddleware.isItemValid(adminCommonValidator.newDataValidator),
    adminCommonMiddleware.isItemUniq(Brand),
    adminController.createBrand);

adminRouter.get('/brand/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemPresent(Brand),
    adminController.getBrandById);
adminRouter.put('/brand/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemValid(adminCommonValidator.updateDataValidator),
    adminCommonMiddleware.isItemPresent(Brand),
    adminController.updateBrand);
adminRouter.delete('/brand/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemPresent(Brand),
    adminController.deleteBrand);

// /category
adminRouter.get('/category',
    adminController.getAllCategories);
adminRouter.post('/category',
    adminCommonMiddleware.isItemValid(adminCommonValidator.newDataValidator),
    adminCommonMiddleware.isItemUniq(Category),
    adminController.createCategory);

adminRouter.get('/category/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemPresent(Category),
    adminController.getCategoryById);
adminRouter.put('/category/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemValid(adminCommonValidator.updateDataValidator),
    adminCommonMiddleware.isItemPresent(Category),
    adminController.updateCategory);
adminRouter.delete('/category/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemPresent(Category),
    adminController.deleteCategory);

// /productType
adminRouter.get('/productType',
    adminController.getAllProductTypes);
adminRouter.post('/productType',
    adminCommonMiddleware.isItemValid(adminCommonValidator.newDataValidator),
    adminCommonMiddleware.isItemUniq(ProductType),
    adminController.createProductType);

adminRouter.get('/productType/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemPresent(ProductType),
    adminController.getProductTypeById);
adminRouter.put('/productType/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemValid(adminCommonValidator.updateDataValidator),
    adminCommonMiddleware.isItemPresent(ProductType),
    adminController.updateProductType);
adminRouter.delete('/productType/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemPresent(ProductType),
    adminController.deleteProductType);

// /product
adminRouter.get('/product',
    adminCommonMiddleware.isItemValid(productQueryValidator.allProductsValidator, 'query'),
    adminProductController.getAllProducts);
adminRouter.post('/product',
    adminCommonMiddleware.isItemValid(adminProductValidator.newProductValidator),
    adminCommonMiddleware.isItemUniq(Product),
    adminProductController.createProduct);
adminRouter.get('/product/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemPresent(Product),
    adminProductController.getProductById);
adminRouter.put('/product/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemValid(adminProductValidator.updateProductValidator),
    adminCommonMiddleware.isItemPresent(Product),
    adminProductController.updateProduct);
adminRouter.delete('/product/:id',
    commonMiddleware.isIdValid,
    adminCommonMiddleware.isItemPresent(Product),
    adminProductController.deleteProduct);

module.exports = adminRouter;
