const {
  getGroupData,
  getGroupExpensesData,
  getGroupBalancesData,
  addGroupExpenseData,
  deleteExpenseData,
} = require("../services/group.service");

exports.getGroupDetails = async (req, res) => {
  const groupId = req.params.id;

  const { group, members } = await getGroupData(Number(groupId));

  res.status(200).json({ message: "get group data", group, members });
};

exports.getGroupExpenses = async (req, res) => {
  const groupId = req.params.id;

  const groupExpenses = await getGroupExpensesData(Number(groupId));

  res.status(200).json({
    message: `get getting group expense for ${groupId}`,
    groupExpenses,
  });
};

exports.getGroupBalances = async (req, res) => {
  const groupId = req.params.id;

  const groupBalances = await getGroupBalancesData(Number(groupId));

  res.status(200).json({
    message: `get getting group balances for ${groupId}`,
    groupBalances,
  });
};

exports.addGroupExpense = async (req, res) => {
  const groupId = req.params.id;
  const data = req.body;

  console.log(data);
  try {
    const expense = await addGroupExpenseData(groupId, data);
    console.log(expense);
    res.status(200).json({ message: "adding group expense", expense });
  } catch (error) {
    res.status(400).json({ message: "error adding expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  const deletedExpenseId = await deleteExpenseData(expenseId);
  res
    .status(200)
    .json({ message: "Deleted Expense and Splits", deletedExpenseId });
};
