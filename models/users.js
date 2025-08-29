const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");
const crypto = require('crypto'); // Built-in Node.js module

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement:true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
          // Hash the password using MD5
          const hashedPassword = crypto
          .createHash('md5')
          .update(user.password)
          .digest('hex'); // Generate MD5 hash in hexadecimal format

          // Save the hashed password back to the user object
          user.password = hashedPassword;
      }
    }
  }
 
);


// Function to check if an entity exists
Users.isEntityExist = async function(enitity, value) {
  const user = await Users.findOne({
      where: { 
        [enitity] : value
       } // Find user by entity
  });
  return user !== null; // Return true if the entity exists, false otherwise
};


module.exports = Users;
