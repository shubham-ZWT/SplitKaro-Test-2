import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import groupExpenseService from "../services/groupExpense.service";
import { useNavigate } from "react-router-dom";

export default function AddExpense({ selectedId }) {
  // const [groupIds, setGroupIds] = useState([]);
  // const [selectedId, setSelectedId] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [splitTypeShow, setSplitTypeShow] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    paid_by: "",
    amount: "",
    description: "",
    split_type: "",
    date: "",
  });

  // useEffect(() => {
  //   const fetchGroupIds = async () => {
  //     const data = await groupExpenseService.getGroupId();
  //     setGroupIds(data?.groupIds);
  //     setSelectedId(data?.groupIds[0]?.id);
  //   };

  //   fetchGroupIds();
  // }, []);

  useEffect(() => {
    const fetchGroupData = async () => {
      const grpDetails = await groupExpenseService.getGroupDataById(selectedId);
      setGroupMembers(grpDetails?.members);
    };

    fetchGroupData();
  }, [selectedId]);

  const handleFormDataChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let initialSplits = {};
  groupMembers?.forEach((obj) => {
    initialSplits[obj.id] = 0;
  });

  // let totalSplit = 0;

  const handleSplitAmountChange = (memberId, amount) => {
    initialSplits[memberId] = amount;
    // console.log(initialSplits);
    // totalSplit = Object.values(initialSplits).reduce(
    //   (sum, value) => Number(sum) + Number(value),
    //   0,
    // );
    // console.log(totalSplit);
  };

  const handleExpenseSubmit = async () => {
    const data = {
      paid_by: form.paid_by,
      amount: form.amount,
      description: form.description,
      split_type: form.split_type,
      date: form.date,
      splits: initialSplits,
    };
    const response = await groupExpenseService.addGroupExpense(
      selectedId,
      data,
    );
    // console.log("response", response);

    if (response.message) {
      // console.log(response);
      setMessage(response.message);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setMessage("");
        navigate("/");
      }, 2000);
    }

    // console.log(response);
    // console.log(form);
  };

  // console.log(groupMembers);
  // console.log(initialSplits);

  const isValid =
    form.amount > 0 && form.paid_by.length > 0 && form.split_type.length > 0
      ? true
      : false;

  // const handleAddExpense = () => {};

  //handle logic for extra paisa to 1st person
  // const handleExtraEqual = (totalAmount, members) => {
  //   const totalAmountPaisa = totalAmount * 100;
  //   const eachShare = Math.floor(totalAmountPaisa / members.length);
  //   const totalRemainder = totalAmountPaisa % members.length;

  //   const splits = members.map((mem, index) => {
  //     const splitAmount = index === 0 ? eachShare + totalRemainder : eachShare;

  //     const splitInRup = Math.floor(splitAmount);
  //     return { id: mem.id, split: splitInRup };
  //   });

  //   return splits;
  // };

  return (
    <div className="max-w-7xl mx-auto mt-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Add Expenses</h1>
        {/* <div className="bg-amber-100 w-fit p-2 rounded-lg flex gap-2 items-center font-semibold mt-4 mb-4 text-lg text-amber-800">
          <label htmlFor="groupId">Change Group : </label>
          <select
            className=" border border-amber-700 px-2 rounded-lg"
            name=""
            id="groupId"
            value={selectedId}
            onChange={(e) => {
              setSelectedId(Number(e.target.value));
            }}
          >
            {groupIds.map((id) => (
              <option value={id.id}>{id.name}</option>
            ))}
          </select>
        </div> */}

        <div className="flex flex-col gap-6">
          <div className="flex flex-row  gap-6">
            <div>
              <label id="description" className="text-lg font-semibold">
                Description :{" "}
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="border border-gray-400 rounded-lg px-3"
                value={form.description}
                onChange={handleFormDataChange}
              />
            </div>

            <div>
              <label id="totalAmount" className="text-lg font-semibold">
                Total Amount :{" "}
              </label>
              <input
                type="text"
                id="totalAmount"
                name="amount"
                onChange={handleFormDataChange}
                className=" border border-gray-400 rounded-lg px-3"
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <label className="font-semibold text-lg" htmlFor="date">
              Date :
            </label>
            <input
              className="border border-gray-400 rounded-lg shadow-md px-2"
              type="date"
              name="date"
              onChange={handleFormDataChange}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <label htmlFor="splitType" className="font-semibold text-lg">
                Select Split type :{" "}
              </label>
              <select
                className="border border-gray-400 rounded-lg shadow-md px-2"
                name="split_type"
                id="splitType"
                onChange={(e) => {
                  handleFormDataChange(e);
                  if (
                    e.target.value === "percentage" ||
                    e.target.value === "exact"
                  ) {
                    setSplitTypeShow(true);
                  } else {
                    setSplitTypeShow(false);
                  }
                }}
              >
                <option value="">Options</option>
                <option value="equal">Equal</option>
                <option value="exact">Exact</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
            <div>
              <label id="paidBy" className="font-semibold text-lg">
                Paid By :{" "}
              </label>
              <select
                className="border border-gray-400 rounded-lg shadow-md px-2 "
                name="paid_by"
                id="paidBy"
                onChange={handleFormDataChange}
              >
                <option value="">Options</option>
                {groupMembers.map((gm) => (
                  <option value={gm.id}>{gm.name}</option>
                ))}
              </select>
            </div>

            {splitTypeShow === false && (
              <p className="bg-yellow-100 text-yellow-800 font-semibold text-lg px-3 py-1 rounded-lg">
                (for Equal Split each member gets{" "}
                {form?.amount / Object.keys(initialSplits).length} )
              </p>
            )}
          </div>

          {splitTypeShow && (
            <div>
              <p className="text-lg font-semibold">Contributions</p>
              <div className="flex gap-3">
                {groupMembers.map((gm) => (
                  <div>
                    <p>{gm.name}</p>
                    <input
                      type="text"
                      name="exactAmount"
                      id=""
                      className="bg-gray-100 border border-gray-200"
                      onChange={(e) =>
                        handleSplitAmountChange(gm.id, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <button
              className={` ${isValid ? "text-green-800 bg-green-100 cursor-pointer" : "text-gray-500 bg-gray-100"} text-lg font-semibold px-3 py-1 rounded-lg`}
              onClick={handleExpenseSubmit}
              disabled={!isValid}
            >
              Save Expense
            </button>
          </div>
          {showMessage && (
            <p className="bg-green-100 text-green-800 font-semibold px-3 p-1 rounded-lg text-center  text-lg">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
