const express = require("express");
const router = express.Router();
const {get,search} = require("../controllers/internviewController");

router.get("/internview/", get);
router.get("/internview/search/:fullName&:fullNameMentor", search);
module.exports = router;