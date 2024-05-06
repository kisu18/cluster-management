const express = require('express');
const router = express.Router();
const clusterController = require('../controllers/clusterController');

// Routes for clusters
/**
 * @swagger
 * /api/clusters:
 *   get:
 *     summary: Get all clusters
 *     tags: [Clusters]
 *     description: Retrieves all clusters.
 *     responses:
 *       200:
 *         description: A list of clusters
 *       500:
 *         description: Error fetching clusters
 */

router.get('/clusters', clusterController.getAllClusters);
/**
 * @swagger
 * /api/clusters:
 *   post:
 *     summary: Create a new cluster
 *     tags: 
 *       - Clusters
 *     description: Creates a new cluster with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the cluster
 *               region:
 *                 type: string
 *                 description: The region of the cluster
 *     responses:
 *       201:
 *         description: Cluster created successfully
 *       400:
 *         description: Error creating cluster
 */


router.post('/clusters', clusterController.createCluster);
/**
 * @swagger
 * /api/clusters/{id}:
 *   delete:
 *     summary: Delete a cluster by ID
 *     tags: [Clusters]
 *     description: Deletes the cluster specified by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cluster to delete
 *     responses:
 *       200:
 *         description: Cluster deleted successfully
 *       404:
 *         description: Cluster not found
 *       500:
 *         description: Error deleting cluster
 */

router.delete('/clusters/:id', clusterController.deleteCluster);

module.exports = router;
