const mentorModel = require("../models/mentorModels");
const mentorController = {
  get: (req, res) => {
    mentorModel.get_all((data) => {
      res.send(data);
    });
  },

  detail: (req, res) => {
    mentorModel.getByID(req.params.id, (response) => {
      res.send(response);
    });
  },

  BatchID: (req, res) => {
    mentorModel.GetBatchID(req.params.id, (response) => {
      res.send(response);
    });
  },

  create: (req, res) => {
    const data = req.body;
    mentorModel.create(data, (response) => {
      res.send(response);
    });
  },
};

module.exports = mentorController;
