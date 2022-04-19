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
      .json({ error: "Bạn cần nhập đủ thông tin" });
  }
  if (nameDG.length < 3 || nameDG.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Chiều dài tên DG không đủ`,
    });
  }

  const results = await dgModel.create({
    nameDG: nameDG,
  });
  return res.status(statusCodes.OK).json({
    status: results,
    error: results ? "Thêm thành công" : "DG đã tồn tại",
  });
};

const update = async (req, res) => {
  const id = req.params.id;
  const { nameDG } = req.body;
  if (!nameDG) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "Bạn cần nhập đầy đủ thông tin" });
  }
  if (nameDG.length < 3 || nameDG.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: `Chiều dài tên DG không đủ`,
    });
  }

  const result = await dgModel.update({
    nameDG: nameDG,
    idDG: id,
  });
  return res.status(statusCodes.OK).json({
    data: result,
    error: result ? "Cập nhật DG thành công" : "Cập nhật DG thất bại",
  });
};

const remove = async (req, res) => {
  const id = req.params.id;
  const result = await dgModel.remove({ idDG: id });
  return res.status(statusCodes.OK).json({
    status: result,
    error: result ? "Xóa DG thành công" : "DG không tồn tại",
  });
};

module.exports = {
  getList: getList,
  create: create,
  update: update,
  remove: remove,
};
