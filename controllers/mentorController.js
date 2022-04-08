const mentorModel = require("../models/mentor");
const statusCodes = require("http-status-codes");

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
  return res.send(results[0]);
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
  return res.send(results);
};

const create = async (req, res) => {
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
      message: "Your name has exceeded the allowed limit !!!",
    });
  }
  await mentorModel.create(
    {
      fullNameMentor: fullNameMentor,
      dayOfBirth: dayOfBirth,
      address: address,
      gender: gender,
      workplace: workplace,
      email: email,
      postion: postion,
      idDG: idDG,
      idInternshipCourse: idInternshipCourse,
    },
    (result) => {
      return res.status(statusCodes.OK).json({
        status: result,
        message: result ? "Create successfully" : "Create failed!!!",
      });
    }
  );
};

const update = async (req, res) => {
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
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({
        message: `The maximum length is 255, the minimum length is 5 characters !!!`,
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
