const mentorModel = require("../models/mentorModels");

const get = (req, res) => {
  mentorModel.get((data) => {
    res.send(data);
  });
};
const detail = (req, res) => {
  mentorModel.getByID(req.params.id, (response) => {
    res.send(response);
  });
};
const BatchID = (req, res) => {
  mentorModel.GetBatchID(req.params.id, (response) => {
    res.send(response);
  });
};
const remove = (req, res) => {
  const id = req.params.id;
  mentorModel.remove(id, (response) => {
    res.send(response);
  });
};
const create = (req, res) => {
  const data = req.body;
  mentorModel.create(data, (response) => {
    res.send(response);
  });
};
const update = (req, res) => {
  const id = req.body;
  mentorModel.update(id, (response) => {
    res.send({ result: response });
  });
};
module.exports = { get, update, create, remove, BatchID, detail };
