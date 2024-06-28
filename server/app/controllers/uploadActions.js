const multer = require("multer");

const path = require("path");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Configure multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadPath = path.resolve(
      __dirname,
      "../../../client/public/assets/images/nurseriesImages"
    );
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    const extension = MIME_TYPES[file.mimetype];
    cb(null, `${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage }).single("file");

const addImages = async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    return res
      .status(201)
      .json({ filePath: `/nurseriesImages/${req.file.filename}` });
  });
};

module.exports = {
  addImages,
};
