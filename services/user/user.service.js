const {User} = require("../../dataBase");

module.exports = {
    findAll: (params = {}) => {
        return User.find(params);
    },

    findOne: (params = {}) => {
        return User.findOne(params);
    },

    createOne: (user) => {
        return User.create(user);
    },

    updateOne: (params = {}, userData, options = {new: true}) => {
        return User.findOneAndUpdate(params, userData, options);
    },

    updateFavoriteList: async (params = {}, userData, options = {new: true}) => {
        await User.updateOne(params, { $unset: { favoriteList: 1 } }, options);
        return User.findOneAndUpdate(params, userData, options);
    },

    deleteOne: (params = {}) => {
        return User.deleteOne(params);
    },
}
