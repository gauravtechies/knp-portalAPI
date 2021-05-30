const express = require('express');
const passport = require('passport');
const permit = require("../../auth/permission");
const router = express.Router();

module.exports = (db, logger) => {
  const {
     getAssignedJobs,
     updateNote
  } = require('../../handlers/v1/hrPortal.handlers')(db, logger);

  /** Routes */
  router.get('/getAssignedJobs',passport.authenticate('jwt', { session: false }),permit('hr'), getAssignedJobs);
  router.post('/updateNote/:jobId',passport.authenticate('jwt', { session: false }),permit('hr'), updateNote);
  
  //router.get('/:id', getUser);
 
  return router;
};
