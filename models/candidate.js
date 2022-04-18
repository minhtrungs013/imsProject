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
    const strSql = `SELECT ${listColumn} FROM candidates LIMIT ${limit} OFFSET ${offset}`;
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
    let listColumn = `candidates.idCandidate,
        candidates.fullName,
        candidates.emailCandidate, 
        candidates.studentID,
        candidates.university,
        candidates.internshipDomain,
        internshipcourse.nameCoure,
        candidates.status`;
    const strSql = `SELECT ${listColumn} FROM candidates INNER JOIN internshipcourse 
        WHERE  
     candidates.idInternshipCourse = internshipcourse.idInternshipCourse AND ${where} LIMIT ${limit} OFFSET ${offset}`;
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

  return strWhere;
};
module.exports = Candidate;
