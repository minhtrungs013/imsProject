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
    const where = buildWhere(condition);
    const strSql = `SELECT ${listColumn} FROM ${table} WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

Internshipcourse.getId = async (condition) => {
  try {
    const where = buildWhere(condition);
    const listColumn = "*";
    const strSql = `SELECT ${listColumn} FROM ${table} WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

Internshipcourse.create = async (condition) => {
  try {
    const strSql = `INSERT INTO ${table} SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(strSql, condition);
    if (result.affectedRows === 0) {
      return 0;
    }
    return result.insertId;
  } catch (err) {
    console.log(err);
  }
};
Internshipcourse.update = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE ${table} SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

Internshipcourse.delete = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `DELETE FROM ${table} WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const table = "internshipcourse";
const buildWhere = (condition) => {
  let strWhere = "1=1";
  if (condition.idInternshipCourse) {
    strWhere += " AND idInternshipCourse = " + condition.idInternshipCourse;
  }
  if (condition.nameCoures) {
    strWhere += " AND nameCoure = '" + condition.nameCoures +"' ";
  }
  return strWhere;
};

Internshipcourse.STATUS_DONE = "Done";
Internshipcourse.STATUS_IN_PROGRESS = "In progress";
Internshipcourse.KOD_FULL_TIME = "Full time";
Internshipcourse.KOD_PARTIAL_TIME = "Part time";

module.exports = Internshipcourse;