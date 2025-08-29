const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");



const Studentmodel = sequelize.define(
    "students", // Use singular form for model name
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        class: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        student_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure student_code is unique
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "students", // Specify the table name in the database
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true, // Enable soft delete functionality
        // timestamps: true, // timestamps is true by default, you can remove this line
    }
);

// Function to check if a student exists
Studentmodel.isEntityExist = async function (entity, value) {
    const student = await Studentmodel.findOne({
        where: { [entity]: value },
    });
    return student !== null; // Return true if the entity exists, false otherwise
};



module.exports = Studentmodel;
