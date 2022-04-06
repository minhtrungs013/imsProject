const connect = require("../config/db");
const util = require('util');

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
        const where = buildWhere(condition)
        let listColumn = "*"
        if (columns && columns.length > 0) {
            listColumn = columns.join()
        }

        let offset = 0
        if (page > 1) {
            offset = (page - 1) * limit;
        }

        const strSql = `SELECT ${listColumn} FROM mentor WHERE ${where} LIMIT ${limit} OFFSET ${offset}`
        const query = util.promisify(connect.query).bind(connect);
        return await query(strSql)
    } catch (err) {
        console.log(err)
    }
};

Mentor.getTotalCount = async (condition) => {
    try {
        const where = buildWhere(condition)
        const sql = `SELECT count(*) as totalCount FROM mentor WHERE ${where}`
        const query = util.promisify(connect.query).bind(connect);
        const result = await query(sql)
        return result[0].totalCount
    }catch (err){
        console.log(err.message)
        throw err
    }
}

const buildWhere = (condition) => {
    let strWhere = '1=1'

    if (condition.mentorId) {
        strWhere += ' AND idMentor = ' + condition.mentorId
    }

    return strWhere
}

Mentor.detailBatch = (id, result) => {
    connect.query(
        `SELECT mentor.idMentor,
                mentor.fullNameMentor,
                mentor.dayOfBirth,
                mentor.gender,
                mentor.workplace,
                mentor.email,
                mentor.address,
                mentor.postion,
                dg.nameDG,
                internshipCourse.nameCoure
         FROM mentor
                  INNER JOIN internshipcourse
                  INNER JOIN dg
         WHERE mentor.idInternshipCourse = internshipcourse.idInternshipCourse
           AND mentor.idDG = dg.idDG
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

Mentor.remove = async (condition) => {
    try {
        const where = buildWhere(condition);
        const sql = `DELETE FROM mentor WHERE ${where}`
        const query = util.promisify(connect.query).bind(connect);
        const result = await query(sql)
        return result.affectedRows !== 0
    }catch (err){
        console.log(err.message)
        throw err
    }
};

Mentor.create = (data, result) => {
    connect.query("INSERT INTO mentor SET ?", data, (err, mentor) => {
        if (err) {
            return result({error: "Value not exits!!!!"}, null);
        } else {
            result({ID_mentor: mentor.insertId, ...data});
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
                return result({error: "Value not exits!!!!"}, null);
            } else {
                result(id);
            }
        }
    );
};

module.exports = Mentor;
