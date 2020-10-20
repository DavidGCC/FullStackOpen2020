const express = require('express')
const router = require('./controllers/router');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config');

const mongoUrl = config.MONGODB_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use('/api/blogs', router);
app.use(cors())
app.use(express.json())


module.exports = app;