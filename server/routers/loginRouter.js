const loginController = require("../controllers/loginController");

const router = require("express").Router();

router.post("/Login", loginController.login);

module.exports = router;