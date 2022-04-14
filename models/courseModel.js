const connect = require("../config/db");
const util = require("util");

const Internshipcourse = (internshipcourse) => {
  this.idInternshipCourse = internshipcourse.idInternshipCourse;
  this.nameCoure = internshipcourse.nameCoure;
  this.dateStart = internshipcourse.dateStart;
  this.dateEnd = internshipcourse.dateEnd;
  this.status = internshipcourse.status;
  this.kindOfInternship = internshipcourse.kindOfInternship;
};

Internshipcourse.getList = async (condition) => {
  try {
    const listColumn = "*";
    const strSql = `SELECT ${listColumn} FROM internshipcourse `;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(strSql);
    return condition(result);
  } catch (err) {
    console.log(err);
  }
};

Internshipcourse.getId = async (condition) => {
  try {
    const where = buildWhere(condition);
    const listColumn = "*";
    const strSql = `SELECT ${listColumn} FROM internshipcourse WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

Internshipcourse.create = async (condition, result) => {
  try {
    const sql ='SELECT * FROM internshipcourse WHERE nameCoure = "' + condition.nameCoure + '" ';
    const strSql = `INSERT INTO internshipcourse SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    await query(sql, async (err, res) => {
      if (res[0] === undefined) {
        await query(strSql, condition, (err, response) => {
          return result({
            idInternshipCourse: response.insertId,
            ...condition,
          });
        });
      }
      return result({ error: `Tên ${condition.nameCoure} đã tồn tại` });
    });
  } catch (err) {
    result(err);
  }
};
Internshipcourse.update = async (condition, results) => {
  try {
    const sql ='SELECT * FROM internshipcourse WHERE nameCoure = "' + condition.nameCoure + '" ';
    const where = buildWhere(condition);
    const sqlStr = `UPDATE internshipcourse SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    await query(sql, async (err, res) => {
      if (res[0] === undefined) {
        const result = await query(sqlStr, condition);
        if (result.affectedRows !== 0) {
          return results({ message: "Cập nhật thành công" });
        }
        return results({ error: "ID không tồn tại" });
      }
      return results({ error: `Tên ${condition.nameCoure} Đã tồn tại` });
    });
  } catch (err) {
    results(err);
    throw err;
  }
};

Internshipcourse.delete = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `DELETE FROM internshipcourse WHERE ${where}`;
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
  if (condition.idInternshipCourse) {
    strWhere += " AND idInternshipCourse = " + condition.idInternshipCourse;
  }
  return strWhere;
};

Internshipcourse.STATUS_DONE = "Done";
Internshipcourse.STATUS_IN_PROGRESS = "In progress";
Internshipcourse.KOD_FULL_TIME = "Full time";
Internshipcourse.KOD_PARTIAL_TIME = "Part time";

module.exports = Internshipcourse;