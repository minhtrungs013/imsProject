"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable(
    "internship",
    {
      idInternship: {
        type: "int",
        length: 15,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: "string",
      gender: { type: "bit", length: 2 },
      address: "string",
      dayOfBirth: "date",
      university: "string",
      email: "string",
      idMentor: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_internship_mentor",
          table: "mentor",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: {
            idMentor: "idMentor",
          },
        },
      },
      pcType: "string",
      toeic: "string",
      internshipProject: "string",
      tel: { type: "string", length: 10 },
      securityTest: "string",
      idInternshipCourse: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_internship_internshipcourse",
          table: "internshipcourse",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: {
            idInternshipCourse: "idInternshipCourse",
          },
        },
      },
    },
    callback
  );
};

exports.down = function (db) {
  db.dropTable("internship");
  return null;
};

exports._meta = {
  version: 1,
};
