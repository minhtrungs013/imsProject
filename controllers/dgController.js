const dgModel = require("../models/dg");
const statusCodes = require("http-status-codes");

const getList = async (req, res) => {
  const result = await dgModel.getList({});
  return res.status(statusCodes.OK).json({ data: result });
};

const create = async (req, res) => {
  const { nameDG } = req.body;
  if (!nameDG) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: dgModel.ErrorRequest });
  }
  if (nameDG.length < 3 || nameDG.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: dgModel.ErrorName,
    });
  }

  const results = await dgModel.create({
    nameDG: nameDG,
  });
  return res.status(statusCodes.OK).json({
    status: results,
    message: results ? dgModel.SuccessAdd : dgModel.FailureAdd,
  });
};

const update = async (req, res) => {
  const id = req.params.id;
  const { nameDG } = req.body;
  if (!nameDG) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: dgModel.ErrorRequest });
  }
  if (nameDG.length < 3 || nameDG.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: dgModel.ErrorName,
    });
  }

  const result = await dgModel.update({
    nameDG: nameDG,
    idDG: id,
  });
  return res.status(statusCodes.OK).json({
    data: result,
    message: result ? dgModel.SuccessMessage : dgModel.FailureMessage,
  });
};

const remove = async (req, res) => {
  const id = req.params.id;
  const result = await dgModel.remove({ idDG: id });
  return res.status(statusCodes.OK).json({
    status: result,
    message: result ? dgModel.SuccessDelete : dgModel.FailureDelete,
  });
};

module.exports = {
  getList: getList,
  create: create,
  update: update,
  remove: remove,
};
