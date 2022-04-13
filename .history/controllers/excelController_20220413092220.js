const db = require("../models/index");
const Tutorial = db.tutorials;
const util = require("util");

const readXlsxFile = require("read-excel-file/node");
const { sequelize } = require("../models/index");

const checkDuplicateData = (tutorial) => {
  const where = buildWhere(tutorial);
  let listColumn = "*";
  const strSql = `SELECT ${listColumn} FROM tutorials WHERE ${where}`;
  const query = util.promisify(connect.query).bind(connect);
  query(strSql);
  return false;
};
const buildWhere = (tutorial) => {
  let strWhere = "1=1";

  if (tutorial.tutorial) {
    strWhere += " AND title = " + tutorial.tutorial;
  }
  return strWhere;
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
    // skip header
    rows.shift();
    // let tutorials = [];

    // First, we start a transaction and save it into a variable

    try {
      for (const row of rows) {
        let tutorial = {
          // id: row[0],
          title: row[1],
          description: row[2],
        };

        // // tutorials.push(tutorial);
        // const checkDuplicateData = row[1]
        // if (checkDuplicateData){
        //   Tutorial.update(tutorials)
        // }

        if (checkDuplicateData(tutorial)) {
          await await Tutorial.update(tutorial, { transaction: t });
          countNumerUpdate++;
        } else {
          await Tutorial.create(tutorial, { transaction: t });
          countNumerInsert++;
        }
      }

      await t.commit();
    } catch (error) {
      // await t.rollback();
      res.status(500).send({
        message: "Fail to import data into database!",
        error: error.message,
      });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
    // Tutorial.bulkCreate(tutorials)
    //   .then(() => {
    //     res.status(200).send({
    //       message: "Uploaded the file successfully: " + req.file.originalname,
    //     });
    //   })
    //   .catch((error) => {
    //     res.status(500).send({
    //       message: "Fail to import data into database!",
    //       error: error.message,
    //     });
    //   });
  });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({
  //     message: "Could not upload the file: " + req.file.originalname,
  //   });
  // }
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
