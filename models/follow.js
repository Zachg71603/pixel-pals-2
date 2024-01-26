const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Follow extends Model {}

Follow.init(
  {
    followerId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "Users", key: "fierbaseUserId" },
    },
    followedId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "Users", key: "fierbaseUserId" },
    },
  },
  {
    sequelize,
    modelName: "follow",
  }
);

module.exports = Follow;
