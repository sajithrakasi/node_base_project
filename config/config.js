// Load environment variables from .env file
require('dotenv').config();

console.log('DB_DIALECT:', process.env.DB_DIALECT); // Add this for debugging

module.exports = {
  development: {
    username: process.env.DBUSERNAME || 'root',
    password: process.env.PASSWORD || 'sajee',
    database: process.env.DATABASE || 'NewDemo',
    host: process.env.HOST || '127.0.0.1',
    dialect:process.env.DB_DIALECT || 'mysql'
  },
  test: {
    username: process.env.DBUSERNAME || 'root',
    password: process.env.PASSWORD || null,
    database: process.env.DB_DATABASE_TEST || 'test_database',
    host: process.env.HOST || '127.0.0.1',
    dialect:process.env.DB_DIALECT || 'mysql'
  },
  production: {
    username: process.env.DBUSERNAME || 'root',
    password: process.env.PASSWORD || null,
    database: process.env.DB_DATABASE_PRODUCTION || 'production_database',
    host: process.env.HOST || '127.0.0.1',
    dialect:process.env.DB_DIALECT || 'mysql'
  }
};
