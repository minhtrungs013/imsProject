module.exports = (sequelize, Sequelize) => {
  const Candidate = sequelize.define("candidates", {
    idCandidate: {
      type: Sequelize.INTEGER,
      enum: 15,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    tel: { type: "string", validate: { len: [0 - 10], isNumeric: true } },
    emailCandidate: { type: "string", validate: { isEmail: true } },
    idDG: {
      type: Sequelize.INTEGER,
      enum: 15,
      foreignKey: {
        name: "pk_candidate_dg",
        table: "dg",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT",
        },
        mapping: {
          idDG: "idDG",
        },
      },
    },
    interviewTime: { type: "time" },
    interviewDate: { type: "date" },
    status: "string",
    remark: "string",
    idMentor: {
      type: Sequelize.INTEGER,
      enum: 15,
      foreignKey: {
        name: "pk_candidate_mentor",
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
    technicalComments: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    technicalScore: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    attitude: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    englishCommunication: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    comments: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    remarks: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    internshipDomain: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    preferredSkills: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    university: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    faculty: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    currentYearofStudy: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    studentID: { type: "string" },
    preferredInternshipStartDate: { type: "date" },
    preferredInternshipDuration: { type: "string" },
    internshipSchedule: { type: "string" },
    GPA: { type: "float", enum: 15 },
    idInternshipCourse: {
      type: Sequelize.INTEGER,
      enum: 15,
      foreignKey: {
        name: "pk_candidate_internshipcouse",
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
    graduationYear: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    projectExperience: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    expectedGraduationSchedule: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    remainingSubjects: { type: "string" },
    covidVaccinationiInformation: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    certificationDate: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    covidVaccinationCertificate: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    interviewLink: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    interviewer: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    emailInterviewer: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    pcType: {
      type: "string",
      validate: {
        len: [5, 255],
      },
    },
    deleteAt: { type: Sequelize.TIME },
  });
  return Candidate;
};
