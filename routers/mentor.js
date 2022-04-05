const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorController");

router.get("/GetListMentor", mentorController.get);
router.get("/GetListMentor/batch:id", mentorController.detail);
router.get("/GetListMentor/:id", mentorController.BatchID);
router.delete("/DeleteMentor/:id", mentorController.remove);
router.post("/CreateMentor", mentorController.create);
router.put("/UpdateMentor", mentorController.update);

module.exports = router;
