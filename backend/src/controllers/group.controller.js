const {
  getGroupData,
  getGroupExpensesData,
  getGroupBalancesData,
  addGroupExpenseData,
  deleteExpenseData,
  addGroupData,
  getGroupIdsData,
} = require("../services/group.service");

exports.getGroupDetails = async (req, res, next) => {
  const groupId = req.params.id;

  try {
    const { group, members } = await getGroupData(Number(groupId));
    res.status(200).json({ message: "get group data", group, members });
  } catch (error) {
    next(error);
  }
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
  res.status(200).json({
    success: true,
    message: "Deleted Expense and Splits",
    deletedExpenseId,
  });
};

exports.addGroup = async (req, res) => {
  const groupData = req.body;
  console.log(groupData);

  const addGroup = await addGroupData(groupData);

  res.status(200).json({ message: "Adding Group with Member", addGroup });
};

exports.getGroupIds = async (req, res) => {
  const groupIds = await getGroupIdsData();
  console.log(groupIds);

  res.status(200).json({ message: "Get all group Ids", groupIds });
};
