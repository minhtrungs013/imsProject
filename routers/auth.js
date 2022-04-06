const router = require("express").Router();
const { login, profile } = require("../controllers/authController");
const { requireToken } = require("../middleware/index");

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's name.
 *                 example: minhtrung1
 *               password:
 *                 type: string
 *                 description: user's password.
 *                 example: 12345
 *     responses:
 *       201:
 *         description: Token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                       type: string
 *                       description: user's token.
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1pbmh0cnVuZzEiLCJwYXNzd29yZCI6IjEyMzQ1IiwiaWF0IjoxNjQ5MjEyMjgwLCJleHAiOjE2NDk4MTcwODB9.sW4ZRIU_DuOnd7NVhFlRsdTu7Q7rieIwYlx9jsQx1ms
 */
router.post("/auth/login", login);
router.get("/auth/profile", requireToken, profile);

module.exports = router;
