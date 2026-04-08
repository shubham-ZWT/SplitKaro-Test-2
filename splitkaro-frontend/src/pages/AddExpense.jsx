import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import groupExpenseService from "../services/groupExpense.service";

export default function AddExpense() {
  const [groupData, setGroupdata] = useState([]);
  const [currentGroupId, setCurrentGroupId] = useState(1);
  const [groupMembers, setGroupMembers] = useState([]);
  const [isExact, setIsExact] = useState(false);

  useEffect(() => {
    const fetchGroupData = async (id) => {
      const groupData = await groupExpenseService.getGroupDataById(id);
      setGroupdata(groupData.group);
      setGroupMembers(groupData.members);
    };

    fetchGroupData(currentGroupId);
  }, [currentGroupId]);

  const handlegroupIdChange = (event) => {
    console.log(event.target.value);
    setCurrentGroupId(event.target.value);
  };

  console.log(groupData);
  console.log(groupMembers);

  return (
    <div>
      <div>
        <h1>Add Expenses</h1>
        {/* <select name="groupIds" id="groupIds">
          <option value="">Select Group Id</option>
          {groupData.map((grp) => (
            <option key={grp.id} value={grp.id}>
              {grp.id}
            </option>
          ))}
        </select> */}

        <div>
          <label id="description">Description</label>
          <input
            type="text"
            id="description"
            className=" border border-gray-500"
          />
          <label id="totalAmount">Total Amount</label>
          <input
            type="text"
            id="totalAmount"
            className=" border border-gray-500"
          />
          <label id="paidBy">Paid By</label>
          <select name="paidBy" id="paidBy">
            <option value="">Select Paid By</option>
            {groupMembers.map((gm) => (
              <option value={gm.id}>{gm.name}</option>
            ))}
          </select>

          <label htmlFor="date">date</label>
          <input type="date" />

          <select name="splitType" id="splitType">
            <option value="">Select Split type</option>
            <option value="equal">Equal</option>
            <option value="exact">Exact</option>
            <option value="percentage">Percentage</option>
          </select>

          {isExact && (
            <div>
              {groupMembers.map((gm) => (
                <div>
                  <p>{gm.name}</p>
                  <input type="text" name="exactAmount" id="" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
