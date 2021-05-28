/* eslint-disable global-require */
const express = require('express');

const router = express.Router();

module.exports = (db, logger) => {
  const {
    searchUsers, addUser, updateUser, deleteUser, getUser,
  } = require('../../handlers/v1/users.handler')(db, logger);

  /** Routes */
  router.get('/', searchUsers);
  router.post('/', addUser);
  router.get('/:id', getUser);
  router.put('/:id', updateUser);
  router.delete('/:id', deleteUser);

  return router;
};
