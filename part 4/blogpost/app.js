const express = require('express')
const router = require('./controllers/router');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config');
const logger = require('./utils/logger');

const mongoUrl = config.MONGODB_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(res => {
        logger.info('Connected to MongoDB');
    })
    .catch(err => {
        logger.error('Couldn\'t connect to MongoDB', err);
    });
app.use('/api/blogs', router);
app.use(cors())
app.use(express.json())


module.exports = app;