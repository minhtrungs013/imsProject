const mentorModel = require("../models/mentorModels");

exports.mentor = (req, res) => {
  mentorModel.get_all((data) => {
    res.send({ result: data });
  });
};

exports.detail = (req, res) => {
  mentorModel.getByID(req.params.id, (response) => {
    res.send({ result: response });
  });
};

exports.BatchID = (req, res) => {
  mentorModel.GetBatchID(req.params.id, (response) => {
    res.send({ result: response });
    console.log(response);
  });
};
