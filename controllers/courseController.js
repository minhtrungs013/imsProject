const courseModel = require("../models/courseModel");
const statusCodes = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config();
const getList = async (req, res) => {
  await courseModel.getList((response) => {
    return res.status(statusCodes.OK).json({ data: response });
  });
};

const details = async (req, res) => {
  const id = req.params.id;
  if (id === "undefined") {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Bạn cần điền đầy đủ thông tin" });
  }
  const results = await courseModel.getId({ idInternshipCourse: id });
  return res.status(statusCodes.OK).json({ data: results[0] });
};

const create = async (req, res) => {
  const { nameCoure, dateStart, dateEnd, status, kindOfInternship } = req.body;
  if (!nameCoure || !dateStart || !dateEnd || !status || !kindOfInternship) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Bạn cần điền đầy đủ thông tin" });
  }
  if (nameCoure.length > 255 || nameCoure.length < 6) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Tối thiểu 6 kí tự và tối đa 255 kí tự" });
  }
  if (dateStart >= dateEnd) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Ngày bắt đầu phải bé hơn ngày kết thúc" });
  }
  if (
    status !== courseModel.STATUS_DONE &&
    status !== courseModel.STATUS_IN_PROGRESS
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Trang thái thực tập phải là Done hoặc In progress" });
  }
  if (
    kindOfInternship !== courseModel.KOD_FULL_TIME &&
    kindOfInternship !== courseModel.KOD_PARTIAL_TIME
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Loại thực tập phải là Fulltime hoặc Parttime" });
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
      .json({ error: "Bạn cần điền đầy đủ thông tin" });
  }
  if (nameCoure.length > 255 || nameCoure.length < 6) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Tối thiểu 6 kí tự và tối đa 255 kí tự" });
  }
  if (dateStart >= dateEnd) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Ngày bắt đầu phải bé hơn ngày kết thúc" });
  }
  if (
    status !== courseModel.STATUS_DONE &&
    status !== courseModel.STATUS_IN_PROGRESS
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Trang thái thực tập phải là Done hoặc In progress" });
  }
  if (
    kindOfInternship !== courseModel.KOD_FULL_TIME &&
    kindOfInternship !== courseModel.KOD_PARTIAL_TIME
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Loại thực tập phải là Fulltime hoặc Parttime" });
  }
  const result = await courseModel.update(
    {
      idInternshipCourse,
      nameCoure,
      dateStart,
      dateEnd,
      status,
      kindOfInternship,
    },
    (response) => {
      return res.status(statusCodes.OK).json({ status: response });
    }
  );
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
