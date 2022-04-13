const candidate = require("../models/candidate");
const statusCodes = require("http-status-codes");

const getcandidate = async (req, res) => {
  let page = 1,
    limit = 20;
  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  const id = req.params.id;
  const results = await candidate.getAll({}, [], page, limit);
  const total = await candidate.getTotalCount({}, [], page, limit);

  return res.send({ data: results, total: total });
};

const getBatch = async (req, res) => {
  let page = 1,
    limit = 20;

  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }

  const id = req.params.id;
  const results = await candidate.getBatch(
    { internshipcourseId: id },
    [],
    page,
    limit
  );
  const total = await candidate.getTotalCount(
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

const remove = async (req, res) => {
  const id = req.params.id;
  const result = await candidate.remove({ candidateId: id });
  return res.status(statusCodes.OK).json({
    status: result,
    message: result ? "Success" : "Candidate not exists",
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
    interViewLink,
    deleteAtt,
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
    !interViewLink ||
    !deleteAtt ||
    !pcType
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: "Please enter information !" });
  }
  if (fullName.length < 5 || fullName.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `Please re-enter the Name !`,
    });
  }
  if (tel.length !== 10) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `Please re-enter the phone !`,
    });
  }
  if (!emailRegex.test(emailCandidate)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "This is not an email !",
    });
  }
  if (idDG === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `You need to enter the correct information DG !`,
    });
  }

  if (interviewDate < "2020/01/01") {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid Interview Date must be greater than 01/01/2020 !",
    });
  }

  if (status !== "Pass" && status !== "Fail") {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "You need to enter only Pass of Fail" });
  }

  if (remark.length < 5 || remark.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The Remark is maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (idMentor === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `You need to enter the correct information Mentor`,
    });
  }
  if (technicalComments.length < 5 || technicalComments.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The technicalComments is maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (technicalScore.length < 5 || technicalScore.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The Technical Score maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (attitude.length < 5 || attitude.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The attitude is maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (englishCommunication.length < 5 || englishCommunication.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The English Commuication is maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (comments.length < 5 || comments.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The comments is maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (remarks.length < 5 || remarks.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The remarks is maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (internshipDomain.length < 5 || remarks.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The Interview Domain is maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (preferredSkills.length < 5 || preferredSkills.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The Preferred Skills is maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (university.length < 5 || university.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The university is maximum length is 255, the minimum length is 5 characters !`,
    });
  }
  if (faculty.length < 5 || faculty.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The Faculty is maximum length is 255, the minimum length is 5 characters !`,
    });
  }
  if (
    currentYearofStudy !== "2nd year" &&
    currentYearofStudy !== "3rd year" &&
    currentYearofStudy !== "4th year"
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `Current Year of Study is only 2nd year or 3rd year and 4th year `,
    });
  }
  if (studentID.length < 5 || studentID.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (preferredInternshipStartDate < "1960/01/01") {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid date of birth must be greater than 01/01/1960 !!!",
    });
  }
  if (
    preferredInternshipDuration.length < 5 ||
    preferredInternshipDuration.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (internshipSchedule === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `You need to enter the correct information Internship Schedule`,
    });
  }
  if (GPA.length !== 3 && GPA.length !== 4) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `You need to enter the correct GPA information !!!`,
    });
  }
  if (idInternshipCourse === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `You need to enter the correct information Internship Course`,
    });
  }
  if (graduationYear.length < 5 || graduationYear.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The GraduationYear is maximum length is 255, the minimum length is 5 characters`,
    });
  }
  if (projectExperience.length < 5 || projectExperience.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The ProjectExperience is maximum length is 255, the minimum length is 5 characters`,
    });
  }
  if (
    expectedGraduationSchedule.length < 5 ||
    expectedGraduationSchedule.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The ExpectedGraduationSchedule is maximum length is 255, the minimum length is 5 characters`,
    });
  }
  if (remainingSubjects.length < 5 || remainingSubjects.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The RemainingSubjects is maximum length is 255, the minimum length is 5 characters`,
    });
  }
  if (
    covidVaccinationiInformation.length < 5 ||
    covidVaccinationiInformation.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The CovidVaccinationiInformation is maximum length is 255, the minimum length is 5 characters `,
    });
  }
  if (certificationDate.length < 5 || certificationDate.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The CertificationDate ismaximum length is 255, the minimum length is 5 characters `,
    });
  }
  if (
    covidVaccinationCertificate.length < 5 ||
    covidVaccinationCertificate.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The CovidVaccinationCertificate is maximum length is 255, the minimum length is 5 characters `,
    });
  }
  if (interViewLink.length < 5 || interViewLink.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The InterviewLink is maximum length is 255, the minimum length is 5 characters`,
    });
  }
  if (pcType === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `You need to enter the correct information Pc Type`,
    });
  }
  if (deleteAtt === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `You need to enter the correct information `,
    });
  }

  const result = await candidate.update({
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
    interViewLink: interViewLink,
    pcType: pcType,
    deleteAtt: deleteAtt,
    idCandidate: id,
  });
  return res.status(statusCodes.OK).json({
    data: result,
    message: result ? "Update successfully" : "Candidate not exits !!!",
  });
};



module.exports = {
  getcandidate,
  getBatch,
  remove,
  update
};
