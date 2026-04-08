"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExpenseSplit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ExpenseSplit.belongsTo(models.Expense, { foreignKey: "expense_id" });

      ExpenseSplit.belongsTo(models.Member, { foreignKey: "member_id" });
    }
  }
  ExpenseSplit.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      expense_id: DataTypes.INTEGER,
      member_id: DataTypes.INTEGER,
      amount_owed: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "ExpenseSplit",
      timestamps: true,
      tableName: "expense_split",
    },
  );
  return ExpenseSplit;
};
