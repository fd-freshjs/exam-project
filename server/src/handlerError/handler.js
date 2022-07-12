const { MulterError } = require('multer');

module.exports = (err, req, res, next) => {
  console.log(err);

  if (err instanceof MulterError) {
    err.code = 400;
  }

  if (
    err.message.includes('Banks_balance_ck') ||
    err.message.includes('Users_balance_ck')
  ) {
    err.message = 'Not Enough money';
    err.code = 406;
  }

  console.log(err.status);
  if (!err.message || (!err.code && !err.status)) {
    res.status(500).send('Server Error');
  } else {
    res.status(err.code || err.status).send(err.message);
  }
};
