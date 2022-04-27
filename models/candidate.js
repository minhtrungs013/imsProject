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

Candidate.create = async (condition) => {
  try {
    const sql = `INSERT INTO candidates SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition)
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
    const sql = `DELETE FROM candidates WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;
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

  if (condition.idCandidate) {
    strWhere += " AND idCandidate = " + condition.idCandidate;
  }
  if (condition.candidateId) {
    strWhere += " AND idCandidate = " + condition.candidateId;
  }
  if (condition.fullNames) {
    strWhere += ' AND fullName LIKE "%' + condition.fullNames + '%" ';
  }

  if (condition.emailCandidate) {
    strWhere +=
      ' AND candidates.emailCandidate = "' + condition.emailCandidate + '"';
  } 
   if (condition.idInternshipCourses) {
    strWhere +=
      ' AND candidates.idInternshipCourse = "' + condition.idInternshipCourses + '"';
  }


  return strWhere;
};
Candidate.ErrorRequest = "Bạn cần nhập đủ thông tin";
Candidate.ErrorNameSpecialChars = "Tên ứng viên không chứa ký tự đặt biệt !";
Candidate.ErrorNameLength = "Vui lòng nhập đầy đủ Họ và tên !";
Candidate.ErrorSDT = "Vui lòng nhập lại Số điện thoại!";
Candidate.ErrorEmail = "Vui lòng nhập lại Email !";
Candidate.ErrorEmailInterviewer = "Vui lòng nhập lại email ứng viên !";
Candidate.ErrorInterviewDate =
  "Ngày phỏng vấn không được nhỏ hơn ngày hiện tại !";
Candidate.ErrorStatus = "Vui lòng chọn Pass hoặc Fail !";
Candidate.ErrorInternshipDomain = "Vị trí thực tập từ 2-255 ký tự !";
Candidate.ErrorPreferredSkill = "Kỹ năng ưa thích từ 2-255 ký tự !";
Candidate.ErrorUniversity = "Trường đại học không từ 2-255 ký tự !";
Candidate.ErrorFaculty = " Tên Khoa từ 2-255 ký tự !";
Candidate.ErrorCurrentYearofStudy = "Bạn thuộc sinh viên năm nào ?";
Candidate.ErrorStudentID = "Mã sinh viên không được quá 255 ký tự !";
Candidate.ErrorPreferredInternshipDuration =
  "Vị trí thực tập từ 2-255 ký tự!";
Candidate.ErrorInternshipSchedule =
  "Vui lòng nhập đầy đủ thông tin kỳ thực tập !";
Candidate.ErrorNameSpecialChars = "Tên ứng viên không chứa ký tự đặt biệt !";
Candidate.ErrorGPA = "Điểm trung bình có giá trị từ 0 đến 10 !";
Candidate.ErrorIdInternshipCourse = "Vui lòng nhập đầy đủ thông tin !";
Candidate.ErrorGraduationYear =
  "Vui lòng không để trống trường Năm học hiện tại !";
Candidate.ErrorProjectExperience =
  "Các dự án đã tham gia từ 2-255 ký tự !";
Candidate.ErrorExpectedGraduationSchedule =
  "Dự kiến tốt nghiệp từ 2-255 ký tự !";
Candidate.ErrorRemainingSubjects =
  "Các môn học còn lại từ 2-255 ký tự !";
Candidate.ErrorCovidVaccinationiInformation =
  "Thông tin tim chủng Covid từ 2-255 ký tự !";
Candidate.ErrorCertificationDate = "Ngày chứng nhận không được lớn hơn ngày hiện tại";
Candidate.ErrorCovidVaccinationCertificate =
  "Thông tin Giấy chứng nhận tiêm chủng covid từ 2-255 ký tự !";
Candidate.ErrorPcType = "Vui lòng điền thông tin loại máy thực tập !";
Candidate.ErrorPreferredInternshipStartDate =
  "Ngày bắt đầu thực tập không được nhỏ hơn ngày hiện tại !";
Candidate.ErrorInterviewer = "Bạn cần nhập thông tin Người phỏng vấn !";
Candidate.ErrorInterviewerLink = "Vui lòng nhập Liên kết phỏng vấn đầy đủ";
Candidate.ErrorRemarks = "Các nhận xét từ 2-255 ký tự !";
Candidate.ErrorComments = " Nhận xét từ 2-255 ký tự !";
Candidate.ErrorEnglishCommunication =
  " Tiếng Anh giao tiếp từ 2-255 ký tự !";
Candidate.ErrorTechnicalComments =
  " Thái độ ứng viên từ 2-255 ký tự !";
Candidate.ErrorTechnicalScore =
  "  Điểm kỹ thuật từ 2-255 ký tự!";
Candidate.Message_Done = "Done !";
Candidate.Message_Error = "Fail !";
Candidate.ERROR_EMAIL_DUPLICATE="Email đã tồn tại";
module.exports = Candidate;
