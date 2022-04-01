const mentorModel = require("../models/mentorModels");

exports.mentor = (req, res) => {
  mentorModel.get_all((data) => {
    res.send(data);
  });
};

exports.detail = (req, res) => {
  mentorModel.getByID(req.params.id, (response) => {
    res.send(response);
  });
};

exports.BatchID = (req, res) => {
  mentorModel.GetBatchID(req.params.id, (response) => {
    res.send(response);
  });
};

exports.create = (req, res) => {
  const data = req.body;
  mentorModel.create(data, (response) => {
    res.send(response);
  });
};
