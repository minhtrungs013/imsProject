const candidates = require("../models/candidate");
const statusCodes = require("http-status-codes");
const dateNow = new Date();

const getCandidate = async (req, res) => {
  let page = 1,
    limit = 20;
  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }

  const id = req.params.id;
  const results = await candidates.getByID(
    { idCandidate: id },
    [],
    page,
    limit
  );
  return res.status(statusCodes.OK).json({
    data: results,
  });
};

const getBatch = async (req, res) => {
  let page = 1,
    limit = 20;

  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }

  let fullName = "";
  if (req.query.fullName) {
    fullName = req.query.fullName;
  }

  const id = req.params.id;
  const results = await candidates.getBatch(
    { internshipcourseId: id, fullName: fullName },
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
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const sdtRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const scoreRegex = /^[0-9](\.[0-9]{1,2})?$|^10(\.[0]{1,2})?$/g;

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
      .json({ error: candidates.ErrorRequest });
  }

  const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  const checkForSpecialChar = function (string) {
    for (i = 0; i < specialChars.length; i++) {
      if (string.indexOf(specialChars[i]) > -1) {
        return true;
      }
    }
    return false;
  };
  if (checkForSpecialChar(fullName)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: candidates.ErrorNameSpecialChars });
  }

  if (fullName.length < 2 || fullName.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorNameLength,
    });
  }
  if (!sdtRegex.test(tel)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorSDT,
    });
  }
  if (!emailRegex.test(emailCandidate)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorEmail,
    });
  }
  if (internshipDomain.length < 2 || internshipDomain.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorInternshipDomain,
    });
  }
  if (preferredSkills.length < 2 || preferredSkills.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorPreferredSkill,
    });
  }
  if (university.length < 2 || university.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorUniversity,
    });
  }
  if (faculty.length < 2 || faculty.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorFaculty,
    });
  }
  if (currentYearofStudy === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorCurrentYearofStudy,
    });
  }
  if (studentID.length < 2 || studentID.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorStudentID,
    });
  }
  if (preferredInternshipDuration === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorPreferredInternshipDuration,
    });
  }
  if (internshipSchedule === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorInternshipSchedule,
    });
  }
  if (!scoreRegex.test(GPA)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorGPA,
    });
  }
  if (idInternshipCourse === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorIdInternshipCourse,
    });
  }
  if (graduationYear === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorGraduationYear,
    });
  }
  if (projectExperience.length < 2 || projectExperience.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorProjectExperience,
    });
  }
  if (
    expectedGraduationSchedule.length < 2 ||
    expectedGraduationSchedule.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorExpectedGraduationSchedule,
    });
  }
  if (remainingSubjects.length < 2 || remainingSubjects.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorRemainingSubjects,
    });
  }
  if (
    covidVaccinationiInformation.length < 2 ||
    covidVaccinationiInformation.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorCovidVaccinationiInformation,
    });
  }
  if (certificationDate === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorCertificationDate,
    });
  }
  if (
    covidVaccinationCertificate.length < 2 ||
    covidVaccinationCertificate.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorCovidVaccinationCertificate,
    });
  }

  if (pcType === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorPcType,
    });
  }

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
      error: candidates.ErrorPreferredInternshipStartDate,
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
    error: result ? candidates.Message_Done : candidates.Message_Error,
  });
};

