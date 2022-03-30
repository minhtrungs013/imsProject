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
    "assessment",
    {
      idAssessment: {
        type: "int",
        length: 15,
        primaryKey: true,
        autoIncrement: true,
      },
      idInternshipCourse: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_assessment_internshipcourse",
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
      idInternship: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_assessment_internship",
          table: "internship",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: {
            idInternship: "idInternship",
          },
        },
      },
      IdMentor: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_assessment_mentor",
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
      evaluationDate: { type: "date" },
      report1: { type: "int", length: 11 },
      report2: { type: "int", length: 11 },
      report3: { type: "int", length: 11 },
      report4: { type: "int", length: 11 },
      finalReport: { type: "int", length: 11 },
      technicalSkill: "string",
    },
    callback
  );
};

exports.down = function (db) {
  db.dropTable("assessment");
  return null;
};

exports._meta = {
  version: 1,
};
