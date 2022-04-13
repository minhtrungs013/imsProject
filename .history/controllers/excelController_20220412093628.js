const db = require("../models/index");
const Tutorial = db.tutorials;

const readXlsxFile = require("read-excel-file/node");
const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let path = "./resource/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      let tutorials = [];
      rows.forEach((row) => {
        let tutorial = {
          // id: row[0],
          title: row[1],
          description: row[2],
        };
        tutorials.push(tutorial);
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
      Foreach(row in File);
      {
        if (ValidattionData(row)) {
          if (checkDuplicateData(row[i][Ten], row[MSSV], row[DT])) {
            UpdateUngVien(row); //Update data
            WriteLog(row, logState.Update);
            CountNUmberUpdate += 1;
          } else {
            if (AddNewCandidate(row[i])) {
              WriteLog(row, logState.Insert);
              CountNUmberInsert += 1;
            }
          }
        } else {
          CountNUmberRrror += 1;
          WriteLog(row, logState.Error);
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
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
