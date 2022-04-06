const mentorModel = require("../models/mentorModels");
const statusCodes = require("http-status-codes");

const get = (req, res) => {
  mentorModel.get((data) => {
    res.send(data);
  });
};
const getPage = (req, res) => {
  let id = req.params.id;
  if (id === " ") {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: "You need to choose who to detail!" });
  }
  mentorModel.getPage(id, (response) => {
    res.send(response);
  });
};
const detail = (req, res) => {
  const id = req.params.id;
  if (id === " ") {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: "You need to choose who to detail!" });
  }
  mentorModel.detail(id, (response) => {
    res.send(response);
  });
};

const detailBatch = (req, res) => {
  mentorModel.detailBatch(req.params.id, (response) => {
    res.send(response);
  });
};

const remove = (req, res) => {
  const id = req.params.id;
  if (id === " ") {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: "You need to choose who to delete!" });
  }
  mentorModel.remove(id, (response) => {
    res.status(statusCodes.OK).json(response);
  });
};
const create = (req, res) => {
  const {
    fullNameMentor,
    dayOfBirth,
    gender,
    address,
    workplace,
    email,
    postion,
    idDG,
    idInternshipCourse,
  } = req.body;
  if (
    !fullNameMentor ||
    !dayOfBirth ||
    !address ||
    !gender ||
    !workplace ||
    !email ||
    !postion ||
    !idDG ||
    !idInternshipCourse
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: "Please enter information" });
  }
  if (fullNameMentor.length < 5 || fullNameMentor.length > 255) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: "Your name has exceeded the allowed limit !!!" });
  }

  mentorModel.create(
    {
      fullNameMentor,
      dayOfBirth,
      gender,
      address,
      workplace,
      email,
      postion,
      idDG,
      idInternshipCourse,
    },
    (response) => {
      res.status(statusCodes.OK).json({ message: "Cretae successfully" });
    }
  );
};
const update = (req, res) => {
  const {
    idMentor,
    fullNameMentor,
    dayOfBirth,
    gender,
    address,
    workplace,
    email,
    postion,
    idDG,
    idInternshipCourse,
  } = req.body;
  if (
    !fullNameMentor ||
    !dayOfBirth ||
    !address ||
    !gender ||
    !workplace ||
    !email ||
    !postion ||
    !idDG ||
    !idInternshipCourse
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: "Please enter information" });
  }
  if (fullNameMentor.length < 5 || fullNameMentor.length > 255) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: "Your name has exceeded the allowed limit !!!" });
  }
  mentorModel.update(
    {
      idMentor,
      fullNameMentor,
      dayOfBirth,
      gender,
      address,
      workplace,
      email,
      postion,
      idDG,
      idInternshipCourse,
    },
    (response) => {
      res.status(statusCodes.OK).json(response);
    }
  );
};
// const update = (req, res) => {
//   const id = req.body;
//   mentorModel.update(id, (response) => {
//     res.send({ result: response });
//   });
// };
module.exports = { get, detailBatch, detail, update, create, remove, getPage };
