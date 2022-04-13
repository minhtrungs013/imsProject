const db = require("../models/index");
const connect = require("../config/db");
const Tutorial = db.tutorials;
const util = require("util");

const readXlsxFile = require("read-excel-file/node");
const { sequelize } = require("../models/index");

const checkDuplicateData = async (condition) => {
  const tuto = await Tutorial.findOne({ where: condition });
  if (tuto !== null) {
    console.log("lap lai");
    return true;
  } else {
    console.log("tao moi");
    return false;
  }
};

const upload = async (req, res) => {
  // try {
  if (req.file == undefined) {
    return res.status(400).send("Please upload an excel file!");
  }
  let path = "./resource/" + req.file.filename;
  const t = await sequelize.transaction();

  let countNumerInsert = 0;
  let countNumerUpdate = 0;
  readXlsxFile(path).then(async (rows) => {
    rows.shift();
    try {
      for (const row of rows) {
        let tutorial = {
          // id: row[0],
          title: row[1],
          description: row[2],
        };

        let condition = {
          title: row[1],
        };
        const isDuplicate = await checkDuplicateData(condition);
        if (isDuplicate) {
          await await Tutorial.update(tutorial, {
            where: condition,
            transaction: t,
          });
          countNumerUpdate++;
        } else {
          countNumerInsert++;
          await Tutorial.create(tutorial, { transaction: t });
        }
      }

      await t.commit();
    } catch (error) {
      await t.rollback();
      return res.status(500).send({
        message: "Fail to import data into database!",
        error: error.message,
      });
    }
    return res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
      countNumerUpdate: countNumerUpdate,
      countNumerInsert: countNumerInsert,
    });
  });
};

const getTutorials = (req, res) => {
  Tutorial.findAll()
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
module.exports = {
  upload,
  getTutorials,
};
