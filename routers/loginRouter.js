const router = require("express").Router();
const loginController = require("../controllers/loginController");

router.post("/Login", loginController.login);

module.exports = router;