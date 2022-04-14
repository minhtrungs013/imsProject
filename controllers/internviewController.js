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
  const results = await candidateModel.getInterview({fullName: fullName}, [], page, limit);
  const total = await candidateModel.getTotalCount({fullName: fullName});
  if(results[0] === undefined){
    return res
    .status(statusCodes.BAD_REQUEST)
    .json({ error: `Không có kết quả cho từ khóa : ${fullName}` });
  }
  return res.status(statusCodes.OK).json({
    data: results,
    total: total,
  });
};
const del = async (req, res) => {
  const idCandidate = req.params.id;
  let page = 1,
  limit = 20;
  const courseId = await candidateModel.getInterview({idCandidate: idCandidate}, [], page, limit);
  if (!courseId.length) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: 'Internview không tồn tại trong hệ thống !' });
  }
  const result = await candidateModel.delete({ idCandidate: idCandidate });
  return res.status(statusCodes.OK).json({
    status: result,
    message: "Xóa thành công",
  });
};
module.exports = { get: get, del: del };
