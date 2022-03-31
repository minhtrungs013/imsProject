var express = require("express");
var router = express.Router();
var mentorController = require("../controllers/mentorController");

router.get("/GetListMentor", mentorController.mentor);
router.get("/GetListMentor/batch:id", mentorController.detail);
router.get("/GetListMentor/:id", mentorController.BatchID);

module.exports = router;
