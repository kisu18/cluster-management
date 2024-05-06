// Import necessary modules
const { Cluster, Machine } = require('../models/models');
// const { sequelize } = require('../config/db');

// Controller functions

// GET /clusters - Get all clusters
exports.getAllClusters = async (req, res) => {
    try {
        // Fetch all clusters from the database
        const clusters = await Cluster.findAll();
        res.status(200).json(clusters);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching clusters.', error: error });
    }
};

// POST /clusters - Create a new cluster
exports.createCluster = async (req, res) => {
    try {
        // Extract cluster details from request body
        const { name, region } = req.body;
        console.log(name, region);
        // Create the cluster
        const cluster = await Cluster.create({
            name: name,
            region: region
        });

        res.status(201).json(cluster);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error creating cluster.', error: error });
    }
};

// DELETE /clusters/:id - Delete a cluster by ID
exports.deleteCluster = async (req, res) => {
    try {
        const cluster = await Cluster.findByPk(req.params.id);
        if (!cluster) {
            return res.status(404).json({ message: 'Cluster not found.' });
        }

        await cluster.destroy();
        res.status(200).json({ message: 'Cluster deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cluster.', error: error });
    }
};

// Other controller functions for updating cluster details, managing machines in the cluster, etc. can be added here
