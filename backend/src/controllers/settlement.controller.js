const {
  getSettelementSuggest,
  addSettlement,
  getSettlementHistory,
} = require("../services/settlement.service");

exports.suggestSettlements = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const suggest = await getSettelementSuggest(groupId);
    res.status(200).json({
      message: `Pending Settlement Suggestions for the Group `,
      suggest,
    });
  } catch (error) {
    next(error);
  }
};

exports.settlePayment = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const data = req.body;
    const settlement = await addSettlement(groupId, data);
    res.status(200).json({ message: "Settlement Done !!", settlement });
  } catch (error) {
    next(error);
  }
};

exports.settlementHistory = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const settlementHistoryData = await getSettlementHistory(groupId);
    res.status(200).json({
      message: "Settlement History of the Group  ",
      settlementHistoryData,
    });
  } catch (error) {
    next(error);
  }
};
