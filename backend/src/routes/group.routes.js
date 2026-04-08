const express = require("express");
const {
  getGroupDetails,
  getGroupExpenses,
  getGroupBalances,
  addGroupExpense,
  deleteExpense,
  addGroup
} = require("../controllers/group.controller");

const router = express.Router();

router.get("/groups/:id", getGroupDetails);
router.get("/groups/:id/expenses", getGroupExpenses);
router.get("/groups/:id/balances", getGroupBalances);

router.post("/groups", addGroup);
router.post("/groups/:id/expenses", addGroupExpense);

router.delete("/expenses/:id", deleteExpense);

module.exports = router;
