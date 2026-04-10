import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import groupExpenseService from "../services/groupExpense.service";
import groupSettlementService from "../services/settlement.service";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "../utils/formatter";
import useDebounce from "../hooks/useDebounce";

export default function Dashboard({ selectedId, groupIds }) {
  // const [groupIds, setGroupIds] = useState([]);
  // const [selectedId, setSelectedId] = useState(null);
  const [groupExpense, setGroupexpense] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [groupMemberBalance, setGroupMemberBalance] = useState([]);
  const [pendingSettlements, setPendingSettlements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedValue = useDebounce(searchTerm, 1000);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchGroupIds = async () => {
  //     const data = await groupExpenseService.getGroupId();
  //     setGroupIds(data?.groupIds);
  //     setSelectedId(data?.groupIds[0]?.id);
  //   };

  //   fetchGroupIds();
  // }, []);

  useEffect(() => {
    const fetchPendingSettlements = async () => {
      const data =
        await groupSettlementService.getPendingSettlement(selectedId);

      setPendingSettlements(data?.suggest);
    };

    fetchPendingSettlements();
  }, [selectedId]);

  useEffect(() => {
    const fetchGroupExpenseData = async () => {
      const data = await groupExpenseService.getAllExpenses(selectedId);
      const response = await groupExpenseService.getGroupDataById(selectedId);
      const grpExp = await groupExpenseService.getgroupBalance(selectedId);
      setGroupexpense(data?.groupExpenses);
      setGroupData(response);
      setGroupMemberBalance(grpExp);
    };

    fetchGroupExpenseData();
  }, [selectedId]);

  // console.log(groupIds);
  // console.log(groupExpense);
  // console.log(groupData);
  // console.log(groupMemberBalance);
  // console.log(
  //   groupIds?.filter((gr) => {
  //     return gr.id == selectedId;
  //   }),
  // );

  // console.log(debouncedValue);
  const filteredExpense = groupExpense?.filter((ge) =>
    ge?.Member?.name?.toLowerCase().includes(debouncedValue.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Group Overview</h1>
      {/* <div className="bg-amber-100 w-fit p-2 rounded-lg flex gap-2 items-center font-semibold mt-4 mb-4 text-lg text-amber-800">
        <label htmlFor="groupId">Change Group : </label>
        <select
          className=" border border-amber-700 px-2 rounded-lg"
          name=""
          id="groupId"
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
          }}
        >
          {groupIds.map((id) => (
            <option value={id.id}>{id.name}</option>
          ))}
        </select>
      </div> */}
      <div>
        <div>
          <h2 className="font-semibold text-2xl bg-purple-50 text-purple-800 w-fit px-3 py-1 rounded-lg">
            Group Name:{" "}
            {
              groupIds?.filter((gr) => {
                return gr.id == selectedId;
              })[0]?.name
            }
          </h2>
          <p className="text-gray-500">
            (Number of members {groupData?.members?.length}){" "}
          </p>
        </div>
        <div>
          <div>
            <p className="font-semibold">Member Expense </p>
            <div className="flex flex-row justify-between gap-4 mb-3">
              {groupMemberBalance?.groupBalances?.members?.map((gm, index) => (
                <div
                  className={`bg-gray-100 border-t-4 ${
                    groupMemberBalance?.groupBalances?.membersExpense?.[index]
                      .balance < 0
                      ? `border-red-600`
                      : `border-green-600`
                  }  p-4 rounded-lg w-full`}
                >
                  <p className="font-semibold text-lg">{gm.name}</p>

                  <p
                    className={`${
                      groupMemberBalance?.groupBalances?.membersExpense?.[index]
                        .balance < 0
                        ? `text-red-600`
                        : `text-green-600`
                    } flex flex-col text-2xl font-semibold`}
                  >
                    {formatCurrency(
                      groupMemberBalance?.groupBalances?.membersExpense?.[index]
                        .balance,
                    )}
                    <span className=" text-sm font-normal">
                      {groupMemberBalance?.groupBalances?.membersExpense?.[
                        index
                      ].balance < 0
                        ? "Owes"
                        : "is Owed"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-2xl justify-center mt-3 mb-3">
            <h2 className="text-2xl font-semibold">Pending Settlements</h2>
            {pendingSettlements?.length > 0 ? (
              <table className="table-auto w-full mt-5 mb-5">
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
                          <td>
                            <p className="mt-4">{ps?.from?.member_name} </p>
                          </td>
                          <td>
                            <p className="mt-4">{ps?.to?.member_name} </p>
                          </td>

                          <td className="font-semibold">
                            <p className="mt-4">
                              {formatCurrency(ps?.amount)}{" "}
                            </p>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                navigate("/settle");
                              }}
                              className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-lg mt-4 cursor-pointer"
                            >
                              Settle Payments
                            </button>
                          </td>
                        </tr>
                      ),
                  )}
                </tbody>
              </table>
            ) : (
              <p className="mt-3">No Pending Settlements.</p>
            )}
          </div>
        </div>

        <div className="flex justify-between bg-blue-50 rounded-lg border-b border-blue-800 p-3 font-semibold">
          <p className="flex items-center gap-2">
            Total Group Expense :{" "}
            <span className="text-xl">
              {formatCurrency(
                groupExpense?.reduce((sum, obj) => {
                  return sum + obj.amount;
                }, 0),
              )}
            </span>
          </p>
          <p className="flex items-center gap-2">
            Total You Paid :{" "}
            <span className="text-xl text-green-700">
              {formatCurrency(
                groupMemberBalance?.groupBalances?.membersExpense?.[0].expense,
              )}
            </span>
          </p>
          <p className="flex items-center gap-2">
            Your Net Balance :{" "}
            <span className="text-xl text-green-700">
              {formatCurrency(
                groupMemberBalance?.groupBalances?.membersExpense?.[0].balance,
              )}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex-col justify-between">
            <h3 className="text-2xl font-semibold">All Expenses</h3>
            <div className="flex justify-between items-center mt-3">
              <div>
                <input
                  placeholder="Search by member here"
                  className="px-3 py-1 border border-gray-300 rounded-lg w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-row ">
                <Link
                  to="/add-expense"
                  className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg self-end font-semibold"
                >
                  Add Expense
                </Link>
              </div>
            </div>
          </div>

          <div className="">
            {groupExpense.length > 0 ? (
              <table className="table-auto w-full mt-5">
                <thead className="bg-base-200 text-left text-gray-700  tracking-wider">
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Paid By</th>
                    <th>Amount</th>
                    <th>Split Type</th>
                  </tr>
                </thead>
                <tbody className="">
                  {filteredExpense.map((expense) => (
                    <tr key={expense.id} className=" ">
                      <td>
                        <p className="mt-4"> {formatDate(expense?.date)} </p>
                      </td>
                      <td>
                        <p className="mt-4">{expense.description} </p>
                      </td>
                      <td>
                        <p className="mt-4">{expense?.Member?.name} </p>
                      </td>
                      <td>
                        <p className="mt-4">
                          {formatCurrency(expense?.amount)}{" "}
                        </p>
                      </td>
                      <td>
                        <p className="mt-4 bg-amber-50 text-amber-800 px-3 py-1 rounded-lg  font-semibold  w-fit text">
                          {expense.split_type}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Expense in the Group</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
