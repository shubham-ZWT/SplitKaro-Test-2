const {
  getSettelementSuggest,
  addSettlement,
  getSettlementHistory,
} = require("../services/settlement.service");

exports.suggestSettlements = async (req, res, next) => {
  const groupId = req.params.id;

  try {
    const suggest = await getSettelementSuggest(groupId);
    res
      .status(200)
      .json({ message: `suggest settlemnts for id ${groupId}`, suggest });
  } catch (error) {
    next(error);
  }
};

exports.settlePayment = async (req, res, next) => {
  const groupId = req.params.id;
  const data = req.body;

  try {
    const settlement = await addSettlement(groupId, data);
    res.status(200).json({ message: "settlement done", settlement });
  } catch (error) {
    next(error);
  }
};

exports.settlementHistory = async (req, res, next) => {
  const groupId = req.params.id;

  try {
    const settlementHistoryData = await getSettlementHistory(groupId);
    res.status(200).json({ message: "settlement history", settlementHistoryData });
  } catch (error) {
    next(error);
  }
};
