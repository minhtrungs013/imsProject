const connect = require("../config/db");
const util = require("util");

const Candidate = (candidates) => {
  this.idCandidate = candidates.idCandidate;
  this.fullName = candidates.fullName;
  this.tel = candidates.tel;
  this.emailCandidate = candidates.emailCandidate;
  this.idDG = candidates.idDG;
  this.interviewTime = candidates.interviewTime;
  this.interviewDate = candidates.interviewDate;
  this.status = candidates.status;
  this.remark = candidates.remark;
  this.idMentor = candidates.idMentor;
  this.technicalComments = candidates.technicalComments;
  this.technicalScore = candidates.technicalScore;
  this.attitude = candidates.attitude;
  this.englishCommunication = candidates.englishCommunication;
  this.comments = candidates.comments;
  this.remarks = candidates.remarks;
  this.internshipDomain = candidates.internshipDomain;
  this.preferredSkills = candidates.preferredSkills;
  this.university = candidates.university;
  this.faculty = candidates.faculty;
  this.currentYearofStudy = candidates.currentYearOfStudy;
  this.studentID = candidates.studentID;
  this.preferredInternshipStartDate = candidates.preferredInternshipStartDate;
  this.preferredInternshipDuration = candidates.preferredInternshipDuration;
  this.internshipSchedule = candidates.internshipSchedule;
  this.GPA = candidates.GPA;
  this.idInternshipCourse = candidates.idInternshipCourse;
  this.graduationYear = candidates.graduationYear;
  this.projectExperience = candidates.projectExperience;
  this.expectedGraduationSchedule = candidates.expectedGraduationSchedule;
  this.remainingSubjects = candidates.remainingSubjects;
  this.covidVaccinationiInformation = candidates.covidVaccinationiInformation;
  this.certificationDate = candidates.certificationDate;
  this.covidVaccinationCertificate = candidates.covidVaccinationCertificate;
  this.interviewLink = candidates.interviewLink;
  this.interviewer = candidates.interviewer;
  this.pcType = candidates.pcType;
  this.deleteAt = candidates.deleteAt;
};
Candidate.getByID = async (condition, columns, page, limit) => {
  try {
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }
    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);
    let listColumn = `*`;
    const strSql = `SELECT ${listColumn} FROM candidates WHERE ${where} LIMIT ${limit} OFFSET ${offset}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

Candidate.getBatch = async (condition, columns, page, limit) => {
  try {
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }
    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);
    let listColumn = "*";
    const strSql = `SELECT  ${listColumn} FROM candidates 
    WHERE ${where} ORDER BY idCandidate DESC LIMIT ${limit} OFFSET ${offset}`;

    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

Candidate.create = async (condition) => {
  try {
    const sql = `INSERT INTO candidates SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Candidate.update = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE candidates SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Candidate.remove = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `DELETE FROM candidates  WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

Candidate.getTotalCount = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `SELECT count(*) as totalCount FROM candidates WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result[0].totalCount;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
const dateDelete = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

