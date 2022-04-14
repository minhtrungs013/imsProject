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
    let listColumn = `candidates.idCandidate,
      candidates.fullName,
      candidates.emailCandidate,
      candidates.interviewDate,
      candidates.interviewTime,
      candidates.interviewer,
      candidates.interviewLink,
      candidates.comments,
      candidates.technicalComments,
      candidates.technicalScore,
      candidates.attitude,
      candidates.englishCommunication,
      candidates.status`;
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }
    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);
    const whereColumn = `interviewDate != ''`
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
    const whereColumn = `interviewDate != ''`
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
    const valueNull = 'null'
    const setColum = `interviewDate = ${valueNull}, interviewTime = ${valueNull}, interviewer = ${valueNull}, interviewLink = ${valueNull}`
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

const buildWhere = (condition) => {
  let strWhere = "1=1";
  if (condition.idCandidate) {
    strWhere += " AND idCandidate = " + condition.idCandidate;
  }
  if (condition.fullName) {
    strWhere += ' AND fullName LIKE "%' + condition.fullName + '%" ';
  }
  return strWhere;
};
const Table = "candidates"
module.exports = Candidate;
