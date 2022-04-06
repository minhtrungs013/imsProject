const connect = require("../config/db");

const Internshipcourse = (internshipcourse) => {
  this.idInternshipCourse = internshipcourse.idInternshipCourse;
  this.nameCoure = internshipcourse.nameCoure;
  this.dateStart = internshipcourse.dateStart;
  this.dateEnd = internshipcourse.dateEnd;
  this.status = internshipcourse.status;
  this.kindOfInternship = internshipcourse.kindOfInternship;
};

Internshipcourse.getListCoure = (result) => {
  connect.query(
    "SELECT idInternshipCourse, nameCoure FROM internshipcourse",
    (err, internshipcourse) => {
      if (err) {
        result(null);
      } else {
        result(internshipcourse);
      }
    }
  );
};

Internshipcourse.getIdCoure = (id, result) => {
  connect.query(
    "SELECT nameCoure FROM internshipcourse WHERE idInternshipCourse = ?",
    id,
    (err, internshipcourse) => {
      if (err) {
        result(null);
      } else {
        result(internshipcourse);
      }
    }
  );
};

Internshipcourse.createCourse = (data, result) => {
  connect.query(
    "INSERT INTO internshipcourse SET ?",
    data,
    (err, internshipcourse) => {
      if (err) {
        result(null);
      } else {
        result({ idInternshipCourse: internshipcourse.insertId, ...data });
      }
    }
  );
};
(Internshipcourse.update = (id, result) => {
  connect.query(
    "UPDATE internshipcourse SET nameCoure = ?,dateStart =?,dateEnd=?,status=?,kindOfInternship=? WHERE idInternshipCourse=?",
    [
      id.nameCoure,
      id.dateStart,
      id.dateEnd,
      id.status,
      id.kindOfInternship,
      id.idInternshipCourse,
    ],
    (err, internshipcourse) => {
      if (err) {
        result(null);
      } else {
        result(id);
      }
    }
  );
}),
  (Internshipcourse.deleteCourse = (id, result) => {
    connect.query(
      "DELETE FROM internshipcourse WHERE idInternshipCourse = ?",
      id,
      (err, internshipcourse) => {
        if (err) {
          return result(err);
        }
        if (internshipcourse.affectedRows === 0) {
          return result({ error: "Not Found" });
        }
        return result(internshipcourse);
      }
    );
  });

module.exports = Internshipcourse;
