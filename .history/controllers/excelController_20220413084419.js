const db = require("../models/index");
const Tutorial = db.tutorials;

const readXlsxFile = require("read-excel-file/node");
const { sequelize } = require("../models/index");

const upload = async (req, res) => {
  // try {
  if (req.file == undefined) {
    return res.status(400).send("Please upload an excel file!");
  }
  let path = "./resource/" + req.file.filename;
  const t = await sequelize.transaction();

  readXlsxFile(path).then(async (rows) => {
    // skip header
    rows.shift();
    // let tutorials = [];

    // First, we start a transaction and save it into a variable

    // try {
    rows.forEach(async (row) => {
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

      await Tutorial.create(tutorial, { transaction: t });
    });
    await Tutorial.create({
      // id: row[0],
      title: "123",
      description: ,
    }, { transaction: t });
    await t.commit();
    // } catch (error) {
    //   // await t.rollback();
    //   res.status(500).send({
    //     message: "Fail to import data into database!",
    //     error: error.message,
    //   });
    // }

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
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
module.exports = {
  upload,
  getTutorials,
};
