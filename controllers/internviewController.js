const candidateModel = require("../models/candidate");
const statusCodes = require("http-status-codes");
const get = async (req, res) => {
  let page = 1,
    limit = 20;
  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  let fullName = "";
  if (req.query.fullName) {
    fullName = req.query.fullName;
  }
  let status = "";
  if (req.query.status) {
    status = req.query.status;
  }
  const results = await candidateModel.getInterview(
    { fullName: fullName, statusPr: status },
    [],
    page,
    limit
  );
  const total = await candidateModel.getTotalCount({
    fullName: fullName,
    statusPr: status,
  });
  if (results[0] === undefined) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: candidateModel.ERROR_SEARCH });
  }
  return res.status(statusCodes.OK).json({
    data: results,
    total: total,
  });
};

const updateInternviewResult = async (req, res) => {
  const idCandidate = req.params.id;
  const updateInsert = "success";
  const { status, idMentor, idDG, comments } = req.body;
  const course = await candidateModel.getInterview(
    { idCandidate: idCandidate },
    [],
    1,
    1
  );
  if (!course.length) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: candidateModel.ERROR_ID });
  }
  const results = await candidateModel.update({
    idCandidate: idCandidate,
    updateInsert: updateInsert,
    status: status,
    idMentor: idMentor,
    idDG: idDG,
    comments: comments,
  });
  return res.status(statusCodes.OK).json({
    status: results,
    message: results,
  });
};
const updateInsert = async (req, res) => {
  const updateInsert = "";
  const results = await candidateModel.update({
    updateInsert: updateInsert,
  });
  return res.status(statusCodes.OK).json({
    status: results,
    message: "cập nhật thành công",
  });
};

const del = async (req, res) => {
  const idCandidate = req.params.id;
  let page = 1,
    limit = 1;
  if (idCandidate === "undefined") {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: candidateModel.ERROR_ID });
  }
  const course = await candidateModel.getInterview(
    { idCandidate: idCandidate },
    [],
    page,
    limit
  );
  if (!course.length) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: candidateModel.ERROR_ID });
  }
  const result = await candidateModel.delete({ idCandidate: idCandidate });
  return res.status(statusCodes.OK).json({
    status: result,
    message: "Xóa thành công",
  });
};
module.exports = {
  get: get,
  del: del,
  updateInternviewResult: updateInternviewResult,
  updateInsert: updateInsert,
};
