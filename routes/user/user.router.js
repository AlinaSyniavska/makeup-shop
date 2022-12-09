const {commonMiddleware, userMiddleware, authMiddleware} = require("../../middlewares");
const {userValidator, queryValidator} = require("../../validators");
const {userController} = require("../../controllers");
const userRouter = require('express').Router();

userRouter.get('/',
    commonMiddleware.isDataValid(queryValidator.allUsersValidator, 'query'),
    userController.getAll);
userRouter.post('/',
    commonMiddleware.isDataValid(userValidator.newUserValidator),
    userMiddleware.isUserUniq,
    userController.create);

userRouter.get('/favoriteList/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getFavoriteListById);

userRouter.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getById);
userRouter.put('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    commonMiddleware.isDataValid(userValidator.updateUserValidator),
    userMiddleware.isUserPresent,
    userController.update);
userRouter.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.delete);

module.exports = userRouter;
