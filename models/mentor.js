const connect = require("../config/db");
const util = require("util");

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

Mentor.get = async (condition, columns, page, limit) => {
  try {
    const where = buildWhere(condition);
    let listColumn = "*";
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }

    const strSql = `SELECT ${listColumn} FROM mentor WHERE ${where} LIMIT ${limit} OFFSET ${offset}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

Mentor.getTotalCount = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `SELECT count(*) as totalCount FROM mentor WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result[0].totalCount;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const buildWhere = (condition) => {
  let strWhere = "1=1";

  if (condition.mentorId) {
    strWhere += " AND idMentor = " + condition.mentorId;
  }

  return strWhere;
};
Mentor.getdetailBatch = async (condition, columns, page, limit) => {
  try {
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where1 = buildWhereDetail(condition);
    let listColumn = `mentor.idMentor,
      mentor.fullNameMentor,
      mentor.dayOfBirth,
      mentor.gender,
      mentor.workplace,
      mentor.email,
      mentor.address,
      mentor.postion,
      dg.nameDG,
      internshipCourse.nameCoure `;
    const strSql = `SELECT ${listColumn} FROM mentor INNER JOIN internshipcourse INNER JOIN dg 
    WHERE mentor.idInternshipCourse = internshipcourse.idInternshipCourse AND mentor.idDG = dg.idDG AND ${where1}  LIMIT ${limit} OFFSET ${offset} `;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};
const buildWhereDetail = (condition) => {
  let strWhere = "1=1";
  if (condition.internshipcourseId) {
    strWhere +=
      " AND internshipcourse.idInternshipCourse  = " +
      condition.internshipcourseId;
  }
  return strWhere;
};
Mentor.remove = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `DELETE FROM mentor WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

Mentor.create = async (condition, result) => {
  try {
    const sql = `INSERT INTO mentor SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    await query(sql, condition).then((res) => {
      return result({ idInternshipCourse: res.insertId, ...condition });
    });
  } catch (err) {
    console.log(err);
  }
};

Mentor.update = async (condition) => {
  try {
    const where = buildWhereUpdate(condition);
    const sql = `UPDATE mentor SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

const buildWhereUpdate = (condition) => {
  let strWhere = "1=1";
  if (condition.idMentor) {
    strWhere += " AND idMentor = " + condition.idMentor;
  }

  return strWhere;
};
module.exports = Mentor;
