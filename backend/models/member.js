"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Member.belongsTo(models.Group, { foreignKey: "group_id" });

      Member.hasMany(models.Expense, { foreignKey: "paid_by" });

      Member.hasMany(models.ExpenseSplit, { foreignKey: "member_id" });
    }
  }
  Member.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      group_id: {
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Member",
      tableName: "members",
      timestamps: true,
    },
  );
  return Member;
};
