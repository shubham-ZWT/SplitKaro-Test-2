const { where, col, Op } = require("sequelize");
const {
  Group,
  Member,
  Expense,
  ExpenseSplit,
  sequelize,
} = require("../../models/index");
const { raw } = require("express");

exports.getGroupData = async (groupId) => {
  const group = await Group.findByPk(groupId);

  const members = await Member.findAll({
    attributes: ["name", "email", "phone"],
    where: { group_id: groupId },
  });

  return { group, members };
};

exports.getGroupExpensesData = async (groupId) => {
  const expenses = Expense.findAll({
    include: [
      {
        model: ExpenseSplit,
        attributes: ["id", "expense_id", "member_id", "amount_owed"],
      },
    ],
    where: { group_id: groupId },
  });

  return expenses;
};

exports.getGroupBalancesData = async (groupId) => {
  const members = await Member.findAll({
    attributes: ["id", "name", "group_id"],
    where: {
      group_id: groupId,
    },
    // include: [
    //   {
    //     model: Expense,
    //     attributes: [
    //       "id",
    //       "group_id",
    //       [sequelize.fn("SUM", col("amount")), "Total_Expense"],
    //     ],
    //     where: {
    //       [Op.and]: [{ group_id: groupId }],
    //     },
    //   },
    // ],
  });

  console.log(members);

  return members;
};

exports.addGroupExpenseData = async (groupId, data) => {
  const totalAmount = data.amount;
  const splitType = data.split_type;
  const allSplits = data.splits;

  console.log(Object.values(allSplits).reduce((sum, value) => sum + value, 0));
  const totalOfSplits = Object.values(allSplits).reduce(
    (sum, value) => sum + value,
    0,
  );

  if (splitType === "equal" || splitType === "exact") {
    if (Number(totalAmount) !== Number(totalOfSplits)) {
      throw new Error("Invalid Total Amount does not match with splits ");
    }
  }

  if (splitType === "percentage") {
    const percentageTotal = Object.values(data.splits).reduce(
      (sum, value) => sum + value,
      0,
    );

    console.log(percentageTotal);
    if (percentageTotal !== 100) throw Error("Invalid Percentage division");
  }

  const t = await sequelize.transaction();

  const splitArray = Object.entries(data.splits);

  try {
    const expense = await Expense.create(
      {
        group_id: groupId,
        paid_by: data.paid_by,
        amount: data.amount,
        description: data.description,
        split_type: data.split_type,
        date: new Date(data.date),
      },
      { transaction: t },
    );

    for (let i = 0; i < splitArray.length; i++) {
      const split = splitArray[i];
      if (splitType === "percentage") {
        const tempPercent = split[1];
        split[1] = (totalAmount * tempPercent) / 100;
      }
      console.log(split[1]);
      const expenseSplit = await ExpenseSplit.create(
        {
          expense_id: expense.id,
          member_id: Number(split[0]),
          amount_owed: Number(split[1]),
        },
        { transaction: t },
      );
    }

    await t.commit();

    return expense;
  } catch (error) {
    await t.rollback();
    return false;
  }
};

exports.deleteExpenseData = async (expenseId) => {
  const t = await sequelize.transaction();

  try {
    const deletedSplits = ExpenseSplit.destroy(
      {
        where: {
          expense_id: expenseId,
        },
        force: true,
      },
      {
        transaction: t,
      },
    );

    const expense = Expense.destroy(
      {
        where: {
          id: expenseId,
        },
        force: true,
      },
      { transaction: t },
    );

    await t.commit();

    return expense.id;
  } catch (error) {
    await t.rollback();
  }
};

exports.addGroupData = async (groupData) => {
  const t = await sequelize.transaction();

  try {
    const group = await Group.create(
      {
        name: groupData.group_name,
        description: groupData.group_description,
      },
      { transaction: t },
    );

    console.log(groupData.group_members);
    const bulkMembers = groupData.group_members.map((o) => ({
      group_id: group.id,
      ...o,
    }));
    console.log("logging bulk members:", bulkMembers);

    await Member.bulkCreate(bulkMembers, { transaction: t });

    await t.commit();

    return group;
  } catch (error) {
    await t.rollback();
  }
};

exports.getGroupIdsData = async () => {
  const groupIds = await Group.findAll({
    attributes: ["id"],
  });

  console.log(groupIds);

  return groupIds;
};
