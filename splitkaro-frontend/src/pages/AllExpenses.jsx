import { useState } from "react";
import { useEffect } from "react";
import groupExpenseService from "../services/groupExpense.service";

export default function AllExpenses() {
  const [groupIds, setGroupIds] = useState([]);
  const [currentGroupId, setCurrentGroupId] = useState(1);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchAllgroupsIds = async () => {
      const AllgroupIds = await groupExpenseService.getGroupId();
      setGroupIds(AllgroupIds.groupIds);
      setCurrentGroupId(1);
    };
    fetchAllgroupsIds();
  }, []);

  useEffect(() => {
    const fetchGroupExpenses = async () => {
      const data = await groupExpenseService.getAllExpenses(currentGroupId);
      setExpenses(data.groupExpenses);
    };
    fetchGroupExpenses();
  }, [currentGroupId]);

  const handleDeleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this Expense?")) {
      const deleteExpense = await groupExpenseService.deleteExpenseById(id);
      console.log(deleteExpense);
      setExpenses(expenses.filter((e) => e.id !== id));
    } else {
      console.log("not deleted");
    }
  };

  // const handlegroupIdChange = (event) => {
  //   console.log(event.target.value);
  //   setCurrentGroupId(event.target.value);
  // };

  console.log(groupIds);

  console.log(expenses);
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <div className="bg-amber-100 w-fit p-2 rounded-lg flex gap-2 items-center font-semibold mt-4 mb-4 text-lg text-amber-800">
          <label htmlFor="groupId">Change Group Id : </label>
          <select
            className=" border border-amber-700 px-2 rounded-lg"
            name=""
            id="groupId"
            value={currentGroupId}
            onChange={(e) => {
              setCurrentGroupId(e.target.value);
            }}
          >
            <option value="">Group Id</option>
            {groupIds.map((id) => (
              <option value={id.id}>{id.name}</option>
            ))}
          </select>
        </div>

        <table className="table-auto w-full mt-5">
          <thead className="bg-base-200 text-left text-gray-700  tracking-wider">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Paid By</th>
              <th>Amount</th>
              <th>Split Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {expenses.map((expense) => (
              <tr key={expense.id} className="bg-card mt-6 ">
                <td>{expense.date.slice(0, 10)}</td>
                <td>{expense.description}</td>
                <td>{expense.Member?.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.split_type}</td>
                <td>
                  <button
                    className="bg-red-50 text-red-800 px-3 py-1 rounded-lg mt-4"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Delete Expense
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
