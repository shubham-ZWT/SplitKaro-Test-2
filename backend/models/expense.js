"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Expense.belongsTo(models.Group, { foreignKey: "group_id" });

      Expense.belongsTo(models.Member, { foreignKey: "paid_by" });

      Expense.hasMany(models.ExpenseSplit, { foreignKey: "expense_id" });
    }
  }
  Expense.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      group_id: DataTypes.INTEGER,
      paid_by: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      description: DataTypes.STRING,
      split_type: DataTypes.ENUM("equal", "exact", "percentage"),
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Expense",
      tableName: "expenses",
      timestamps: true,
    },
  );
  return Expense;
};
