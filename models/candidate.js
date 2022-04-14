const connect = require("../config/db");
const util = require("util");

const Candidate = (candidate) => {
  this.idCandidate = candidate.idCandidate;
  this.fullName = candidate.fullName;
  this.tel = candidate.tel;
  this.email = candidate.email;
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
  this.currentYearofStudy = candidate.currentYearofStudy;
  this.studentID = candidate.cstudentID;
  this.preferredInternshipStartDate = candidate.preferredInternshipStartDate;
  this.preferredInternshipDuration = candidate.preferredInternshipDuration;
  this.internshipSchedule = candidate.internshipSchedule;
  this.GPA = candidate.GPA;
  this.idInternshipCourse = candidate.idInternshipCourse;
  this.GraduationYear = candidate.GraduationYear;
  this.ProjectExperience = candidate.ProjectExperience;
  this.ExpectedGraduationSchedule = candidate.ExpectedGraduationSchedule;
  this.RemainingSubjects = candidate.RemainingSubjects;
  this.CovidVaccinationiInformation = candidate.CovidVaccinationiInformation;
  this.CertificationDate = candidate.CertificationDate;
  this.CovidVaccinationCertificate = candidate.CovidVaccinationCertificate;
  this.InterviewLink = candidate.InterviewLink;
  this.pcType = candidate.pcType;
};
Candidate.getInterview = async (condition, columns, page, limit) => {
  try {
    let listColumn = `candidate.idCandidate,
      candidate.fullName,
      candidate.email,
      candidate.interviewDate,
      candidate.interviewTime,
      mentor.fullNameMentor,
      candidate.InterviewLink,
      candidate.comments,
      candidate.technicalComments,
      candidate.technicalScore,
      candidate.attitude,
      candidate.englishCommunication,
      candidate.status`;
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }
    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);
    const strSql = `SELECT ${listColumn} FROM candidate INNER JOIN mentor
      WHERE candidate.idMentor = mentor.idMentor AND interviewDate != '' AND ${where} LIMIT ${limit} OFFSET ${offset} `;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};
Candidate.getTotalCount = async (condition) => {
  try {
    const where = buildWhere(condition);
    const strSql = `SELECT count(*) as totalCount FROM candidate WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(strSql);
    return result[0].totalCount;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

Candidate.search = async (condition) => {
  console.log(condition)
  try {
    let listColumn = `candidate.idCandidate,
    candidate.fullName,
    candidate.email,
    candidate.interviewDate,
    candidate.interviewTime,
    mentor.fullNameMentor,
    candidate.InterviewLink,
    candidate.comments,
    candidate.technicalComments,
    candidate.technicalScore,
    candidate.attitude,
    candidate.englishCommunication,
    candidate.status`;
    const where = buildWhere(condition);
    const strSql = `SELECT ${listColumn} FROM candidate INNER JOIN mentor
    WHERE candidate.idMentor = mentor.idMentor AND ${where}`;
    console.log(strSql);
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const buildWhere = (condition) => {
  let strWhere = "1=1";
  if (condition.idCandidate) {
    strWhere += " AND idCandidate " + condition.idCandidate;
  }
  if (condition.fullName) {
    strWhere += ' AND fullName LIKE "%' + condition.fullName + '%" ';
  }
  if (condition.fullNameMentor) {
    strWhere += ' OR mentor.fullNameMentor LIKE "%' + condition.fullNameMentor + '%" ';
  }
  return strWhere;
};
module.exports = Candidate;
