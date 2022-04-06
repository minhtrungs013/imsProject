const courseModel = require("../models/courseModel");
const statusCodes = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config();
const getList = (req, res) => {
  courseModel.getListCoure((response) => {
    res.status(statusCodes.OK).json(response);
  });
};

const details = (req, res) => {
  const id = req.params.id;
  if (id === " ") {
    return res
      .status(statusCodes.NOT_FOUND)
      .json({ error: "Not Found" });
  }
  courseModel.getIdCoure(id, (response) => {
    res.status(statusCodes.OK).json(response);
  });
};

const create = (req, res) => {
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
  courseModel.createCourse(
    { nameCoure, dateStart, dateEnd, status, kindOfInternship },
    (response) => {
      res.status(statusCodes.OK).json(response);
    }
  );
};

const update = (req, res) => {
  const { idInternshipCourse, nameCoure, dateStart, dateEnd, status, kindOfInternship} = req.body;
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
  courseModel.update(
    { idInternshipCourse, nameCoure, dateStart, dateEnd, status, kindOfInternship},
    (response) => {
      res.status(statusCodes.OK).json({ message: "update successfully" });
    }
  );
};

const del = (req, res) => {
  const id = req.params.id;
  if (id === " ") {
    return res
      .status(statusCodes.NOT_FOUND)
      .json({ error: "Not Found" });
  }
  courseModel.deleteCourse(id, (response) => {
    res.status(statusCodes.OK).json(response);
  });
};

module.exports = {
  getList: getList,
  details: details,
  update: update,
  create: create,
  del: del,
};
