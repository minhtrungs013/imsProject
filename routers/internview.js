const express = require("express");
const router = express.Router();
const {get, del} = require("../controllers/internviewController");

router.get("/internview", get);
router.delete("/internview/:id", del);
module.exports = router;