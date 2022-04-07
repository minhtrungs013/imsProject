const courseModel = require("../models/courseModel");
const statusCodes = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config();
const getList = (req, res) => {
  courseModel.getList((response) => {
    return res.status(statusCodes.OK).json(response);
  });
};

const details = async (req, res) => {
  const id = req.params.id;
  const results = await courseModel.getId({ idInternshipCourse: id });
  return res.status(statusCodes.OK).json(results);
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
      .json({ error: "You need to enter the correct information" });
  }
  if (dateStart >= dateEnd) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "You need to enter the correct information" });
  }
  if (
    status !== process.env.STATUS_DONE &&
    status !== process.env.STATUS_IN_PROGRESS
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "You need to enter the correct information" });
  }
  if (
    kindOfInternship !== process.env.KOD_FULL_TIME &&
    kindOfInternship !== process.env.KOD_PARTIAL_TIME
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "You need to enter the correct information" });
  }
  await courseModel.create(
    { nameCoure, dateStart, dateEnd, status, kindOfInternship },
    (result) => {
      return res
        .status(statusCodes.OK)
        .json({ message: result ? "Success" : "Create fail" });
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
  if (idInternshipCourse === " ") {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "You need to enter the correct information" });
  }
  if (nameCoure.length > 255 || nameCoure.length < 6) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "You need to enter the correct information" });
  }
  if (dateStart >= dateEnd) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "You need to enter the correct information" });
  }
  if (
    status !== process.env.STATUS_DONE &&
    status !== process.env.STATUS_IN_PROGRESS
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "You need to enter the correct information" });
  }
  if (
    kindOfInternship !== process.env.KOD_FULL_TIME &&
    kindOfInternship !== process.env.KOD_PARTIAL_TIME
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "You need to enter the correct information" });
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
