const dgModel = require("../models/dg");
const statusCodes = require("http-status-codes");

const getList = (req, res) => {
  dgModel.getList((response) => {
    return res.status(statusCodes.OK).json(response);
  });
};

const create = async (req, res) => {
  const { nameDG } = req.body;
  if (!nameDG) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: "Please enter information" });
  }
  if (nameDG.length < 3 || nameDG.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }

  const results = await dgModel.create({
    nameDG: nameDG,
  });
  return res.status(statusCodes.OK).json({
    status: results,
    message: results ? "Create successfully" : "DG exits!!!",
  });
};

const update = async (req, res) => {
  const id = req.params.id;
  const { nameDG } = req.body;
  if (!nameDG) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: "Please enter information" });
  }
  if (nameDG.length < 3 || nameDG.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `The maximum length is 255, the minimum length is 5 characters !!!`,
    });
  }

  const result = await dgModel.update({
    nameDG: nameDG,
    idDG: id,
  });
  return res.status(statusCodes.OK).json({
    data: result,
    message: result ? "Update successfully" : "Update faile !!!",
  });
};

const remove = async (req, res) => {
  const id = req.params.id;
  const result = await dgModel.remove({ idDG: id });
  return res.status(statusCodes.OK).json({
    status: result,
    message: result ? "Delete successfully !!!" : "DG not exists",
  });
};

module.exports = {
  getList: getList,
  create: create,
  update: update,
  remove: remove,
};
