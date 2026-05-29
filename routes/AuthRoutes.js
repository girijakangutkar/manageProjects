const express = require("express");
const { signUpController, loginController, logoutController } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const authRouter = express.Router();

// Signup router
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Signup user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userRole:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: User signup success
 */

authRouter.post("/signup", signUpController);

// Login router

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 */
authRouter.post("/login", loginController)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
authRouter.post("/logout", authMiddleware(["user","manager","admin"]), logoutController);

module.exports = authRouter;