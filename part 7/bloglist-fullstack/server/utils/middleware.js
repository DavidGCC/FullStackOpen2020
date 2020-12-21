const logger = require('../utils/logger');

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method);
    logger.info('Path: ', request.path);
    if (!request.body.hasOwnProperty('password')) {
        logger.info('Body: ', request.body);
    } else {
        logger.info('LOGIN')
    }
    logger.info('======');
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'This page doesn\'t exist, check the path again.'});
}

const errorHandler = (error, request, response, next) => {
    logger.error(error);

    if (error.name === "CastError") {
        return response.status(400).send({error: 'Malformed Id'});
    } else if (error.name === 'ValidationError') {  
        return response.status(400).send({error: error.message});
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).send({error: 'missing or invalid token'});
    }
    next(error);
};

const tokenExtractor = (request, response, next) => {
    const auth = request.get('authorization');
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        request.token = auth.substring(7);
    }
    next();
}

module.exports = {
    requestLogger, unknownEndpoint, errorHandler, tokenExtractor
}