const connect = require("../config/db");

const Mentor = (mentor) => {
  this.idMentor = mentor.idMentor;
  this.fullNameMentor = mentor.fullName;
  this.dayOfBirth = mentor.dayOfBirth.getUTCSecond();
  this.gender = mentor.gender;
  this.address = mentor.address;
  this.workplace = mentor.workplace;
  this.email = mentor.email;
  this.postion = mentor.postion;
  this.idDG = mentor.idDG;
  this.idInternshipCourse = mentor.idInternshipCourse;
};

Mentor.get = (result) => {
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
    `SELECT mentor.idMentor, mentor.fullNameMentor,mentor.dayOfBirth,mentor.gender,mentor.workplace,
    mentor.email,mentor.address,mentor.postion,dg.nameDG,internshipCourse.nameCoure
     FROM mentor INNER JOIN internshipcourse  INNER JOIN dg
     WHERE mentor.idInternshipCourse = internshipcourse.idInternshipCourse  AND mentor.idDG = dg.idDG
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
    "SELECT * FROM mentor WHERE idMentor  = ?",
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

Mentor.remove = (id, result) => {
  connect.query("DELETE FROM mentor WHERE idMentor = ? ", id, (err, mentor) => {
    if (err) {
      result(null);
    } else {
      result("Xóa thành công !");
    }
  });
};

Mentor.create = (data, result) => {
  connect.query("INSERT INTO mentor SET ?", data, (err, mentor) => {
    if (err) {
      result(null);
    } else {
      result({ ID_mentor: mentor.insertId, ...data });
    }
  });
};

Mentor.update = (id, result) => {
  connect.query(
    `UPDATE mentor SET fullNameMentor = ?,dayOfBirth =?,gender=?,address=?,workplace=?,email=?,postion=?,idDG=?,idInternshipCourse=? 
    WHERE idMentor=?`,
    [
      id.fullNameMentor,
      id.dayOfBirth,
      id.gender,
      id.address,
      id.workplace,
      id.email,
      id.postion,
      id.idDG,
      id.idInternshipCourse,
      id.idMentor,
    ],
    (err, mentor) => {
      if (err) {
        result(null);
      } else {
        result(id);
      }
    }
  );
};

module.exports = Mentor;
