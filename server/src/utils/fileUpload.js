const fs = require('fs');
const path = require('path');
const multer = require('multer');
const ServerError = require('../errors/ServerError');
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', '..', 'public/images');

const filePath = env === 'production'
  ? '/var/www/html/images/'
  : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storageContestFiles = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, filePath);
  },
  filename (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const multerWithStorage = multer({ storage: storageContestFiles });

const uploadAvatar = multerWithStorage.single('file');
const uploadContestFiles = multerWithStorage.array(
  'files', 3);
const updateContestFile = multerWithStorage.single(
  'file');
const uploadLogoFiles = multerWithStorage.single(
  'offerData');


module.exports.uploadAvatar = uploadAvatar;

/* (req, res, next) => {
  uploadAvatar(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }
    return next();
  });
}; */

module.exports.uploadContestFiles = uploadContestFiles;

module.exports.updateContestFile = updateContestFile;

module.exports.uploadLogoFiles = uploadLogoFiles;
