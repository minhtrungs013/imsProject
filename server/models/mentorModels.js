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
  this.idInternshipCourse = mentor.idInternshipCourse;
};

Mentor.get_all = (result) => {
  connect.query(
    `SELECT idMentor,fullNameMentor,dayOfBirth,gender,address,workplace,email,postion,idDG,idInternshipCourse
   FROM mentor`,
    (err, mentor) => {
      if (err) {
        result(null);
      } else {
        result(mentor);
      }
    }
  );
};

Mentor.getByID = (id, result) => {
  connect.query(
    `SELECT mentor.idMentor, mentor.fullNameMentor,mentor.dayOfBirth,mentor.gender,mentor.workplace,mentor.email,mentor.address,mentor.postion
     FROM mentor INNER JOIN internshipcourse
      WHERE mentor.idInternshipCourse = internshipcourse.idInternshipCourse
       AND internshipcourse.idInternshipCourse = ? `,
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
    `SELECT idMentor,fullNameMentor, dayOfBirth,gender,address,workplace,email, postion,idDG,idInternshipCourse 
    FROM mentor 
    WHERE idMentor = ?`,
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

Mentor.create = (data, result) => {
  connect.query("INSERT INTO mentor SET ?", data, (err, mentor) => {
    if (err) {
      result(null);
    } else {
      result({ idMentor: mentor.insertId, ...data });
    }
  });
};
module.exports = Mentor;
