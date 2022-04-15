const courseModel = require("../models/courseModel");
const statusCodes = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config();
const getList = async (req, res) => {
  const result = await courseModel.getList({});
  return res.status(statusCodes.OK).json({ data: result });
};

const details = async (req, res) => {
  const id = req.params.id;
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
      .json({ error: "Tên khóa thực tập phải từ 6-255 kí tự" });
  }
  if (dateStart >= dateEnd) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Ngày bắt đầu phải sớm hơn ngày kết thúc" });
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
  const course = await courseModel.getList({
    nameCoures: nameCoure,
  });
  if (course.length) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: `Tên ${nameCoure} đã tồn tại` });
  }
  const result = await courseModel.create({
    nameCoure: nameCoure,
    dateStart: dateStart,
    dateEnd: dateEnd,
    status: status,
    kindOfInternship: kindOfInternship,
  });
  if (!result) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Hệ thống lỗi liên hệ quản trị viên` });
  }
  return res.status(statusCodes.OK).json({
    status: result,
    idInternshipCourse: result,
    message: "Thêm thành công",
  });
};

const update = async (req, res) => {
  const idInternshipCourse = req.params.id;
  const getCourse = await courseModel.getList({
    idInternshipCourse: idInternshipCourse,
  });
  if (!getCourse.length) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Khóa thực tập không tồn tại trong hệ thống !" });
  }
  const {nameCoure, dateStart, dateEnd, status, kindOfInternship} = req.query;
  if (!nameCoure || !dateStart || !dateEnd || !status || !kindOfInternship) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Bạn cần điền đầy đủ thông tin" });
  }
  if (nameCoure.length > 255 || nameCoure.length < 6) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Tên khóa thực tập phải từ 6-255 kí tự" });
  }
  if (dateStart >= dateEnd) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Ngày bắt đầu phải sớm hơn ngày kết thúc" });
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
  const course = await courseModel.getList({
    nameCoures: nameCoure,
  });
  if (course.length) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Tên Batch đã tồn tại" });
  }
  const result = await courseModel.update({
    idInternshipCourse: idInternshipCourse,
    nameCoure: nameCoure,
    dateStart: dateStart,
    dateEnd: dateEnd,
    status: status,
    kindOfInternship: kindOfInternship,
  })
  return res.status(statusCodes.OK).json({
    status: result,
    message: "Cập nhật thành công",
  });
};

const del = async (req, res) => {
  const idInternshipCourse = req.params.id;
  const getCourse = await courseModel.getList({
    idInternshipCourse: idInternshipCourse,
  });
  if (!getCourse.length) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: `Khóa thực tập này không tồn tại trong hệ thống !` });
  }
  const result = await courseModel.delete({ idInternshipCourse: id });
  return res.status(statusCodes.OK).json({
    status: result,
    message: "Xóa thành công",
  });
};

module.exports = {
  getList: getList,
  details: details,
  update: update,
  create: create,
  del: del,
};