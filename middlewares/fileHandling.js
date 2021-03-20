const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, process.cwd() + '/public/img/previews');
  },
  filename: function (_req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpeg');
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 20 }
}).single('img');

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .cookie(
          'context',
          { ...req.body, errors: 'Слишком большой размер изображения' },
          { httpOnly: true }
        )
        .redirect(req.headers.referer);
    } else {
      return next();
    }
  });
};
