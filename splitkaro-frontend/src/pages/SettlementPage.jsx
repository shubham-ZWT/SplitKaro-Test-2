import { useState, useEffect } from "react";
import groupExpenseService from "../services/groupExpense.service";
import groupSettlementService from "../services/settlement.service";
import { formatCurrency, formatDate } from "../utils/formatter";

export default function SettlementPage() {
  const [groupIds, setGroupIds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [settleFrom, setSettleFrom] = useState([]);
  const [pendingSettlements, setPendingSettlements] = useState([]);
  const [settlementHistory, setSettlementHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchGroupIds = async () => {
      const data = await groupExpenseService.getGroupId();
      setGroupIds(data?.groupIds);
      setSelectedId(data?.groupIds[0]?.id);
    };

    fetchGroupIds();
  }, []);

  useEffect(() => {
    const fetchPendingSettlements = async () => {
      const data =
        await groupSettlementService.getPendingSettlement(selectedId);

      setPendingSettlements(data?.suggest);
      const history =
        await groupSettlementService.getSettlementHistory(selectedId);
      setSettlementHistory(history?.settlementHistoryData);
    };

    fetchPendingSettlements();
  }, [selectedId]);

  const handleSettlementSubmit = async () => {
    const data = {
      paid_by: settleFrom?.from?.member_id,
      paid_to: settleFrom?.to?.member_id,
      amount: settleFrom?.amount,
      date: new Date(),
    };
    console.log(data);

    const response = await groupSettlementService.addSettlement(
      selectedId,
      data,
    );
    console.log("called the settle");
    console.log(response);
    if (response.settlement) {
      setMessage(response.message);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        window.location.reload();
      }, 2000);
    }
  };

  console.log(pendingSettlements);
  console.log(settlementHistory);

  return (
    <div className="max-w-7xl mx-auto">
      <div className=" mt-4">
        <h1 className="text-2xl font-bold">Settlement</h1>

        <div className="bg-amber-100 w-fit p-2 rounded-lg flex gap-2 items-center font-semibold mt-4 mb-4 text-lg text-amber-800">
          <label htmlFor="groupId">Change Group Id : </label>
          <select
            className=" border border-amber-700 px-2 rounded-lg"
            name=""
            id="groupId"
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
            }}
          >
            <option value="">Group Id</option>
            {groupIds.map((id) => (
              <option value={id.id}>{id.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">Pending Settlements</h2>
              <div className="w-2xl justify-center">
                {pendingSettlements?.length > 0 ? (
                  <table className="table-auto w-full mt-5">
                    <thead className="bg-base-200 text-left text-gray-700  tracking-wider">
                      <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {pendingSettlements.map(
                        (ps) =>
                          ps.amount != 0 && (
                            <tr>
                              <td>{ps?.from?.member_name}</td>
                              <td>{ps?.to?.member_name}</td>

                              <td className="font-semibold">
                                {formatCurrency(ps?.amount)}
                              </td>
                              <td>
                                <button
                                  onClick={() => {
                                    console.log(ps);
                                    setSettleFrom(ps);
                                  }}
                                  className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-lg mt-4 cursor-pointer"
                                >
                                  Record
                                </button>
                              </td>
                            </tr>
                          ),
                      )}
                    </tbody>
                  </table>
                ) : (
                  <p>No Pending Settlements.</p>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <h2 className="text-2xl font-semibold">Settlement History</h2>
              <div>
                <table className="table-auto w-full mt-5">
                  <thead className="bg-base-200 text-left text-gray-700  tracking-wider">
                    <tr>
                      <th>Date</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {settlementHistory.map((ps) => (
                      <tr>
                        <td>
                          <p className="mt-3">{formatDate(ps?.date)}</p>
                        </td>
                        <td>
                          <p className="mt-3"> {ps?.paidBy?.name}</p>
                        </td>
                        <td>
                          <p className="mt-3">{ps?.paidTo?.name}</p>
                        </td>

                        <td className="font-semibold">
                          <p className="mt-3">{formatCurrency(ps?.amount)}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {settlementHistory?.length == 0 && (
                  <p>No Settlement History Found.</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">Record Settlement</h2>
            <div className="flex flex-col gap-3">
              <div>
                <label
                  for="paid_by"
                  class="block mb-2.5 text-sm font-medium text-heading"
                >
                  From
                </label>
                <input
                  type="text"
                  id="paid_by"
                  class=" border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  value={settleFrom?.from?.member_name}
                  required
                  disabled
                />
              </div>
              <div>
                <label htmlFor="paidBy">To</label>
                <input
                  type="text"
                  id="paid_by"
                  class=" border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  value={settleFrom?.to?.member_name}
                  required
                  disabled
                />
              </div>
              <div>
                <label htmlFor="amountToPay">Amount</label>
                <input
                  type="text"
                  id="amountToPay"
                  class=" border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  value={settleFrom?.amount}
                  disabled
                  required
                />
              </div>
              <button
                className="bg-blue-100 text-blue-800 font-semibold  px-3 py-1 rounded-lg cursor-pointer"
                onClick={handleSettlementSubmit}
              >
                Record Payment
              </button>
              {showMessage && <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
