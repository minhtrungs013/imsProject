const mentorModel = require("../models/mentor");
const statusCodes = require("http-status-codes");
const { getMaxListeners } = require("../config/db");

const get = async (req, res) => {
  let page = 1,
    limit = 20;

  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }

  const results = await mentorModel.get({}, [], page, limit);
  const total = await mentorModel.getTotalCount({}, [], page, limit);
  return res.send({
    data: results,
    total: total,
  });
};

const detail = async (req, res) => {
  const id = req.params.id;
  const results = await mentorModel.get({ mentorId: id }, [], 1, 1);
  return res.send({ data: results[0] });
};

const remove = async (req, res) => {
  const id = req.params.id;
  const result = await mentorModel.remove({ mentorId: id });
  return res.status(statusCodes.OK).json({
    status: result,
    message: result ? "Delete successfully !!!" : "Mentor not exists",
  });
};

const detailBatch = async (req, res) => {
  let page = 1,
    limit = 20;

  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  const id = req.params.id;
  const results = await mentorModel.getdetailBatch(
    { internshipcourseId: id },
    [],
    page,
    limit
  );
  const total = await mentorModel.getTotalCount(
    { internshipcourseId: id },
    [],
    page,
    limit
  );
  return res.send({
    data: results,
    total: total,
  });
};

const create = async (req, res) => {
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

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
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (workplace.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid workplace length !!!",
    });
  }

  if (address.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid address length !!!",
    });
  }
  if (postion.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid postion length !!!",
    });
  }
  if (dayOfBirth < "1960/01/01") {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid date of birth must be greater than 01/01/1960 !!!",
    });
  }
  if (gender !== 0 && gender !== 1 && gender !== 2) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid gender get only 0,1 and 2 !!!",
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid email !!!",
    });
  }

  const results = await mentorModel.create({
    fullNameMentor: fullNameMentor,
    dayOfBirth: dayOfBirth,
    address: address,
    gender: gender,
    workplace: workplace,
    email: email,
    postion: postion,
    idDG: idDG,
    idInternshipCourse: idInternshipCourse,
  });
  return res.status(statusCodes.OK).json({
    status: results,
    message: results ? "Create successfully" : "Create failed!!!",
  });
};

const update = async (req, res) => {
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const id = req.params.id;
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
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }
  if (workplace.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid workplace length !!!",
    });
  }

  if (address.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid address length !!!",
    });
  }
  if (postion.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid postion length !!!",
    });
  }
  if (dayOfBirth < "1960/01/01") {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid date of birth must be greater than 01/01/1960 !!!",
    });
  }
  if (gender !== 0 && gender !== 1 && gender !== 2) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid gender get only 0,1 and 2 !!!",
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Invalid email !!!",
    });
  }

  const result = await mentorModel.update({
    fullNameMentor: fullNameMentor,
    dayOfBirth: dayOfBirth,
    address: address,
    gender: gender,
    workplace: workplace,
    email: email,
    postion: postion,
    idDG: idDG,
    idInternshipCourse: idInternshipCourse,
    idMentor: id,
  });
  return res.status(statusCodes.OK).json({
    message: result ? "Update successfully" : "Update faile !!!",
  });
};

module.exports = { get, detailBatch, detail, update, create, remove };
