const candidateModel = require("../models/candidate");
const statusCodes = require("http-status-codes");
const get = async (req, res) => {
  let page = 1,
    limit = 20;
  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  const results = await candidateModel.getInterview({}, [], page, limit);
  const total = await candidateModel.getTotalCount({}, [], page, limit);
  return res.status(statusCodes.OK).json({
    data: results,
    total: total,
  });
};

const search = async (req, res) => {
  const { fullName, fullNameMentor } = req.params;
  const results = await candidateModel.search({ fullName, fullNameMentor });
  return res.status(statusCodes.OK).json({
    data: results,
  });
};

module.exports = { get: get, search: search, };
