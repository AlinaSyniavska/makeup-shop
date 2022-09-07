const {authValidator} = require("../../validators");
const {CustomError} = require("../../errors");
const {userService, tokenService} = require("../../services");
const {config} = require("../../configs");
const {OAuth, ActionToken} = require("../../dataBase");
const {tokenTypeEnum} = require("../../constants");

module.exports = {
    isLoginBodyValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.login.validate(req.body);

            if (error) {
                return next(new CustomError('Wrong email or password'));
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresentForAuth: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await userService.findOne({email});

            if (!userByEmail) {
                // return next(new CustomError(`User with id ${email} not found`, 404));
                return next(new CustomError('Wrong email or password'));
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get(config.AUTHORIZATION);

            console.log(req.body)

            if (!accessToken) {
                return next(new CustomError('No token', 401));
            }

            tokenService.checkToken(accessToken);

            const tokenInfo = await OAuth.findOne({access_token: accessToken}).populate('userId');

            if (!tokenInfo) {
                // return next(new CustomError('No token', 401));
                return next(new CustomError('Token not valid', 401));
            }

            req.access_token = tokenInfo.access_token;
            req.user = tokenInfo.userId;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get(config.AUTHORIZATION);

            if (!refreshToken) {
                return next(new CustomError('No token', 401));
            }

            tokenService.checkToken(refreshToken, tokenTypeEnum.REFRESH);

            const tokenInfo = await OAuth.findOne({refresh_token: refreshToken});

            if (!tokenInfo) {
                // return next(new CustomError('No token', 401));
                return next(new CustomError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },


    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const actionToken = req.get(config.AUTHORIZATION);

            if (!actionToken) {
                return next(new CustomError('No token', 401));
            }

            tokenService.checkActionTypeToken(actionToken, actionType);

            const tokenInfo = await ActionToken.findOne({token: actionToken}).populate('userId');

            if(!tokenInfo){
                return next(new CustomError('Token not valid', 401));
            }

            req.user = tokenInfo.userId;

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.forgotPassword.validate(req.body);

            if (error) {
                return next(new CustomError('Wrong email'));
            }

            res.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
};
