const express = require('express');
const passport = require('passport');
const permit = require("../../auth/permission");
const router = express.Router();

module.exports = (db, logger) => {
  const {
     post,
     createJob,
     jobsAssignedByClient
  } = require('../../handlers/v1/clients.handlers')(db, logger);

  /** Routes */
  router.post('/clients', post);
  router.post('/createJob',passport.authenticate('jwt', { session: false }),permit('client'), createJob);
  router.get('/jobsAssignedByClient',passport.authenticate('jwt', { session: false }),permit('client'), jobsAssignedByClient);
  
  //router.get('/:id', getUser);
 
  return router;
};
