const express = require('express');
const router = express.Router();
const agentController = require('../../controllers/agent/agentController');
const {  isSuperAdmin, isAuth } = require('../../utils/autorization/autorization');
const auditLogFun = require('../../utils/auditLog/auditLogFun');

// @route GET /api/agent
// @desc Get all agents
// @access Public
/**
 * @swagger
 * /api/agent:
 *   get:
 *     summary: Get all Agents
 *     tags:
 *       - Agents
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.get('/', agentController.getAgents);

// @route GET /api/agent/:id
// @desc Get agents by ID
// @access Public
/**
 * @swagger
 * /api/agent/{id}:
 *   get:
 *     summary: Get agent by ID
 *     tags:
 *       - Agents
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Agent ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Agent not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', agentController.getAgentById);

// @route POST /agent
// @desc Create a new Agent
// @access Public
/**
 * @swagger
 * /api/agent:
 *   post:
 *     summary: Create a new Agent
 *     tags:
 *       - Agents
 *     requestBody:
 *       description: Agent data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               isVerified:
 *                 type: boolean
 *               isSuperAdmin:
 *                 type: boolean
  *               address:
 *                 type: object
 *                 properties:
 *                   permanent:
 *                     type: object
 *                     properties:
 *                       line1:
 *                         type: string
 *                         format: trim
 *                       line2:
 *                         type: string
 *                         format: trim
 *                       city:
 *                         type: string
 *                         format: trim
 *                       state:
 *                         type: string
 *                         format: trim
 *                       postalCode:
 *                         type: string
 *                         format: trim
 *                       country:
 *                         type: string
 *                         format: trim
 *                   current:
 *                     type: object
 *                     properties:
 *                       line1:
 *                         type: string
 *                         format: trim
 *                       line2:
 *                         type: string
 *                         format: trim
 *                       city:
 *                         type: string
 *                         format: trim
 *                       state:
 *                         type: string
 *                         format: trim
 *                       postalCode:
 *                         type: string
 *                         format: trim
 *                       country:
 *                         type: string
 *                         format: trim
 *
 *     responses:
 *       201:
 *         description: Agent created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', auditLogFun('create', 'Agent'),agentController.createAgent);

// @route PUT /agent/:id
// @desc Update Agent by ID
// @access Public
/**
 * @swagger
 * /api/agent/{id}:
 *   put:
 *     summary: Update Agent by ID
 *     tags:
 *       - Agents
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Agent ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Agent data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               isVerified:
 *                 type: boolean
 *               isSuperAdmin:
 *                 type: boolean
 *               address:
 *                 type: object
 *                 properties:
 *                   permanent:
 *                     type: object
 *                     properties:
 *                       line1:
 *                         type: string
 *                         format: trim
 *                       line2:
 *                         type: string
 *                         format: trim
 *                       city:
 *                         type: string
 *                         format: trim
 *                       state:
 *                         type: string
 *                         format: trim
 *                       postalCode:
 *                         type: string
 *                         format: trim
 *                       country:
 *                         type: string
 *                         format: trim
 *                   current:
 *                     type: object
 *                     properties:
 *                       line1:
 *                         type: string
 *                         format: trim
 *                       line2:
 *                         type: string
 *                         format: trim
 *                       city:
 *                         type: string
 *                         format: trim
 *                       state:
 *                         type: string
 *                         format: trim
 *                       postalCode:
 *                         type: string
 *                         format: trim
 *                       country:
 *                         type: string
 *                         format: trim
 *
 *     responses:
 *       200:
 *         description: Agent updated successfully
 *       404:
 *         description: Agent not found
 *       500:
 *         description: Internal server error
 */

router.put('/updateAgentInfo/:id',(isAuth||isSuperAdmin), agentController.updateAgent);

// @route DELETE /agent/:id
// @desc Delete Agent by ID
// @access Public
/**
 * @swagger
 * /api/agent/{id}:
 *   delete:
 *     summary: Delete Agent by ID
 *     tags:
 *       - Agents
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Agent ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agent deleted successfully
 *       404:
 *         description: Agent not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', agentController.deleteAgent);


// @route LogIn Agent /agent/:id
// @desc LogIn Agent by ID
// @access Public
/**
 * @swagger
 * /api/agent/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               agentId:
 *                 type: number
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid agentId or password
 *       500:
 *         description: Internal server error
 */
router.post('/login',auditLogFun('Agent_Login', 'Agent'), agentController.login);



router.put('/assignInstituteToAgent',isAuth,isSuperAdmin,auditLogFun('update', 'Agent'), agentController.updateAssignInstitutes)

module.exports = router;
