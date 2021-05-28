/* eslint-disable global-require */
const express = require('express');

const router = express.Router();

module.exports = (db, logger) => {
  router.get('/', (req, res) => {
    res.json({ msg: 'Welcome' });
  });


  router.use('/users', require('./users')(db, logger));
  return router;
};
