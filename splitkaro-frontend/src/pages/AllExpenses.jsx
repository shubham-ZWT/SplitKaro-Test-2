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

  const handlegroupIdChange = (event) => {
    console.log(event.target.value);
    setCurrentGroupId(event.target.value);
  };

  console.log(groupIds);

  console.log(expenses);
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <label htmlFor="groupIds">Select group id to see the Expenses</label>
        <select
          name="groupIds"
          id="groupIds"
          onChange={(e) => handlegroupIdChange(e)}
        >
          <option value="">Select Group Id</option>
          {groupIds.map((grp) => (
            <option key={grp.id} value={grp.id}>
              {grp.id}
            </option>
          ))}
        </select>

        <table>
          <thead className="">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Paid By</th>
              <th>Amount</th>
              <th>Split Type</th>
            </tr>
          </thead>
          <tbody className="">
            {expenses.map((expense) => (
              <tr key={expense.id} className="">
                <td>{expense.date.slice(0, 10)}</td>
                <td>{expense.description}</td>
                <td>{expense.paid_by}</td>
                <td>{expense.amount}</td>
                <td>{expense.split_type}</td>
                <td>
                  <button
                    className="bg-red-50 text-red-800 px-3 py-1 rounded-lg"
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
