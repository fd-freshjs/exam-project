const lodash = require('lodash');

module.exports.prepareUser = (user) => {
  return lodash.omit(user, ['password', 'accessToken']);
};
