/* eslint-disable global-require */
const express = require('express');

const router = express.Router();
const passport = require('passport');

module.exports = (db, logger) => {
  router.get('/', (req, res) => {
    res.json({ msg: 'Welcome' });
  });


  router.use('/client', require('./clients')(db, logger));
  router.use('/admin', require('./admin')(db, logger));
  router.use('/hr', require('./hrjobsFetch')(db, logger));
  router.use('/',require('./refreshToken')(db, logger));
  return router;

};
