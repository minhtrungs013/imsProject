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
  this.graduationYear = candidate.GraduationYear;
  this.projectExperience = candidate.ProjectExperience;
  this.expectedGraduationSchedule = candidate.ExpectedGraduationSchedule;
  this.remainingSubjects = candidate.RemainingSubjects;
  this.covidVaccinationiInformation = candidate.CovidVaccinationiInformation;
  this.certificationDate = candidate.CertificationDate;
  this.covidVaccinationCertificate = candidate.CovidVaccinationCertificate;
  this.interViewLink = candidate.InterviewLink;
  this.pcType = candidate.pcType;
  this.deleteAtt= candidate.deleteAtt;
};
Candidate.getAll = async (condition, columns, page, limit) => {
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
    const strSql = `SELECT ${listColumn} FROM candidate LIMIT ${limit} OFFSET ${offset}`;
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
    let listColumn = `candidate.idCandidate,
        candidate.fullName,
        candidate.emailCandidate, 
        mentor.fullNameMentor,
        dg.nameDG,
        candidate.internshipDomain,
        internshipcourse.nameCoure,
        candidate.status`;
    const strSql = `SELECT ${listColumn} FROM candidate INNER JOIN dg INNER JOIN mentor INNER JOIN internshipcourse 
        WHERE candidate.idDG = dg.idDG and candidate.idMentor = mentor.idMentor AND candidate.idInternshipCourse = internshipcourse.idInternshipCourse AND ${where} LIMIT ${limit} OFFSET ${offset}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

Candidate.update = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE candidate SET ? WHERE ${where}`;
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
    const sql = `DELETE FROM candidate WHERE ${where}`;
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
    const sql = `SELECT count(*) as totalCount FROM candidate WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result[0].totalCount;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const buildWhere = (condition) => {
  let strWhere = "1=1";

  if (condition.internshipcourseId) {
    strWhere +=
      " AND candidate.idInternshipCourse =" + condition.internshipcourseId;
  }
  if (condition.candidateId) {
    strWhere += " AND idCandidate = " + condition.candidateId;
  }
  if (condition.idCandidate) {
    strWhere += " AND idCandidate = " + condition.idCandidate;
  }

  return strWhere;
};
module.exports = Candidate;
