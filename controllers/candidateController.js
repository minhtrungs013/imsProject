const candidates = require("../models/candidate");
const statusCodes = require("http-status-codes");

const getCandidate = async (req, res) => {
  let page = 1,
    limit = 20;
  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  const id = req.params.id;
  const results = await candidates.getAll({}, [], page, limit);
  const total = await candidates.getTotalCount({}, [], page, limit);

  return res.send({ data: results, total: total });
};

const getBatch = async (req, res) => {
  let page = 1,
    limit = 20;

  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }

  const id = req.params.id;
  const results = await candidates.getBatch(
    { internshipcourseId: id },
    [],
    page,
    limit
  );
  const total = await candidates.getTotalCount(
    { internshipcourseId: id },
    [],
    page,
    limit
  );
  return res.send({
    data: results,
    total: total,
  });
};
const create = async (req, res) => {
  const emailRegex =/^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const sdtRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const scoreRegex = /([0-9]+)/;[0-9]; 

  const id = req.params.id;
  const {
    fullName,
    tel,
    emailCandidate,
    internshipDomain,
    preferredSkills,
    university,
    faculty,
    currentYearofStudy,
    studentID,
    graduationYear,
    GPA,
    pcType,
    preferredInternshipStartDate,
    preferredInternshipDuration,
    internshipSchedule,
    idInternshipCourse,
    projectExperience,
    expectedGraduationSchedule,
    covidVaccinationiInformation,
    remainingSubjects,
    covidVaccinationCertificate,
    certificationDate,
  } = req.body;
  if (
    !fullName ||
    !tel ||
    !emailCandidate ||
    !internshipDomain ||
    !preferredSkills ||
    !university ||
    !faculty ||
    !currentYearofStudy ||
    !studentID ||
    !graduationYear ||
    !GPA ||
    !pcType ||
    !preferredInternshipStartDate ||
    !preferredInternshipDuration ||
    !internshipSchedule ||
    !idInternshipCourse ||
    !projectExperience ||
    !expectedGraduationSchedule ||
    !covidVaccinationiInformation ||
    !remainingSubjects ||
    !covidVaccinationCertificate ||
    !certificationDate
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Vui lòng điền đầy đủ thông tin !" });
  }
  if (fullName.length < 5 || fullName.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập đầy đủ Họ và tên !`,
    });
  }
  if (!sdtRegex.test(tel)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập đúng Số điện thoại ví dụ 0********** !`,
    });
  }
  if (!emailRegex.test(emailCandidate)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Đây không phải là email Vui lòng nhập lại !",
    });
  }
  if (internshipDomain.length < 5 || internshipDomain.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vị trí thực tập có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (preferredSkills.length < 5 || preferredSkills.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Kỹ năng ưa thích có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (university.length < 5 || university.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Trường đại học có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !`,
    });
  }
  if (faculty.length < 5 || faculty.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Khoa có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !`,
    });
  }
  if (currentYearofStudy !== "Năm 3" && currentYearofStudy !== "Năm 4") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng điền bạn thuộc sinh viên năm nào ? `,
    });
  }
  if (studentID.length < 5 || studentID.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Độ dài tối đa của mã sinh viên là 255, độ dài tối thiểu là 5 ký tự !`,
    });
  }
  if (preferredInternshipStartDate < "2020/01/01") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Ngày bắt đầu thực tập phải lớn hơn !!!",
    });
  }
  if (preferredInternshipDuration === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập thời gian bạn muốn thực tập !`,
    });
  }
  if (internshipSchedule === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập đầy đủ thông tin !`,
    });
  }
  if (!scoreRegex.test(GPA) ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập điểm trung bình tổng kết !`,
    });
  }
  if (idInternshipCourse === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập đầy đủ thông tin ! `,
    });
  }
  if (graduationYear === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng không để trống trường Năm học hiện tại`,
    });
  }
  if (projectExperience.length < 5 || projectExperience.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập các dự án đã tham gia nhưng không được quá 255 ký tự !`,
    });
  }
  if (
    expectedGraduationSchedule.length < 5 ||
    expectedGraduationSchedule.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập dự kiến tốt nghiệp nhưng không được quá 255 ký tự !`,
    });
  }
  if (remainingSubjects.length < 5 || remainingSubjects.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập các môn học còn lại nhưng không được quá 255 ký tự !`,
    });
  }
  if (
    covidVaccinationiInformation.length < 5 ||
    covidVaccinationiInformation.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng không nhập  thông tin tim chủng Covid quá 255 ký tự `,
    });
  }
  if (certificationDate === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự `,
    });
  }
  if (
    covidVaccinationCertificate.length < 5 ||
    covidVaccinationCertificate.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự `,
    });
  }

  if (pcType === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng điền thông tin loại máy thực tập !"`,
    });
  }

  const dateNow = new Date();
  const dateRequest = new Date(
    preferredInternshipStartDate.slice(0, 4) +
      "/" +
      preferredInternshipStartDate.slice(5, 7) +
      "/" +
      preferredInternshipStartDate.slice(8, 10) +
      ","
  );
  if (dateRequest.getTime() < dateNow.getTime()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Không được nhỏ hơn ngày hiện tại`,
    });
  }

  const result = await candidates.create({
    fullName: fullName,
    tel: tel,
    emailCandidate: emailCandidate,
    internshipDomain: internshipDomain,
    preferredSkills: preferredSkills,
    university: university,
    faculty: faculty,
    currentYearofStudy: currentYearofStudy,
    studentID: studentID,
    preferredInternshipStartDate: preferredInternshipStartDate,
    preferredInternshipDuration: preferredInternshipDuration,
    internshipSchedule: internshipSchedule,
    GPA: GPA,
    idInternshipCourse: idInternshipCourse,
    graduationYear: graduationYear,
    projectExperience: projectExperience,
    expectedGraduationSchedule: expectedGraduationSchedule,
    remainingSubjects: remainingSubjects,
    covidVaccinationiInformation: covidVaccinationiInformation,
    certificationDate: certificationDate,
    covidVaccinationCertificate: covidVaccinationCertificate,
    pcType: pcType,
  });

  return res.status(statusCodes.OK).json({
    status: result,
    error: result ? "Create successfully" : "Candidate not exits !!!",
  });
};

const remove = async (req, res) => {
  const id = req.params.id;
  const result = await candidates.remove({ candidateId: id });
  return res.status(statusCodes.OK).json({
    status: result,
    error: result ? "Success" : "Candidate not exists",
  });
};
const update = async (req, res) => {
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const id = req.params.id;
  const {
    fullName,
    tel,
    emailCandidate,
    idDG,
    interviewTime,
    interviewDate,
    status,
    remark,
    idMentor,
    technicalComments,
    technicalScore,
    attitude,
    englishCommunication,
    comments,
    remarks,
    internshipDomain,
    preferredSkills,
    university,
    faculty,
    currentYearofStudy,
    studentID,
    preferredInternshipStartDate,
    preferredInternshipDuration,
    internshipSchedule,
    GPA,
    idInternshipCourse,
    graduationYear,
    projectExperience,
    expectedGraduationSchedule,
    remainingSubjects,
    covidVaccinationiInformation,
    certificationDate,
    covidVaccinationCertificate,
    interviewLink,
    interviewer,
    emailInterviewer,
    pcType,
  } = req.body;
  if (
    !fullName ||
    !tel ||
    !emailCandidate ||
    !idDG ||
    !interviewTime ||
    !interviewDate ||
    !status ||
    !remark ||
    !idMentor ||
    !technicalComments ||
    !technicalScore ||
    !attitude ||
    !englishCommunication ||
    !comments ||
    !remarks ||
    !internshipDomain ||
    !preferredSkills ||
    !university ||
    !faculty ||
    !currentYearofStudy ||
    !studentID ||
    !preferredInternshipStartDate ||
    !preferredInternshipDuration ||
    !internshipSchedule ||
    !GPA ||
    !idInternshipCourse ||
    !graduationYear ||
    !projectExperience ||
    !expectedGraduationSchedule ||
    !remainingSubjects ||
    !covidVaccinationiInformation ||
    !certificationDate ||
    !covidVaccinationCertificate ||
    !interviewLink ||
    !interviewer ||
    !emailInterviewer ||
    !pcType
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Vui lòng điền đầy đủ thông tin!" });
  }
  if (fullName.length < 5 || fullName.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập đầy đủ Họ tên!`,
    });
  }
  if (tel.length !== 10) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập lại Số điện thoại!`,
    });
  }
  if (!emailRegex.test(emailCandidate)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Đây không phải là địa chỉ Email!",
    });
  }
  if (idDG === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Bạn cần nhập đúng thông tin Nhóm thực tập !`,
    });
  }

  if (interviewDate < "2020/01/01") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Ngày phỏng vấn không hợp lệ phải lớn hơn 01/01/2020 !",
    });
  }

  if (status !== "Pass" && status !== "Fail") {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Vui lòng chọn Pass hoặc Fail" });
  }

  if (remark.length < 5 || remark.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Chú thích có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (idMentor === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Bạn cần nhập thông tin chính xác Mentor`,
    });
  }
  if (technicalComments.length < 5 || technicalComments.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `TechnicalComments có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (technicalScore.length < 5 || technicalScore.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Độ dài tối đa của Điểm kỹ thuật là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (attitude.length < 5 || attitude.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Thái độ có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (englishCommunication.length < 5 || englishCommunication.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Tiếng Anh giao tiếp có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (comments.length < 5 || comments.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Nhận xét có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (remarks.length < 5 || remarks.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Các nhận xét có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (internshipDomain.length < 5 || remarks.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vị trí thực tập có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (preferredSkills.length < 5 || preferredSkills.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Kỹ năng ưa thích có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (university.length < 5 || university.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Trường đại học có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !`,
    });
  }
  if (faculty.length < 5 || faculty.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Khoa có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !`,
    });
  }
  if (currentYearofStudy !== "3rd year" && currentYearofStudy !== "4th year") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng điền bạn là sinh viên 3rd year hoặc 4th year`,
    });
  }
  if (studentID.length < 5 || studentID.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Độ dài của Mã sinh viên tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (preferredInternshipStartDate < "2020/01/01") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Ngày sinh không hợp lệ phải lớn hơn 01/01/2020 !!!",
    });
  }
  if (
    preferredInternshipDuration.length < 5 ||
    preferredInternshipDuration.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự !!!`,
    });
  }
  if (internshipSchedule === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Bạn cần nhập thông tin chính xác Lịch thực tập`,
    });
  }
  if (GPA.length !== 3 && GPA.length !== 4 && GPA.length !== 1) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập đúng điểm trung bình !!!`,
    });
  }
  if (idInternshipCourse === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Bạn cần nhập chính xác thông tin Khóa học Thực tập`,
    });
  }
  if (graduationYear.length < 5 || graduationYear.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `GraduationYear có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự`,
    });
  }
  if (projectExperience.length < 5 || projectExperience.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `ProjectExperience có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự`,
    });
  }
  if (
    expectedGraduationSchedule.length < 5 ||
    expectedGraduationSchedule.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Lịch trình Tốt nghiệp Dự kiến ​​có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự`,
    });
  }
  if (remainingSubjects.length < 5 || remainingSubjects.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng nhập các môn học còn lại nhưng không được quá 255 ký tự`,
    });
  }
  if (
    covidVaccinationiInformation.length < 5 ||
    covidVaccinationiInformation.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Thông tin tiêm chủng Covid có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tựs `,
    });
  }
  if (certificationDate.length < 5 || certificationDate.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Độ dài tối đa của ngày chứng nhận là 255, độ dài tối thiểu là 5 ký tự `,
    });
  }
  if (
    covidVaccinationCertificate.length < 5 ||
    covidVaccinationCertificate.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Giấy chứng nhận tiêm chủng Covid có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự `,
    });
  }
  if (interviewLink==="") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Liên kết phỏng vấn có độ dài tối đa là 255, độ dài tối thiểu là 5 ký tự`,
    });
  }
  if (interviewer === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Bạn cần nhập đúng thông tin Người phỏng vấn !`,
    });
  }
  if (!emailRegex.test(emailInterviewer)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Đây không phải là Email!",
    });
  }
  if (pcType === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Vui lòng chọn thiết bị thực tập`,
    });
  }

  const result = await candidates.update({
    fullName: fullName,
    tel: tel,
    emailCandidate: emailCandidate,
    idDG: idDG,
    interviewTime: interviewTime,
    interviewDate: interviewDate,
    status: status,
    remark: remark,
    idMentor: idMentor,
    technicalComments: technicalComments,
    technicalScore: technicalScore,
    attitude: attitude,
    englishCommunication: englishCommunication,
    comments: comments,
    remarks: remarks,
    internshipDomain: internshipDomain,
    preferredSkills: preferredSkills,
    university: university,
    faculty: faculty,
    currentYearofStudy: currentYearofStudy,
    studentID: studentID,
    preferredInternshipStartDate: preferredInternshipStartDate,
    preferredInternshipDuration: preferredInternshipDuration,
    internshipSchedule: internshipSchedule,
    GPA: GPA,
    idInternshipCourse: idInternshipCourse,
    graduationYear: graduationYear,
    projectExperience: projectExperience,
    expectedGraduationSchedule: expectedGraduationSchedule,
    remainingSubjects: remainingSubjects,
    covidVaccinationiInformation: covidVaccinationiInformation,
    certificationDate: certificationDate,
    covidVaccinationCertificate: covidVaccinationCertificate,
    interviewLink: interviewLink,
    interviewer: interviewer,
    emailInterviewer: emailInterviewer,
    pcType: pcType,
    idCandidate: id,
  });
  return res.status(statusCodes.OK).json({
    data: result,
    message: result ? "Update successfully" : "Candidate not exits !!!",
  });
};

module.exports = {
  create,
  getCandidate,
  getBatch,
  remove,
  update,
};
