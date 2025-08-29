const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Markmodel = sequelize.define(
  'studentmarks', // Use singular for model name
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'students', // Ensure this matches the table name
        key: 'id',
      },
    },
    subjectId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'subjects', // Ensure this matches the table name
        key: 'id', // If `subcode` is the primary key in `subjects`, keep it; otherwise, change it to 'id'
      },
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'studentmarks', // Specify table name in the database
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);



// Define associations

module.exports = Markmodel;
