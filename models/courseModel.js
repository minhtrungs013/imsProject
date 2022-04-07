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
  }
};

Internshipcourse.create = async (condition, result) => {
  try {
    const strSql = `INSERT INTO internshipcourse SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    await query(strSql, condition).then((res) => {
      return result({ idInternshipCourse: res.insertId, ...condition });
    });
  } catch (err) {
    result(err);
  }
};
Internshipcourse.update = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE internshipcourse SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result= await query(sql, condition)
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

Internshipcourse.delete = async (condition) => {
  try {
    const where = buildWhere(condition);
    console.log(where);
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

module.exports = Internshipcourse;