const remove = async (req, res) => {
  const id = req.params.id;
  const result = await candidates.remove({ candidateId: id });
  return res.status(statusCodes.OK).json({
    status: result,
    error: result ? candidates.Message_Done : candidates.Message_Error,
  });
};
const update = async (req, res) => {
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const sdtRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const scoreRegex = /^[0-9](\.[0-9]{1,2})?$|^10(\.[0]{1,2})?$/g;
  [0 - 9];
  const id = req.params.id;
  const {
    fullName,
    tel,
    emailCandidate,
    idDG,
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
    graduationYear,
    projectExperience,
    expectedGraduationSchedule,
    remainingSubjects,
    covidVaccinationiInformation,
    certificationDate,
    covidVaccinationCertificate,
    pcType,
  } = req.body;
  if (
    !fullName ||
    !tel ||
    !emailCandidate ||
    !idDG ||
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
    !graduationYear ||
    !projectExperience ||
    !expectedGraduationSchedule ||
    !remainingSubjects ||
    !covidVaccinationiInformation ||
    !certificationDate ||
    !covidVaccinationCertificate ||
    !pcType
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: candidates.ErrorRequest });
  }
  if (fullName.length < 2 || fullName.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorFullName,
    });
  }
  if (!sdtRegex.test(tel)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorSDT,
    });
  }
  if (!emailRegex.test(emailCandidate)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorEmail,
    });
  }
  if (idDG === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorIdDG,
    });
  }

  if (status === "") {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: candidates.ErrorStatus });
  }
  if (remark.length < 2 || remark.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorRemark,
    });
  }
  if (idMentor === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorIdMentor,
    });
  }
  if (technicalComments.length < 2 || technicalComments.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorTechnicalComments,
    });
  }
  if (technicalScore.length < 2 || technicalScore.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorTechnicalScore,
    });
  }
  if (attitude.length < 2 || attitude.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorAttitude,
    });
  }
  if (englishCommunication.length < 2 || englishCommunication.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorEnglishCommunication,
    });
  }
  if (comments.length < 2 || comments.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorComments,
    });
  }
  if (remarks.length < 2 || remarks.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorRemarks,
    });
  }
  if (internshipDomain.length < 2 || remarks.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorInternshipDomain,
    });
  }
  if (preferredSkills.length < 2 || preferredSkills.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorPreferredSkill,
    });
  }
  if (university.length < 2 || university.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorUniversity,
    });
  }
  if (faculty.length < 2 || faculty.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorFaculty,
    });
  }
  if (currentYearofStudy === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorCurrentYearofStudy,
    });
  }
  if (studentID.length < 2 || studentID.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorStudentID,
    });
  }

  const DateRequest = new Date(
    preferredInternshipStartDate.slice(0, 4) +
      "/" +
      preferredInternshipStartDate.slice(5, 7) +
      "/" +
      preferredInternshipStartDate.slice(8, 10) +
      ","
  );
  if (DateRequest.getTime() < dateNow.getTime()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorPreferredInternshipStartDate,
    });
  }
  if (
    preferredInternshipDuration.length < 2 ||
    preferredInternshipDuration.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorPreferredInternshipDuration,
    });
  }
  if (internshipSchedule === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorInternshipSchedule,
    });
  }
  if (!scoreRegex.test(GPA)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorGPA,
    });
  }

  if (graduationYear.length < 2 || graduationYear.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorGraduationYear,
    });
  }
  if (projectExperience.length < 2 || projectExperience.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorProjectExperience,
    });
  }
  if (
    expectedGraduationSchedule.length < 2 ||
    expectedGraduationSchedule.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorExpectedGraduationSchedule,
    });
  }
  if (remainingSubjects.length < 2 || remainingSubjects.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorRemainingSubjects,
    });
  }
  if (
    covidVaccinationiInformation.length < 2 ||
    covidVaccinationiInformation.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorCovidVaccinationiInformation,
    });
  }
  if (certificationDate.length < 2 || certificationDate.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorCertificationDate,
    });
  }
  if (
    covidVaccinationCertificate.length < 2 ||
    covidVaccinationCertificate.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorCovidVaccinationCertificate,
    });
  }

  if (pcType === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidates.ErrorPcType,
    });
  }

  const result = await candidates.update({
    fullName: fullName,
    tel: tel,
    emailCandidate: emailCandidate,
    idDG: idDG,
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
    graduationYear: graduationYear,
    projectExperience: projectExperience,
    expectedGraduationSchedule: expectedGraduationSchedule,
    remainingSubjects: remainingSubjects,
    covidVaccinationiInformation: covidVaccinationiInformation,
    certificationDate: certificationDate,
    covidVaccinationCertificate: covidVaccinationCertificate,
    pcType: pcType,
    idCandidate: id,
  });
  return res.status(statusCodes.OK).json({
    data: result,
    message: result ? candidates.Message_Done : candidates.Message_Error,
  });
};

module.exports = {
  create,
  getCandidate,
  getBatch,
  remove,
  update
};