Candidate.softDelete = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE candidates SET deleteAt = '${dateDelete}' WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};
Candidate.restore = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE candidates SET deleteAt = null WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Candidate.getBin = async (condition, columns, page, limit) => {
  try {
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }
    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);
    let listColumn = "*";
    const strSql = `SELECT ${listColumn} FROM candidates WHERE candidates.deleteAt IS NOT NULL LIMIT ${limit} OFFSET ${offset}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};
const buildWhere = (condition) => {
  let strWhere = "1=1";

  if (condition.internshipcourseId) {
    strWhere +=
      " AND candidates.idInternshipCourse =" + condition.internshipcourseId;
  }

  if (condition.candidateId) {
    strWhere += " AND idCandidate = " + condition.candidateId;
  }
  if (condition.idCandidate) {
    strWhere += " AND idCandidate = " + condition.idCandidate;
  }
  if (condition.idcandidate) {
    strWhere += " AND idCandidate = " + condition.idcandidate;
  }

  return strWhere;
};
Candidate.ErrorRequest = "Bạn cần nhập đủ thông tin";
Candidate.ErrorNameSpecialChars = "Tên ứng viên không chứa ký tự đặt biệt !";
Candidate.ErrorNameLength = "Vui lòng nhập đầy đủ Họ và tên !";
Candidate.ErrorSDT = "Vui lòng nhập lại Số điện thoại!";
Candidate.ErrorEmail = "Vui lòng nhập lại Email !";
Candidate.ErrorEmailInterviewer = "Vui lòng nhập lại email ứng viên !";
Candidate.ErrorIdDG = "Vui lòng nhập đầy đủ thông tin DG!";
Candidate.ErrorInterviewDate =
  "Ngày phỏng vấn không được nhỏ hơn ngày hiện tại !";
Candidate.ErrorStatus = "Vui lòng chọn Pass hoặc Fail !";
Candidate.ErrorInternshipDomain = "Vị trí thực tập không được quá 255 ký tự !";
Candidate.ErrorPreferredSkill = "Kỹ năng ưa thích không được quá 255 ký tự !";
Candidate.ErrorUniversity = "Trường đại học không được quá 255 ký tự !";
Candidate.ErrorFaculty = " Tên Khoa không được quá 255 ký tự !";
Candidate.ErrorCurrentYearofStudy = "Bạn thuộc sinh viên năm nào ?";
Candidate.ErrorStudentID = "Mã sinh viên không được quá 255 ký tự !";
Candidate.ErrorPreferredInternshipDuration =
  "Vị trí thực tập không được quá 255 ký tự !";
Candidate.ErrorInternshipSchedule =
  "Vui lòng nhập đầy đủ thông tin kỳ thực tập !";
Candidate.ErrorNameSpecialChars = "Tên ứng viên không chứa ký tự đặt biệt !";
Candidate.ErrorGPA = "Vui lòng nhập điểm trung bình tổng kết !";
Candidate.ErrorIdInternshipCourse = "Vui lòng nhập đầy đủ thông tin !";
Candidate.ErrorGraduationYear =
  "Vui lòng không để trống trường Năm học hiện tại !";
Candidate.ErrorProjectExperience =
  "Vui lòng nhập các dự án đã tham gia không được quá 255 ký tự !";
Candidate.ErrorExpectedGraduationSchedule =
  "Vui lòng nhập dự kiến tốt nghiệp không được quá 255 ký tự !";
Candidate.ErrorRemainingSubjects =
  "Các môn học còn lại nhưng không được quá 255 ký tự !";
Candidate.ErrorCovidVaccinationiInformation =
  "Thông tin tim chủng Covid không được quá 255 ký tự !";
Candidate.ErrorCertificationDate = "Không được để trống ngày chứng nhận !";
Candidate.ErrorCovidVaccinationCertificate =
  "`Vui lòng không nhập  thông tin Giấy chứng nhận tiêm chủng covid quá 255 ký tự !";
Candidate.ErrorPcType = "Vui lòng điền thông tin loại máy thực tập !";
Candidate.ErrorPreferredInternshipStartDate =
  "Ngày bắt đầu thực tập không được nhỏ hơn ngày hiện tại !";
Candidate.ErrorInterviewer = "Bạn cần nhập thông tin Người phỏng vấn !";
Candidate.ErrorInterviewerLink = "Vui lòng nhập Liên kết phỏng vấn đầy đủ";
Candidate.ErrorRemarks = "Các nhận xét không được quá 255 ký tự !";
Candidate.ErrorComments = " Nhận xét không được nhập quá 255 ký tự !";
Candidate.ErrorEnglishCommunication =
  " Tiếng Anh giao tiếp không được nhập quá 255 ký tự !";
Candidate.ErrorRemark = " Chú thích không được nhập quá 255 ký tự !";
Candidate.ErrorIdMentor = "Không được để trống thông tin Mentor !";
Candidate.ErrorTechnicalComments =
  " Thái độ ứng viên không được nhập quá 255 ký tự !";
Candidate.ErrorTechnicalScore =
  "  Điểm kỹ thuật không được  nhập quá 255 ký tự !";
Candidate.Message_Done = "Done !";
Candidate.Message_Error = "Fail !";
module.exports = Candidate;
