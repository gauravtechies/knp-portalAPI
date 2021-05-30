const express = require('express');
const router = express.Router();

module.exports = (db, logger) => {
    const {
        refreshToken,
    } = require('../../handlers/v1/refreshToken')(db, logger);

    /** Routes */
    router.post('/refreshToken',refreshToken);

    // router.put('/', update);

    return router;
};
