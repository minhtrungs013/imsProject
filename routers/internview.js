const express = require("express");
const router = express.Router();
const {get, del, updateInternviewResult,updateInsert} = require("../controllers/internviewController");

router.get("/internview", get);
router.put("/internview/:id", updateInternviewResult);
router.put("/internview/updateInsert", updateInsert);
router.delete("/internview/:id", del);
module.exports = router;