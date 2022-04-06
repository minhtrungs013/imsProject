const courseModel = require("../models/courseModel");

const getList = (req, res) => {
  courseModel.getListCoure((response) => {
    res.send(response);
  });
};
const details = (req, res) => {
  const id = req.params.id;
  if (id === " " || id === undefined) {
    return res.status(400).json({ error:"You need to enter all the information"});
  }
  courseModel.getIdCoure(id, (response) => {
    res.send(response);
  });
};
const create = (req, res) => {
  const { nameCoure, dateStart, dateEnd, status, kindOfInternship } = req.body;
  if (!nameCoure || !dateStart || !dateEnd || !status || !kindOfInternship) {
    return res.status(400).json({ error:"You need to enter all the information"});
  }
  courseModel.createCourse(
    { nameCoure, dateStart, dateEnd, status, kindOfInternship },
    (response) => {
      res.send(response);
    }
  );
};
const update = (req, res) => {
  const { nameCoure, dateStart, dateEnd, status, kindOfInternship } = req.body;
  if (!nameCoure || !dateStart || !dateEnd || !status || !kindOfInternship) {
    return res.status(400).json({ error:"You need to enter all the information"});
  }
  courseModel.update(
    { nameCoure, dateStart, dateEnd, status, kindOfInternship },
    (response) => {
      res.status(200).json({message: "update successfully"});
    }
  );
};
const del = (req, res) => {
  const id = req.params.id;
  if (id === " " || id === undefined) {
    return res.status(400).json({ error: "You need to choose who to delete!"});
  }
  courseModel.deleteCourse(id, (response) => {
    res.status(200).json(response);
  });
};
module.exports = {
  getList: getList,
  details: details,
  create: create,
  del: del,
  update: update,
};
