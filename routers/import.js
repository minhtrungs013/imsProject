const express = require("express");
const router = express.Router();
const excelController = require("../controllers/excelController");
const upload = require("../middleware/upload");
router.post("/api/upload", upload.single("file"), excelController.upload);
router.get("/api/candidates", excelController.getCandidates);
module.exports = router;
