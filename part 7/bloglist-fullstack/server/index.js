const http = require('http');
const app = require('./app');
const https = require('https');
const config = require('./utils/config');
const fs = require('fs');

let opt = {
    key: fs.readFileSync(`${__dirname}/certs/localhost.key`),
    cert: fs.readFileSync(`${__dirname}/certs/localhost.crt`)
};

const server = https.createServer(opt, app);

const PORT = config.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}, Running on ${process.env.NODE_ENV} mode`);
});