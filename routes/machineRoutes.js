const express = require('express');
const router = express.Router();
const machineController = require('../controllers/machineController');


// Routes for machines

/**
 * @swagger
 * /api/clusters/{clusterId}/machines:
 *   get:
 *     summary: Get all machines in a cluster
 *     tags: [Machines]
 *     parameters:
 *       - in: path
 *         name: clusterId
 *         required: true
 *         description: ID of the cluster
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of machines in the cluster
 *       500:
 *         description: Internal server error
 */
router.get('/clusters/:clusterId/machines', machineController.getAllMachinesInCluster);
/**
 * @swagger
 * /api/clusters/{clusterId}/machines:
 *   post:
 *     summary: Create a new machine in a cluster
 *     tags: [Machines]
 *     parameters:
 *       - in: path
 *         name: clusterId
 *         required: true
 *         description: ID of the cluster
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *               instanceType:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created machine
 *       400:
 *         description: Bad request
 */
router.post('/clusters/:clusterId/machines', machineController.createMachineInCluster);
/**
 * @swagger
 * /api/clusters/{clusterId}/machines/{machineId}:
 *   delete:
 *     summary: Delete a machine by ID in a cluster
 *     description: Deletes a machine specified by its ID in a cluster specified by its ID.
 *     tags: [Machines]
 *     parameters:
 *       - in: path
 *         name: clusterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cluster
 *       - in: path
 *         name: machineId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the machine
 *     responses:
 *       200:
 *         description: Machine deleted successfully
 *       404:
 *         description: Machine not found in the cluster
 *       500:
 *         description: Error deleting machine in the cluster
 */
router.delete('/clusters/:clusterId/machines/:machineId', machineController.deleteMachineInCluster);
/**
 * @swagger
 * /api/clusters/{clusterId}/machines/{machineId}/tags:
 *   post:
 *     summary: Add a tag to a machine
 *     tags: [Machines]
 *     description: Adds a tag to the machine specified by its ID in a cluster specified by its ID.
 *     parameters:
 *       - in: path
 *         name: clusterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cluster
 *       - in: path
 *         name: machineId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the machine
 *       - in: body
 *         name: tag
 *         description: The tag to add to the machine
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tag added to the machine successfully
 *       400:
 *         description: Error adding tag to the machine
 */

router.post('/clusters/:clusterId/machines/:machineId/tags', machineController.addTagToMachine);
/**
 * @swagger
 * /api/clusters/{clusterId}/machines/actions:
 *   post:
 *     summary: Perform action on machines with specified tags
 *     tags: [Machines]
 *     description: Perform an action (start, stop, reboot, etc.) on machines in a cluster based on their tags.
 *     parameters:
 *       - in: path
 *         name: clusterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cluster
 *       - in: body
 *         name: tags
 *         description: The tags to identify the machines to perform the action on
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       200:
 *         description: Action performed successfully
 *       400:
 *         description: Error performing action on machines
 */

router.post('/clusters/:clusterId/machines/actions', machineController.performActionOnMachinesWithTags);
/**
 * @swagger
 * /api/clusters/{clusterId}/machines/{machineId}/start:
 *   post:
 *     summary: Start a machine by ID in a cluster
 *     tags: [Machines]
 *     description: Starts the machine specified by its ID in a cluster specified by its ID.
 *     parameters:
 *       - in: path
 *         name: clusterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cluster
 *       - in: path
 *         name: machineId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the machine
 *     responses:
 *       200:
 *         description: Machine started successfully
 *       400:
 *         description: Error starting machine in the cluster
 */
router.post('/clusters/:clusterId/machines/:machineId/start', machineController.startMachineInCluster);

/**
 * @swagger
 * /api/clusters/{clusterId}/machines/{machineId}:
 *   patch:
 *     summary: Update details of a machine in a cluster
 *     tags: [Machines]
 *     description: Updates the details (name, IP address, instance type) of the machine specified by its ID in a cluster specified by its ID.
 *     parameters:
 *       - in: path
 *         name: clusterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cluster
 *       - in: path
 *         name: machineId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the machine
 *       - in: body
 *         name: machineDetails
 *         description: The updated details of the machine
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             ipAddress:
 *               type: string
 *             instanceType:
 *               type: string
 *     responses:
 *       200:
 *         description: Machine details updated successfully
 *       400:
 *         description: Error updating machine details
 */
router.patch('/clusters/:clusterId/machines/:machineId', machineController.updateMachineDetails);
/**
 * @swagger
 * /api/clusters/{clusterId}/machines/{machineId}/tags/{tag}:
 *   delete:
 *     summary: Remove a tag from a machine
 *     tags: [Machines]
 *     description: Removes the specified tag from the machine specified by its ID in a cluster specified by its ID.
 *     parameters:
 *       - in: path
 *         name: clusterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cluster
 *       - in: path
 *         name: machineId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the machine
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag to remove from the machine
 *     responses:
 *       200:
 *         description: Tag removed from machine successfully
 *       400:
 *         description: Error removing tag from machine
 */
router.delete('/clusters/:clusterId/machines/:machineId/tags/:tag', machineController.removeTagFromMachine);

module.exports = router;
