var express = require("express");
var router = express.Router();
var candidateController = require("../controllers/candidateController");

router.get("/GetListCandidates", candidateController.getcandidate);
router.get("/GetListCandidate", candidateController.getdetail);
router.get("/GetListCandidate/:id", candidateController.getbatch);
router.post("/createCandidate", candidateController.createcandidate);
router.put('/updateCandidate',candidateController.updatecandidate)
router.delete("/deleteCandidate/:id", candidateController.removecandidate);

module.exports = router;