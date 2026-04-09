"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Settlement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Settlement.belongsTo(models.Group, { foreignKey: "group_id" });

      Settlement.belongsTo(models.Member, { foreignKey: "paid_by", as:"paidBy" });

      Settlement.belongsTo(models.Member, { foreignKey: "paid_to", as:"paidTo" });
    }
  }
  Settlement.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.NUMBER,
      },
      group_id: DataTypes.NUMBER,
      paid_by: DataTypes.NUMBER,
      paid_to: DataTypes.NUMBER,
      amount: DataTypes.FLOAT,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Settlement",
      tableName: "settlements",
      timestamps: true,
    },
  );
  return Settlement;
};
