const connect = require("../config/db");
const util = require("util");

const Candidate = (candidate) => {
  this.idCandidate = candidate.idCandidate;
  this.fullName = candidate.fullName;
  this.tel = candidate.tel;
  this.emailCandidate = candidate.emailCandidate;
  this.idDG = candidate.idDG;
  this.interviewTime = candidate.interviewTime;
  this.interviewDate = candidate.interviewDate;
  this.interviewer = candidate.interviewer;
  this.interviewLink = candidate.interviewLink;
  this.status = candidate.status;
  this.remark = candidate.remark;
  this.idMentor = candidate.idMentor;
  this.technicalComments = candidate.technicalComments;
  this.technicalScore = candidate.technicalScore;
  this.attitude = candidate.attitude;
  this.englishCommunication = candidate.englishCommunication;
  this.comments = candidate.comments;
  this.remarks = candidate.remarks;
  this.internshipDomain = candidate.internshipDomain;
  this.preferredSkills = candidate.preferredSkills;
  this.university = candidate.university;
  this.faculty = candidate.faculty;
  this.currentYearofStudy = candidate.currentYearofStudy;
  this.studentID = candidate.cstudentID;
  this.preferredInternshipStartDate = candidate.preferredInternshipStartDate;
  this.preferredInternshipDuration = candidate.preferredInternshipDuration;
  this.internshipSchedule = candidate.internshipSchedule;
  this.GPA = candidate.GPA;
  this.idInternshipCourse = candidate.idInternshipCourse;
  this.graduationYear = candidate.graduationYear;
  this.projectExperience = candidate.projectExperience;
  this.expectedGraduationSchedule = candidate.expectedGraduationSchedule;
  this.remainingSubjects = candidate.remainingSubjects;
  this.covidVaccinationiInformation = candidate.covidVaccinationiInformation;
  this.certificationDate = candidate.certificationDate;
  this.covidVaccinationCertificate = candidate.covidVaccinationCertificate;
  this.interviewLink = candidate.interviewLink;
  this.emailInterviewer = candidate.emailInterviewer;
  this.interviewer = candidate.interviewer;
  this.pcType = candidate.pcType;
  this.deleteAtt = candidate.deleteAtt;
};
Candidate.getInterview = async (condition, columns, page, limit) => {
  try {
    let listColumn = `*`;
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }
    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);
    const whereColumn = `interviewer != ''`;
    const strSql = `SELECT ${listColumn} FROM ${Table} WHERE ${whereColumn} AND ${where} LIMIT ${limit} OFFSET ${offset} `;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};
Candidate.getTotalCount = async (condition) => {
  try {
    const where = buildWhere(condition);
    const whereColumn = `interviewer != ''`;
    const strSql = `SELECT count(*) as totalCount FROM ${Table} WHERE ${whereColumn} AND ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(strSql);
    return result[0].totalCount;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

Candidate.delete = async (condition) => {
  try {
    const valueNull = "null";
    const setColum = `interviewDate = ${valueNull}, interviewTime = ${valueNull}, interviewer = ${valueNull}, interviewLink = ${valueNull}, emailInterviewer = ${valueNull}, updateInsert = ${valueNull}`;
    const where = buildWhere(condition);
    const sql = `UPDATE ${Table} SET ${setColum} WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

Candidate.update = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE ${Table} SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

const buildWhere = (condition) => {
  let strWhere = "1=1";
  if (condition.idCandidate) {
    strWhere += " AND idCandidate = " + condition.idCandidate;
  }
  if (condition.fullName) {
    strWhere += ' AND fullName LIKE "%' + condition.fullName + '%" ';
  }
  if (condition.statusPr) {
    strWhere += ' AND status = "' + condition.statusPr + '" ';
  }
  if (condition.updateInserts) {
    strWhere += ' AND updateInsert = "' + condition.updateInserts + '" ';
  }
  if (condition.idInternshipCourse ) {
    strWhere += " AND idInternshipCourse  = " + condition.idInternshipCourse ;
  }
  return strWhere;
};
const Table = "candidates";
Candidate.STATUS_PASS = "Pass";
Candidate.STATUS_FAIL = "Fail";
Candidate.ERROR_EMPTY = "Bạn cần điền đầy đủ thông tin";
Candidate.ERROR_SEARCH = "Không có kết quả cho từ khóa này !";
Candidate.ERROR_ID = "Internview không tồn tại trong hệ thống !";
Candidate.ERROR_STATUS = "Kết quả phải là Pass hoặc Fail";
Candidate.SUCCESS_DEL = "Xóa thành công";
Candidate.SUCCESS_UPDATE = "Cập nhật thành công";
Candidate.ErrorRequest = "Bạn cần nhập đủ thông tin";
Candidate.ErrorEmail = "Định dang mail không hợp lệ";
Candidate.ErrorInterviewDate =
  "Ngày phỏng vấn không được nhỏ hơn ngày hiện tại";
Candidate.ErrorInterviewLink = "Chiều dài link phỏng vấn không đủ";
Candidate.ErroSpecialChars = "Tên người phỏng vấn không chứa ký tự đặt biệt";
Candidate.ErrorInterviewer = "Tên người phỏng vấn không đủ chiều dài";
Candidate.Success = "Cập nhật thành công";
Candidate.Failure = "Cập nhật thất bại";

module.exports = Candidate;
