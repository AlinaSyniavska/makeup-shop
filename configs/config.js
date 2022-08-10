module.exports = {
    PORT: process.env.PORT || 5001,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'access_token',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || 'refresh_token',
    FORGOT_PASS_ACTION_SECRET: process.env.FORGOT_PASS_ACTION_SECRET || 'fgt_pass',
    AUTHORIZATION: process.env.AUTHORIZATION,
    CORS_WHITE_LIST:process.env.CORS_WHITE_LIST || '',
};