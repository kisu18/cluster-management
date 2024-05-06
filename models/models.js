const sequelize = require('../config/db'); // Adjust the path as per your project structure

const { DataTypes } = require('sequelize');

// Define the Cluster model
const Cluster = sequelize.define('Cluster', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define the Machine model
const Machine = sequelize.define('Machine', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  instanceType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tags: {
    type: DataTypes.TEXT, // Define the data type of elements within the array
    allowNull: true
  }
});
Machine.belongsTo(Cluster, { foreignKey: 'clusterId' });
Machine.associate = models => {
  Machine.hasOne(models.MachineState, { foreignKey: 'machineId', onDelete: 'CASCADE' });
};

// Define the Machine State model
const MachineState = sequelize.define('MachineState', {
  state: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define the association with Machine
MachineState.associate = models => {
  MachineState.belongsTo(models.Machine, { foreignKey: 'machineId', onDelete: 'CASCADE' });
};

(async () => {
  try {
    // Create tables if they don't already exist
    await sequelize.sync({ force: false });
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
})();


module.exports = { Cluster, Machine, sequelize, MachineState };
