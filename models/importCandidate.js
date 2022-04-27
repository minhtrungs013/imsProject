module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("candidates", {
    idCandidate: {
      type: Sequelize.INTEGER,
      length: 15,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    tel: { type: "string", length: 10 },
    emailCandidate: { type: "string", validate: { isEmail: true } },
    idDG: {
      type: Sequelize.INTEGER,
      length: 15,
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
      length: 15,
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
        len: [2, 255],
      },
    },
    technicalScore: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    attitude: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    englishCommunication: {
      type: "string",
      validate: {
        len: [2, 255],
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
        len: [2, 255],
      },
    },
    internshipDomain: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    preferredSkills: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    university: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    faculty: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    currentYearofStudy: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    studentID: { type: "string" },
    preferredInternshipStartDate: { type: "date" },
    preferredInternshipDuration: { type: "string" },
    internshipSchedule: { type: "string" },
    GPA: { type: "float", length: 15 },
    idInternshipCourse: {
      type: Sequelize.INTEGER,
      length: 15,
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
        len: [2, 255],
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
        len: [2, 255],
      },
    },
    remainingSubjects: { type: "string" },
    covidVaccinationiInformation: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    certificationDate: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    covidVaccinationCertificate: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    interViewLink: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    interViewer: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    emailInterViewer: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    pcType: {
      type: "string",
      validate: {
        len: [2, 255],
      },
    },
    deleteAt: { type: Sequelize.TIME },
  });
  return Tutorial;
};
