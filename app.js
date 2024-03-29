require('dotenv').config();
const { config } = require('./configs');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cronRun = require('./cron');

const { adminRouter, homeRouter, categoryRouter, authRouter, cartRouter, userRouter } = require("./routes");

mongoose.connect(config.MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (config.NODE_ENV !== 'prod') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.options('*', cors()) // include before other routes
app.use(cors(_configureCors()));

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/category', categoryRouter);
app.use('/home', homeRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        error: err.message || 'Unknown Error',
        code: err.status || 400,
    });
});

app.listen(config.PORT, () => {
    console.log(`Started on port ${config.PORT}`);
    cronRun();
});

function _configureCors() {
    const whitelist = config.CORS_WHITE_LIST.split(';');

    return {
        origin: (origin, callback) => {
            if (whitelist.includes(origin) || !origin) {
                // if (whitelist.includes(origin)) {
                console.log(origin);
                console.log(whitelist.includes(origin));
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }

        },
    };
}





