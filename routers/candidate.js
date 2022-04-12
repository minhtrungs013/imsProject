const express = require("express");
const router = express.Router();
const {get} = require("../controllers/candidateController");

router.get("/candidate/", get);
module.exports = router;