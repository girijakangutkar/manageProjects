const express = require("express");
const { getAllProjects, addProject, editProject, deleteProject } = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const projectRouter = express.Router();

// all users

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects fetched successfully
 */
projectRouter.get("/projects", authMiddleware(["user", "manager", "admin"]), getAllProjects);

// for manager and admin

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Add project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *               projectDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created
 */
projectRouter.post("/projects", authMiddleware(["user", "manager", "admin"]), addProject)

// onwer, manager or admin

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Edit project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *               projectDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated
 */

projectRouter.put("/projects/:id",authMiddleware(["user", "manager", "admin"]), editProject);

// admin only

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted
 */

projectRouter.delete("/projects/:id",authMiddleware(["admin"]), deleteProject);

module.exports = projectRouter;