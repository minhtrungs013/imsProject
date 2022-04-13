const connect = require("../config/db");
const util = require("util");

const Dg = (dg) => {
  this.idDG = dg.idDG;
  this.nameDG = dg.nameDG;
};

Dg.getList = async (condition) => {
  try {
    const listColumn = "nameDG";
    const strSql = `SELECT ${listColumn} FROM dg `;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(strSql);
    return condition(result);
  } catch (err) {
    console.log(err.message);
  }
};

Dg.create = async (condition) => {
  try {
    const sql = `INSERT INTO dg SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Dg.update = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE dg SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Dg.remove = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `DELETE FROM dg WHERE ${where}`;
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

  if (condition.idDG) {
    strWhere += " AND idDG = " + condition.idDG;
  }

  return strWhere;
};

module.exports = Dg;
