const validate = require('validate.js');

module.exports = (db, logger) => ({
  searchUsers: (req, res) => {
    logger.debug('in search');
    res.json({ msg: 'Search' });
  },
  getUser: (req, res) => {
    logger.debug('in get user');
    res.json({ msg: 'Get user' });
  },
  addUser: (req, res, next) => {
    const validationConstraints = {
      first_name: { presence: { allowEmpty: false } },
      last_name: { presence: { allowEmpty: false } },
    };

    const errors = validate(req.body, validationConstraints);

    if (errors) return next({ status: 400, errors });

    res.json({ msg: 'Add User' });
    return true;
  },
  updateUser: (req, res) => {
    res.json({ msg: 'Update User' });
  },
  deleteUser: (req, res) => {
    res.json({ msg: 'Delete User' });
  },
});
