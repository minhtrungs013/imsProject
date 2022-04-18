const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

router.get("/candidate", candidateController.getCandidate);
router.get("/candidate/batch/:id", candidateController.getBatch);

router.put("/candidate/:id", candidateController.update);
router.delete("/candidate/:id", candidateController.remove);
router.post("/candidate/create", candidateController.create);



module.exports = router;
