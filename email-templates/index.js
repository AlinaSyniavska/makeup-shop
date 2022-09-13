const {emailActionEnum} = require("../constants");

module.exports = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome on board',
        template: 'welcome'
    },

    [emailActionEnum.FORGOT_PASSWORD]: {
        subject: 'Opps looks like you forgot password',
        template: 'forgot-password'
    },

    [emailActionEnum.ORDER]: {
        subject: 'Your order accepted',
        template: 'order'
    },
};
