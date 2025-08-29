// db.js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
      db[modelName].associate(db);
  }
});

// Define manual associations
const Subjectmodel = require('./Subjectmodel');
const Studentmodel = require('./Studentmodel');
const Markmodel = require('./Markmodel');

Studentmodel.hasMany(Markmodel, { foreignKey: 'studentId' });
Markmodel.belongsTo(Subjectmodel, { foreignKey: 'subjectId' });
Markmodel.belongsTo(Studentmodel, { foreignKey: 'studentId' });

Subjectmodel.hasMany(Markmodel,{foreignKey: 'subjectId'})


db.Subjectmodel = Subjectmodel;
db.Studentmodel = Studentmodel;
db.Markmodel = Markmodel;


db.Sequelize = Sequelize;
db.Sequelize = sequelize;


// Export the db object directly
module.exports = {
  Studentmodel,
  Subjectmodel,
  Markmodel,
};
