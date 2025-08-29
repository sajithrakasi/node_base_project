const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const Subjectmodel = sequelize.define(
    "subjects", // Use singular for model name
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subcode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure subcode is unique
        },
    },
    {
        tableName: "subjects", // Specify table name in the database
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

// Function to check if a subject exists
Subjectmodel.isEntityExist = async function (entity, value) {
    const subject = await Subjectmodel.findOne({
        where: { [entity]: value },
    });
    return subject !== null; // Return true if the entity exists, false otherwise
};



module.exports = Subjectmodel;
