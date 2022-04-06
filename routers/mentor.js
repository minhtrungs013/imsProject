var express = require("express");
var router = express.Router();
var mentorController = require("../controllers/mentorController");

router.get("/", mentorController.get);
router.get("/page:id", mentorController.getPage);
router.get("/batch:id", mentorController.detailBatch);
router.get("/:id", mentorController.detail);
router.delete("/delete/:id", mentorController.remove);
router.post("/create", mentorController.create);
router.put("/update", mentorController.update);

module.exports = router;
