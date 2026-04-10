const { where } = require("sequelize");
const {
  Group,
  Member,
  Expense,
  ExpenseSplit,
  Settlement,
  sequelize,
} = require("../../models/index");

exports.getSettelementSuggest = async (groupId) => {
  const members = await Member.findAll({
    attributes: ["id", "name", "group_id"],
    where: {
      group_id: groupId,
    },
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

    const expenIdsArr = expenseIds.map((a) => a.id);
    console.log(expenIdsArr);

    const expenseGiveBack = await ExpenseSplit.sum("amount_owed", {
      where: {
        expense_id: expenIdsArr,
        member_id: member.id,
      },
    });
    console.log(expenIdsArr);

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
      Number(memberBalance || 0) +
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
      member_name: member.name,
      expense: memberExpense,
      balance: parseFloat(balanceAfterSettlement).toFixed(2),
    });
  }

  const creditors = [];
  const debtors = [];

  for (const mem of membersExpense) {
    if (mem.balance < 0) {
      debtors.push(mem);
    } else {
      creditors.push(mem);
    }
  }

  console.log("Creditors ", creditors);
  console.log("Debtors", debtors);

  const settlementSuggest = [];

  while (creditors.length > 0 && debtors.length > 0) {
    creditors.sort((a, b) => a.balance - b.balance);
    debtors.sort((a, b) => a.balance - b.balance);

    const largetDebtor = debtors[0];
    const largetCreditor = creditors[0];

    const paymentAmount = Math.min(
      largetCreditor.balance,
      Math.abs(largetDebtor.balance),
    );

    console.log(paymentAmount);

    largetCreditor.balance = largetCreditor.balance - paymentAmount;
    largetDebtor.balance = Math.abs(largetDebtor.balance) - paymentAmount;

    settlementSuggest.push({
      from: largetDebtor,
      to: largetCreditor,
      amount: parseFloat(paymentAmount).toFixed(2),
    });
    if (largetCreditor.balance === 0) {
      creditors.shift();
    }
    if (largetDebtor.balance == 0) {
      debtors.shift();
    }
  }

  console.log("Creditord", creditors, "debtors", debtors);
  return settlementSuggest;
};

exports.addSettlement = async (groupId, data) => {
  try {
    
    const settlement = Settlement.create({
      group_id: groupId,
      paid_by: data.paid_by,
      paid_to: data.paid_to,
      amount: data.amount,
      date: data.date,
    });

    return settlement;
  } catch (error) {
    console.log(error);
  }
};

exports.getSettlementHistory = async (groupId) => {
  try {
    const settHistory = await Settlement.findAll({
      where: {
        group_id: groupId,
      },
      include: [
        {
          model: Member,
          as: "paidBy",
          attributes: ["id", "name"],
        },
        {
          model: Member,
          as: "paidTo",
          attributes: ["id", "name"],
        },
      ],
    });

    console.log(settHistory);

    return settHistory;
  } catch (error) {
    console.log(error);
  }
};
