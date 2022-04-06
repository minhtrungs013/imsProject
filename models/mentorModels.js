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

Mentor.get = (result) => {
  connect.query("SELECT * FROM mentor", (err, mentor) => {
    if (err) {
      return result(null);
    } else {
      result(mentor);
    }
  });
};
Mentor.getPage = (result, res) => {
  var numPerPage = 2;
  var skip = (result - 1) * numPerPage;
  var limit = skip + "," + numPerPage;
  connect.query("SELECT count(*) as id FROM mentor", (err, rows) => {
    if (err) {
      result(err, null);
    } else {
      connect.query(
        "SELECT * FROM mentor LIMIT " + limit,
        function (err, rows) {
          if (err) {
            res(err, null);
          } else {
            res(rows);
          }
        }
      );
    }
  });
};
Mentor.detailBatch = (id, result) => {
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
Mentor.detail = (id, result) => {
  connect.query(
    "SELECT * FROM mentor WHERE idMentor  = ?",
    id,
    (err, mentor) => {
      if (err) {
        return result(null);
      } else {
        result(mentor);
      }
    }
  );
};
Mentor.remove = (id, result) => {
  connect.query("DELETE FROM mentor WHERE idMentor = ?", id, (err, mentor) => {
    if (err) {
      return result(null, err);
    }
    if (mentor.affectedRows == 0) {
      return result({ error: "Value not exits!!!!" }, null);
    }
    return result({ message: "Delete successfully !!!" });
  });
};

Mentor.create = (data, result) => {
  connect.query("INSERT INTO mentor SET ?", data, (err, mentor) => {
    if (err) {
      return result({ error: "Value not exits!!!!" }, null);
    } else {
      result({ ID_mentor: mentor.insertId, ...data });
    }
  });
};

Mentor.update = (id, result) => {
  connect.query(
    " UPDATE mentor SET fullNameMentor = ?,dayOfBirth =?,gender=?,address=?,workplace=?,email=?,postion=?,idDG=?,idInternshipCourse=? WHERE idMentor=?",
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
        return result({ error: "Value not exits!!!!" }, null);
      } else {
        result(id);
      }
    }
  );
};

module.exports = Mentor;
