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
    message: result ? "Xóa thành công !!!" : "Mentor không tồn tại",
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
    fullNameMentor: fullNameMentor,
    dayOfBirth: dayOfBirth,
    address: address,
    workplace: workplace,
    email: email,
    position: position,
    idDG: idDG,
    idInternshipCourse: idInternshipCourse,
  } = req.body;
  if (
    !fullNameMentor ||
    !dayOfBirth ||
    !address ||
    !workplace ||
    !email ||
    !position ||
    !idDG ||
    !idInternshipCourse
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Vui lòng điền đẩy đủ thông tin !" });
  }
  if (fullNameMentor.length < 5 || fullNameMentor.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Độ dài tối đa là 255 ký tự,tối thiểu là 5 ký tự !!!",
    });
  }
  if (workplace.length < 5 || workplace.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Độ dài tối đa là 255 ký tự,tối thiểu là 5 ký tự !!!",
    });
  }

  if (address.length < 5 || address.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Độ dài tối đa là 255 ký tự,tối thiểu là 5 ký tự !!!",
    });
  }
  if (position.length < 5 || position.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Độ dài tối đa là 255 ký tự,tối thiểu là 5 ký tự !!!",
    });
  }
  if (dayOfBirth < "1960/01/01") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: " Ngày sinh không hợp lệ phải lớn hơn 01/01/1960 !!!",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Email không hợp lệ !!!",
    });
  }

  const results = await mentorModel.create({
    fullNameMentor: fullNameMentor,
    dayOfBirth: dayOfBirth,
    address: address,
    workplace: workplace,
    email: email,
    position: position,
    idDG: idDG,
    idInternshipCourse: idInternshipCourse,
  });
  return res.status(statusCodes.OK).json({
    status: results,
    message: results
      ? "Thêm Thành công !!!"
      : "idDG hoặc idInternshipCourse không tồn tại !!!",
  });
};

const update = async (req, res) => {
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const id = req.params.id;
  const {
    fullNameMentor: fullNameMentor,
    dayOfBirth: dayOfBirth,
    address: address,
    workplace: workplace,
    email: email,
    position: position,
    idDG: idDG,
    idInternshipCourse: idInternshipCourse,
  } = req.body;
  if (
    !fullNameMentor ||
    !dayOfBirth ||
    !address ||
    !workplace ||
    !email ||
    !position ||
    !idDG ||
    !idInternshipCourse
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Vui lòng điền đẩy đủ thông tin " });
  }
  if (fullNameMentor.length < 5 || fullNameMentor.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Độ dài tối đa là 255 ký tự,tối thiểu là 5 ký tự !!!`,
    });
  }
  if (workplace.length < 5 || workplace.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Độ dài tối đa là 255 ký tự,tối thiểu là 5 ký tự !!!",
    });
  }

  if (address.length < 5 || address.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Độ dài tối đa là 255 ký tự,tối thiểu là 5 ký tự !!!",
    });
  }
  if (position.length < 5 || position.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Độ dài tối đa là 255 ký tự,tối thiểu là 5 ký tự !!!",
    });
  }
  if (dayOfBirth < "1960/01/01") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Ngày sinh không hợp lệ phải lớn hơn 01/01/1960 !!!",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Email không hợp lệ !!!",
    });
  }

  const result = await mentorModel.update({
    fullNameMentor: fullNameMentor,
    dayOfBirth: dayOfBirth,
    address: address,
    workplace: workplace,
    email: email,
    position: position,
    idDG: idDG,
    idInternshipCourse: idInternshipCourse,
    idMentor: id,
  });
  return res.status(statusCodes.OK).json({
    data: result,
    message: result ? "Cập nhật thành công !!!" : "Mentor không tồn tại !!!",
  });
};

module.exports = { get, detailBatch, detail, update, create, remove };
