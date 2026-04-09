import { useState, useEffect } from "react";
import groupExpenseService from "../services/groupExpense.service";
import groupSettlementService from "../services/settlement.service";

export default function SettlementPage() {
  const [groupIds, setGroupIds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [settleFrom, setSettleFrom] = useState([]);
  const [pendingSettlements, setPendingSettlements] = useState([]);
  const [settlementHistory, setSettlementHistory] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

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
                    {pendingSettlements.map((ps) => (
                      <tr>
                        <td>{ps?.from?.member_name}</td>
                        <td>{ps?.to?.member_name}</td>

                        <td>{ps?.amount}</td>
                        <td>
                          <button
                            onClick={(e) => {
                              console.log(ps);
                              setSettleFrom(ps);
                            }}
                            className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-lg mt-4 cursor-pointer"
                          >
                            Record
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col">
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
                        <td>{ps?.date?.slice(0, 10)}</td>
                        <td>{ps?.paidBy?.name}</td>
                        <td>{ps?.paidTo?.name}</td>

                        <td>{ps?.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                onClick={async (e) => {
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
                    setShowSuccess(true);
                    
                  }
                }}
              >
                Record Payment
              </button>
              {showSuccess ?? <p>Settlement Recorded</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
