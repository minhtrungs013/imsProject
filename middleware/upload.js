const multer = require("multer");
const messageModels = require("../models/messgeModel");

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    return cb(messageModels.ERROR_EXCEL, false);
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./resource");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});
var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;
