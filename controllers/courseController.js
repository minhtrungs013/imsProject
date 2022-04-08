const courseModel = require("../models/courseModel");
const statusCodes = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config();
const getList = async (req, res) => {
  await courseModel.getList((response) => {
    return res.status(statusCodes.OK).json({data: response});
  });
};

const details = async (req, res) => {
  const id = req.params.id;
  const results = await courseModel.getId({ idInternshipCourse: id });
  return res.status(statusCodes.OK).json({data: results[0]});
};

const create = async (req, res) => {
  const { nameCoure, dateStart, dateEnd, status, kindOfInternship } = req.body;
  if (!nameCoure || !dateStart || !dateEnd || !status || !kindOfInternship) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "You need to enter all the information" });
  }
  if (nameCoure.length > 255 || nameCoure.length < 6) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Minimum 6 characters and maximum 255 characters" });
  }
  if (dateStart >= dateEnd) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Start date must be less than end date" });
  }
  if (
    status !== courseModel.STATUS_DONE &&
    status !== courseModel.STATUS_IN_PROGRESS
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "status must be Done or In Progress" });
  }
  if (
    kindOfInternship !== courseModel.KOD_FULL_TIME &&
    kindOfInternship !== courseModel.KOD_PARTIAL_TIME
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "kind Of Internship must be Fulltime or Parttime" });
  }
  await courseModel.create(
    { nameCoure, dateStart, dateEnd, status, kindOfInternship },
    (result) => {
      return res.status(statusCodes.OK).json(result);
    }
  );
};

const update = async (req, res) => {
  const idInternshipCourse = req.params.id;
  const { nameCoure, dateStart, dateEnd, status, kindOfInternship } = req.body;
  if (!nameCoure || !dateStart || !dateEnd || !status || !kindOfInternship) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "You need to enter all the information" });
  }
  if (nameCoure.length > 255 || nameCoure.length < 6) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Minimum 6 characters and maximum 255 characters" });
  }
  if (dateStart >= dateEnd) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Start date must be less than end date" });
  }
  if (
    status !== courseModel.STATUS_DONE &&
    status !== courseModel.STATUS_IN_PROGRESS
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "status must be Done or In Progress" });
  }
  if (
    kindOfInternship !== courseModel.KOD_FULL_TIME &&
    kindOfInternship !== courseModel.KOD_PARTIAL_TIME
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "kind Of Internship must be Fulltime or Parttime" });
  }
  const result = await courseModel.update({
    idInternshipCourse,
    nameCoure,
    dateStart,
    dateEnd,
    status,
    kindOfInternship,
  });
  return res.status(statusCodes.OK).json({
    status: result,
    message: result ? "Success" : "Update not axists",
  });
};

const del = async (req, res) => {
  const id = req.params.id;
  if (id === " ") {
    return res.status(statusCodes.NOT_FOUND).json({ error: "Not Found" });
  }
  const result = await courseModel.delete({ idInternshipCourse: id });
  return res.status(statusCodes.OK).json({
    status: result,
    message: result ? "Success" : "InternshipCourse not exists",
  });
};

module.exports = {
  getList: getList,
  details: details,
  update: update,
  create: create,
  del: del,
};
