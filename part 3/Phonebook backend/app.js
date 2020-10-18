const express = require('express');
const app = express();
const cors = require("cors");
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const router = require('./controllers/persons');


logger.info('Connectiong to', config.MONGODB_URL);

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        logger.info('Connected to the database');
    })
    .catch(err => {
        logger.error('error connecting to database', err.message);
    });


app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/persons', router);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;