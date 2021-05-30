const express = require('express');
const passport = require('passport');
const permit = require("../../auth/permission");
const router = express.Router();

module.exports = (db, logger) => {
  const {
     post,
     getUsers
  } = require('../../handlers/v1/admin/hr.handlers')(db, logger);

  /** Routes */
  router.post('/createHr',passport.authenticate('jwt', { session: false }),permit('admin'), post);
  router.get('/getUsers',passport.authenticate('jwt', { session: false }),permit('admin'), getUsers);
  
  //router.get('/:id', getUser);
 
  return router;
};
