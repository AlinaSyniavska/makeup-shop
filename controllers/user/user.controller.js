const {userService, passwordService, emailService} = require("../../services");
const {emailActionEnum} = require("../../constants");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await userService.findAll(req.query).exec();

            res.json({
                data: users,
            });
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const {email, password, name} = req.body;

            const hashPassword = await passwordService.hashPassword(password);
            const newUser = await userService.createOne({...req.body, password: hashPassword});

            res.status(201).json(newUser);

            await emailService.sendMail('alina22syniavska@gmail.com', emailActionEnum.WELCOME, {userName: name, email});
            //   await emailService.sendMail(email, emailActionEnum.WELCOME, { userName: name, email });
        } catch (e) {
            next(e);
        }
    },

    getById: (dataType = 'user') => async (req, res, next) => {
        try {
            const {user} = req;

            if (dataType === 'favorites') {
                res.json(user.favoriteList);
            } else {
                res.json(user);
            }
        } catch (e) {
            next(e);
        }
    },

    getFavoriteListById: async (req, res, next) => {
        try {
            const {user} = req;
            res.json({favoriteList: user.favoriteList});
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const {id} = req.params;
            let updatedUser;

            if (req.body.favoriteList) {
                updatedUser = await userService.updateFavoriteList({_id: id}, req.body);
            } else {
                updatedUser = await userService.updateOne({_id: id}, req.body);
            }

            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const {id} = req.params;
            await userService.deleteOne({_id: id});
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};
