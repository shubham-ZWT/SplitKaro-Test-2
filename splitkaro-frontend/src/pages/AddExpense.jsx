import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import groupExpenseService from "../services/groupExpense.service";

export default function AddExpense() {
  const [groupIds, setGroupIds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [splitType, setSplitType] = useState("");
  const [splitTypeShow, setSplitTypeShow] = useState(false);
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [paidBy, setPaidBy] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchGroupIds = async () => {
      const data = await groupExpenseService.getGroupId();
      setGroupIds(data?.groupIds);
      setSelectedId(data?.groupIds[0]?.id);
    };

    fetchGroupIds();
  }, []);

  useEffect(() => {
    const fetchGroupData = async () => {
      const grpDetails = await groupExpenseService.getGroupDataById(selectedId);
      setGroupMembers(grpDetails?.members);
    };

    fetchGroupData();
  }, [selectedId]);

  console.log(groupIds);
  console.log(groupMembers);

  // const handleAddExpense = () => {};

  //handle logic for extra paisa to 1st person
  const handleExtraEqual = (totalAmount, members) => {
    const totalAmountPaisa = totalAmount * 100;
    const eachShare = Math.floor(totalAmountPaisa / members.length);
    const totalRemainder = totalAmountPaisa % members.length;

    const splits = members.map((mem, index) => {
      const splitAmount = index === 0 ? eachShare + totalRemainder : eachShare;

      const splitInRup = Math.floor(splitAmount);
      return { id: mem.id, split: splitInRup };
    });

    return splits;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h1>Add Expenses</h1>
        <div className="bg-amber-100 w-fit p-2 rounded-lg flex gap-2 items-center font-semibold mt-4 mb-4 text-lg text-amber-800">
          <label htmlFor="groupId">Change Group Id : </label>
          <select
            className=" border border-amber-700 px-2 rounded-lg"
            name=""
            id="groupId"
            value={selectedId}
            onChange={(e) => {
              setSelectedId(Number(e.target.value));
            }}
          >
            <option value="">Group Id</option>
            {groupIds.map((id) => (
              <option value={id.id}>{id.id}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row  gap-6">
            <div>
              <label id="description">Description : </label>
              <input
                type="text"
                id="description"
                className=" border border-gray-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label id="totalAmount">Total Amount : </label>
              <input
                type="text"
                id="totalAmount"
                className=" border border-gray-500"
                value={totalAmount}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <label id="paidBy">Paid By : </label>
              <select
                name="paidBy"
                id="paidBy"
                onChange={(e) => setPaidBy(Number(e.target.value))}
              >
                <option value="">Select Paid By</option>
                {groupMembers.map((gm) => (
                  <option value={gm.id}>{gm.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-row gap-3">
              <label htmlFor="date">Date :</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <label htmlFor="splitType">Select Split type</label>
              <select
                className="border border-gray-700"
                name="splitType"
                id="splitType"
                onChange={(e) => {
                  if (
                    e.target.value === "percentage" ||
                    e.target.value === "exact"
                  ) {
                    setSplitTypeShow(true);
                  } else {
                    setSplitTypeShow(false);
                  }

                  setSplitType(e.target.value);
                }}
              >
                <option value="">---type---</option>
                <option value="equal">Equal</option>
                <option value="exact">Exact</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
          </div>

          {splitTypeShow && (
            <div>
              {groupMembers.map((gm) => (
                <div>
                  <p>{gm.name}</p>
                  <input
                    type="text"
                    name="exactAmount"
                    id=""
                    className="bg-gray-100 border border-gray-200"
                  />
                </div>
              ))}
            </div>
          )}

          <div>
            <button className="bg-green-100 text-green-800 font-semibold px-2 py-1 rounded-lg">
              Save Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
