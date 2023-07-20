const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');
const {isAuth} = require('../../utils/autorization/autorization');

// POST /register

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               currentInstitute:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', userController.registerUser);
router.post('/signIn', userController.signIn);

module.exports = router;
