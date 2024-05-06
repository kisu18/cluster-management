// Import necessary modules
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
const {sequelize} = require('./models/models')
const clusterRoutes = require('./routes/clusterRoutes');
const machineRoutes = require('./routes/machineRoutes');



// Create Express application
const app = express();
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentation for cluster and machine management api',
      },
    },
    // Path to the API docs
    apis: ['./routes/*.js'], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api',clusterRoutes);
app.use('/api',machineRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 3000;
sequelize.authenticate().then(
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})).catch(e=>console.log(e));
