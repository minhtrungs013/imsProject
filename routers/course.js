const express = require("express");
const router = express.Router();
const {getList, details, create, del, update} = require("../controllers/courseController");

router.get("/", getList);
router.get("/batch:id", details);
router.post("/create", create);
router.put("/:id", update);
router.delete("/:id", del);

module.exports = router;
