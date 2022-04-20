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
  this.currentYearofStudy = candidate.currentYearOfStudy;
  this.studentID = candidate.studentID;
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

const buildWhere = (condition) => {
  let strWhere = "1=1";

  if (condition.idCandidate) {
    strWhere += " AND idCandidate = " + condition.idCandidate;
  }

  return strWhere;
};

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
