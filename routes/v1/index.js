/* eslint-disable global-require */
const express = require('express');

const router = express.Router();
const passport = require('passport');

module.exports = (db, logger) => {
  router.get('/', (req, res) => {
    res.json({ msg: 'Welcome' });
  });


  router.use('/', require('./clients')(db, logger));
  router.use('/admin', require('./admin')(db, logger));
  return router;
};
