const { where, col, Op } = require("sequelize");
const {
  Group,
  Member,
  Expense,
  ExpenseSplit,
  Settlement,
  sequelize,
} = require("../../models/index");

exports.getGroupData = async (groupId) => {
  try {
    const err = new Error("Server Error, Cannot get the Grop Data");
    err.statusCode = 400;
    throw err;
    const members = await Member.findAll({
      attributes: ["id", "name", "email", "phone"],
      where: { group_id: groupId },
    });

    return { members };
  } catch (error) {
    const err = new Error("Server Error, Cannot get the Grop Data");
    err.statusCode = 400;
    throw err;
  }
};

exports.getGroupExpensesData = async (groupId) => {
  const expenses = Expense.findAll({
    include: [
      {
        model: ExpenseSplit,
        attributes: ["id", "expense_id", "member_id", "amount_owed"],
      },
      {
        model: Member,
        attributes: ["name"],
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

  const membersExpense = [];
  for (const member of members) {
    console.log(member.id);
    const memberExpense = await Expense.sum("amount", {
      where: { group_id: groupId, paid_by: member.id },
    });

    const expenseIds = await Expense.findAll({
      attributes: ["id"],
      where: {
        group_id: groupId,
      },
      raw: true,
    });
    // console.log(expenseIds.map((a) => a.id));
    const expenIdsArr = expenseIds.map((a) => a.id);
    console.log(expenIdsArr);

    const expenseGiveBack = await ExpenseSplit.sum("amount_owed", {
      where: {
        expense_id: expenIdsArr,
        member_id: member.id,
      },
    });

    const settlementReceived = await Settlement.sum("amount", {
      where: {
        paid_to: member.id,
      },
    });

    const settlementPaid = await Settlement.sum("amount", {
      where: {
        paid_by: member.id,
      },
    });

    const memberBalance =
      parseFloat(memberExpense || 0).toFixed(2) -
      parseFloat(expenseGiveBack || 0).toFixed(2);

    let balanceAfterSettlement;

    // if (memberBalance >= 0) {
    //   balanceAfterSettlement =
    //     Number(memberBalance) -
    //     Number(parseFloat(settlementPaid || 0).toFixed(2)) +
    //     Number(parseFloat(settlementReceived || 0).toFixed(2));
    // }

    balanceAfterSettlement =
      Number(memberBalance) +
      Number(parseFloat(settlementPaid || 0).toFixed(2)) -
      Number(parseFloat(settlementReceived || 0).toFixed(2));

    console.log("for member id", member.id);
    console.log(
      "member expanse did",
      parseFloat(memberExpense || 0).toFixed(2),
    );
    console.log("give back", parseFloat(expenseGiveBack || 0).toFixed(2));
    console.log("balance ", memberBalance);
    console.log(
      "settlementreceived ",
      parseFloat(settlementReceived || 0).toFixed(2),
    );
    console.log("settlementPaid", parseFloat(settlementPaid || 0).toFixed(2));
    console.log("balance after settlement", balanceAfterSettlement);

    membersExpense.push({
      member_id: member.id,
      // member_name:member.name,
      expense: memberExpense,
      balance: parseFloat(balanceAfterSettlement).toFixed(2),
    });
    // console.log(member);
    // member.map((m) => ({ ...m, expense: memberExpense }));
  }

  // console.log(members);

  return { members, membersExpense };
};

exports.addGroupExpenseData = async (groupId, data) => {
  const totalAmount = data.amount;
  const splitType = data.split_type;
  const allSplits = data.splits;

  console.log(Object.values(allSplits).reduce((sum, value) => sum + value, 0));
  const totalOfSplits = Object.values(allSplits).reduce(
    (sum, value) => Number(sum) + Number(value),
    0,
  );

  if (splitType === "exact") {
    if (Number(totalAmount) !== Number(totalOfSplits)) {
      throw new Error("Invalid Total Amount does not match with splits ");
    }
  }

  if (splitType === "percentage") {
    const percentageTotal = Object.values(data.splits).reduce(
      (sum, value) => Number(sum) + Number(value),
      0,
    );

    console.log(percentageTotal);
    if (percentageTotal !== 100) throw Error("Invalid Percentage division");
  }

  const t = await sequelize.transaction();

  const splitArray = Object.entries(data.splits);
  console.log(splitArray);

  // logic to handle extra paisa
  if (splitType === "equal") {
    const totalAmountPaisa = Math.round(totalAmount * 100);
    const pershare = Math.floor(totalAmountPaisa / splitArray.length);
    const extraPaisaRemainder = totalAmountPaisa % splitArray.length;
    console.log(totalAmount, pershare, extraPaisaRemainder);

    for (let i = 0; i < splitArray.length; i++) {
      const memShare = i === 0 ? pershare + extraPaisaRemainder : pershare;
      console.log(memShare);

      splitArray[i][1] = parseFloat(memShare / 100).toFixed(2);
    }
  }
  console.log("after equal", splitArray);

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
      console.log("entering data from ", i);
      const expenseSplit = await ExpenseSplit.create(
        {
          expense_id: expense.id,
          member_id: Number(split[0]),
          amount_owed: Number(split[1]),

          raw: true,
        },

        { transaction: t },
      );

      console.log(expenseSplit);
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
    attributes: ["id", "name"],
  });

  console.log(groupIds);

  return groupIds;
};
