const express = require("express");
const {
  getGroupDetails,
  getGroupExpenses,
  getGroupBalances,
  addGroupExpense,
  deleteExpense,
  addGroup,
  getGroupIds,
} = require("../controllers/group.controller");
const {
  suggestSettlements,
  settlePayment,
} = require("../controllers/settlement.controller");

const router = express.Router();

router.get("/groups", getGroupIds);
router.get("/groups/:id", getGroupDetails);
router.get("/groups/:id/expenses", getGroupExpenses);
router.get("/groups/:id/balances", getGroupBalances);

router.post("/groups", addGroup);
router.post("/groups/:id/expenses", addGroupExpense);

router.delete("/expenses/:id", deleteExpense);

//setlements
router.get("/groups/:id/settlements/suggest", suggestSettlements);
router.post("/groups/:id/settlements", settlePayment);

module.exports = router;
