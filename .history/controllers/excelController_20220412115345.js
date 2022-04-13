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

      Tutorial.bulkCreate(tutorials)
      Foreach( row in File)
      {
        if(ValidattionData(row)) 
        {
        
          if (checkDuplicateData(row[i][title]) )
          {
            UpdateUngVien(row) //Update data
            WriteLog(row, logState.Update)
            CountNUmberUpdate += 1
            
          }	
          else			
          {
            if( AddNewCandidate(row[i])	 )
            {	
              WriteLog(row, logState.Insert)
              CountNUmberInsert += 1
            }
          }
        }
        else
        {
          CountNUmberRrror +=1 ;
          WriteLog(row, logState.Error)
        }
      }	
        
      
    AddNewCandidate (row)
    {
      try{
        CallAPI_Insertdata(row) // querry insert
      }
      catch (exception ex)
      {
        WriteLog(row, logState.Error)
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
