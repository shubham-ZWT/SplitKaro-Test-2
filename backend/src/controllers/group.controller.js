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
  try {
    const groupId = req.params.id;
    const { group, members } = await getGroupData(Number(groupId));
    res.status(200).json({ message: "Group Data", group, members });
  } catch (error) {
    next(error);
  }
};

exports.getGroupExpenses = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const groupExpenses = await getGroupExpensesData(Number(groupId));
    res.status(200).json({
      message: `Here is the Group Expense`,
      groupExpenses,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGroupBalances = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const groupBalances = await getGroupBalancesData(Number(groupId));
    res.status(200).json({
      message: `Here is the Group Balance !!`,
      groupBalances,
    });
  } catch (error) {
    next(error);
  }
};

exports.addGroupExpense = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const data = req.body;
    const expense = await addGroupExpenseData(groupId, data);
    res.status(200).json({ message: "Group Expense Added !!", expense });
  } catch (error) {
    console.log("error caught in controller")
    next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    const deletedExpenseId = await deleteExpenseData(expenseId);
    res.status(200).json({
      success: true,
      message: "Expense and Expense Splits Deleted !!",
      deletedExpenseId,
    });
  } catch (error) {
    next(error);
  }
};

exports.addGroup = async (req, res, next) => {
  try {
    const groupData = req.body;
    const addGroup = await addGroupData(groupData);
    res.status(200).json({ message: "Group Added !!", addGroup });
  } catch (error) {
    next(error);
  }
};

exports.getGroupIds = async (req, res, next) => {
  try {
    const groupIds = await getGroupIdsData();
    res.status(200).json({ message: "Group Ids !!", groupIds });
  } catch (error) {
    next(error);
  }
};
