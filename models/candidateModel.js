const connect = require("../config/db");

const Candidate = (candidate) => {
  this.idCandidate = candidate.idCandidate;
  this.fullName= candidate.fullName;
  this.tel= candidate.tel;
  this.email= candidate.email;
  this.idDG= candidate.idDG;
  this.interviewTime= candidate.interviewTime;
  this.interviewDate= candidate.interviewDate;
  this.status= candidate.status;
  this.remark= candidate.remark;
  this.idMentor = candidate.idMentor;
  this.technicalComments= candidate.technicalComments;
  this.technicalScore= candidate.technicalScore;
  this.attitude= candidate.attitude;
  this.englishCommunication = candidate.englishCommunication;
  this.comments= candidate.comments;
  this.remarks= candidate.remarks;
  this.internshipDomain= candidate.internshipDomain;
  this.preferredSkills= candidate.preferredSkills;
  this.university= candidate.university;
  this.faculty= candidate.faculty;
  this.currentYearofStudy= candidate.currentYearOfStudy;
  this.studentID= candidate.studentID;
  this.preferredInternshipStartDate= candidate.preferredInternshipStartDate;
  this.preferredInternshipDuration= candidate.preferredInternshipDuration;
  this.internshipSchedule= candidate.internshipSchedule;
  this.GPA= candidate.GPA;
  this.idInternshipCourse= candidate.idInternshipCourse;
  this.GraduationYear= candidate.GraduationYear;
  this.ProjectExperience=candidate.ProjectExperience;
  this.ExpectedGraduationSchedule= candidate.ExpectedGraduationSchedule;
  this.RemainingSubjects= candidate.RemainingSubjects;
  this.CovidVaccinationiInformation= candidate.CovidVaccinationiInformation;
  this.CertificationDate= candidate.CertificationDate;
  this.CovidVaccinationCertificate= candidate.CovidVaccinationCertificate;
  this.InterviewLink= candidate.InterviewLink;
  this.pcType= candidate.pcType;

  
};
Candidate.get_all = (result) => {
  connect.query(
      "SELECT * FROM candidate", 
      (err, candidate) => {
    console.log(candidate);
    if (err) {
      result(null);
    } else {
      result(candidate);
    }
  });
};
Candidate.getByID = (id, result) => {
  connect.query(
    "SELECT candidate.fullName,candidate.email, mentor.fullNameMentor,dg.nameDG,candidate.internshipDomain,internshipcourse.nameCoure,candidate.status FROM `candidate` INNER JOIN dg INNER JOIN mentor INNER JOIN internshipcourse WHERE candidate.idDG = dg.idDG and candidate.idMentor = mentor.idMentor AND candidate.idInternshipCourse = internshipcourse.idInternshipCourse AND candidate.idCandidate ",
    id,
    (err, candidate) => {
      if (err) {
        result(null);
      } else {
        result(candidate);
      }
    }
  );
}
Candidate.getByIDcandidate = (id,result)=>{
    connect.query(
        "SELECT * FROM `candidate` INNER JOIN dg INNER JOIN mentor INNER JOIN internshipcourse WHERE candidate.idDG = dg.idDG and candidate.idMentor = mentor.idMentor AND candidate.idInternshipCourse = internshipcourse.idInternshipCourse AND candidate.idCandidate=1",
    id,
    (err, candidate) => {
      if (err) {
          
        result(null);
      } else {
        result(candidate);
      }
    }
  );
}

Candidate.create = (data, result) => {
  connect.query(
    "INSERT INTO candidate SET ?",
    data,
    (err, candidate) => {
      if (err) {
        result(null);
      } else {
        result({ idCandidate: candidate.insertId, ...data });
      }
    }
  );
};
Candidate.remove = (id, result) => {
  connect.query(
    "DELETE FROM candidate  WHERE idCandidate=?",
    id,
    (err, candidate) => {
      if (err) {
        result("Error");
      } else {
        result("Successfully deleted " + id );
      }
    }
  );
};
Candidate.update = (id,result)=>{
  console.log(id)

  connect.query(
      " UPDATE candidate SET fullName =?,tel =?,email=?,idDG=?,interviewTime=?,interviewDate=?,status=?,remark=?,idMentor=?,technicalComments=?,technicalScore=?,attitude=?, englishCommunication=?,comments=?,remarks=?,internshipDomain=?,preferredSkills=?,university=?,faculty=?,currentYearofStudy=?,studentID=?,preferredInternshipStartDate=?,preferredInternshipStartDate=?,internshipSchedule=?,GPA=?,idInternshipCourse=?,GraduationYear=?,	ProjectExperience=?,ExpectedGraduationSchedule=?,ExpectedGraduationSchedule=?,CovidVaccinationiInformation=?,CertificationDate=?,CovidVaccinationCertificate=?,InterviewLink=?,pcType=? WHERE idCandidate= ?",
  [id.fullName,id.tel,id.email,id.idDG,id.interviewTime,id.interviewDate,id.status,id.remark,id.idMentor,id.technicalComments,id.technicalScore,id.attitude,id.englishCommunication,id.comments,id.remarks,id.internshipDomain,id.preferredSkills,id.university,id.faculty,id.currentYearOfStudy,id.studentID,id.preferredInternshipStartDate,id.preferredInternshipDuration,id.internshipSchedule,id.GPA,id.idInternshipCourse,id.GraduationYear,id.ProjectExperience,id.ExpectedGraduationSchedule,id.RemainingSubjects,id.CovidVaccinationiInformation,id.CertificationDate,id.CovidVaccinationCertificate,id.InterviewLink,id.pcType,id.idCandidate], (err,candidate)=>{
      console.log(err)
      if(err){
          result("Error");
      }else {
          result("Successfully updated "+ id)

      }
  } )
}
module.exports = Candidate;