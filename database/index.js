// Load environment variables from .env file
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const { Sequelize } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

// Function to initialize database connection
const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync(); // Sync models
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Invoke database initialization
initDatabase();

module.exports = sequelize; // Export the Sequelize instance
