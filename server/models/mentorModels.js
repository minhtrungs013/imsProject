const connect = require("../config/db");

const Mentor = (mentor) => {
  this.idMentor = mentor.idMentor;
  this.fullNameMentor = mentor.fullName;
  this.dayOfBirth = mentor.dayOfBirth;
  this.gender = mentor.gender;
  this.address = mentor.address;
  this.workplace = mentor.workplace;
  this.email = mentor.email;
  this.postion = mentor.postion;
  this.idDG = mentor.idDG;
};

Mentor.get_all = (result) => {
  connect.query("SELECT * FROM mentor", (err, mentor) => {
    if (err) {
      result(null);
    } else {
      result(mentor);
    }
  });
};

Mentor.getByID = (id, result) => {
  connect.query(
    "SELECT mentor.idMentor, mentor.fullNameMentor,mentor.dayOfBirth,mentor.gender,mentor.workplace,mentor.email,mentor.address,mentor.postion FROM mentor INNER JOIN internshipcourse WHERE mentor.idInternshipCourse = internshipcourse.idInternshipCourse AND internshipcourse.idInternshipCourse = ? ",
    id,
    (err, mentor) => {
      if (err) {
        result(null);
      } else {
        result(mentor);
      }
    }
  );
};
Mentor.GetBatchID = (id, result) => {
  connect.query(
    "SELECT * FROM mentor WHERE idMentor  = ?",
    id,
    (err, mentor) => {
      if (err) {
        result(null);
        console.log(err);
      } else {
        result(mentor);
      }
    }
  );
};
module.exports = Mentor;
