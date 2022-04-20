const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
router.put("/candidate/interview/:id", candidateController.update);

module.exports = router;
