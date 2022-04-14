const db = require("../models/index");
const statusCodes = require("http-status-codes");
const Candidate = db.candidates;

const readXlsxFile = require("read-excel-file/node");
const { sequelize } = require("../models/index");

const checkDuplicateData = async (condition) => {
  const candi = await Candidate.findOne({ where: condition });
  if (candi !== null) {
    return true;
  } else {
    return false;
  }
};

const upload = async (req, res) => {
  if (req.file == undefined) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send("Vui lòng tải lên một tệp excel !");
  }
  let path = "./resource/" + req.file.filename;
  const t = await sequelize.transaction();

  let countNumerInsert = 0;
  let countNumerUpdate = 0;
  readXlsxFile(path).then(async (rows) => {
    rows.shift();
    try {
      for (const row of rows) {
        let candidate = {
          fullName: row[1],
          tel: row[2],
          emailCandidate: row[3],
          idDG: row[4],
          interviewTime: row[5],
          interviewDate: row[6],
          status: row[7],
          remark: row[8],
          idMentor: row[9],
          technicalComments: row[10],
          technicalScore: row[11],
          attitude: row[12],
          englishCommunication: row[13],
          comments: row[14],
          remarks: row[15],
          internshipDomain: row[16],
          preferredSkills: row[17],
          university: row[18],
          faculty: row[19],
          currentYearofStudy: row[20],
          studentID: row[21],
          preferredInternshipStartDate: row[22],
          preferredInternshipDuration: row[23],
          internshipSchedule: row[24],
          GPA: row[25],
          idInternshipCourse: row[26],
          graduationYear: row[27],
          projectExperience: row[28],
          expectedGraduationSchedule: row[29],
          remainingSubjects: row[30],
          covidVaccinationiInformation: row[31],
          certificationDate: row[32],
          covidVaccinationCertificate: row[33],
          interviewLink: row[34],
          interviewer: row[35],
          emailInterviewer: row[36],
          pcType: row[37],
          deleteAt: row[39],
        };

        let condition = {
          studentID: row[21],
        };
        const isDuplicate = await checkDuplicateData(condition);
        if (isDuplicate) {
          await await Candidate.update(candidate, {
            where: condition,
            transaction: t,
          });
          countNumerUpdate++;
        } else {
          countNumerInsert++;
          await Candidate.create(candidate, { transaction: t });
        }
      }

      await t.commit();
    } catch (error) {
      await t.rollback();
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Không thể nhập dữ liệu vào cơ sở dữ liệu !",
        error: error.message,
      });
    }
    return res.status(statusCodes.OK).send({
      message: "Import thành công file: " + req.file.originalname,
      countNumerUpdate: countNumerUpdate,
      countNumerInsert: countNumerInsert,
    });
  });
};

const getCandidates = (req, res) => {
  Candidate.findAll()
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || "Đã xảy ra một số lỗi khi truy xuất các ứng cử viên .",
      });
    });
};
module.exports = {
  upload,
  getCandidates,
};
