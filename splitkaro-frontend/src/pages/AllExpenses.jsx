import { useState } from "react";
import { useEffect } from "react";
import groupExpenseService from "../services/groupExpense.service";
import { formatCurrency, formatDate } from "../utils/formatter";
import { useNavigate } from "react-router-dom";

export default function AllExpenses({ selectedId }) {
  // const [groupIds, setGroupIds] = useState([]);
  // const [currentGroupId, setCurrentGroupId] = useState(1);
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchAllgroupsIds = async () => {
  //     const AllgroupIds = await groupExpenseService.getGroupId();
  //     setGroupIds(AllgroupIds.groupIds);
  //     setCurrentGroupId(1);
  //   };
  //   fetchAllgroupsIds();
  // }, []);

  useEffect(() => {
    const fetchGroupExpenses = async () => {
      const data = await groupExpenseService.getAllExpenses(selectedId);
      setExpenses(data.groupExpenses);
    };
    fetchGroupExpenses();
  }, [selectedId]);

  const handleDeleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this Expense?")) {
       await groupExpenseService.deleteExpenseById(id);
      // console.log(deleteExpense);
      navigate("/");
      setExpenses(expenses.filter((e) => e.id !== id));
    } else {
      // console.log("not deleted");
    }
  };

  // const handlegroupIdChange = (event) => {
  //   console.log(event.target.value);
  //   setCurrentGroupId(event.target.value);
  // };

  // console.log(groupIds);

  // console.log(expenses);
  return (
    <div className="max-w-7xl mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">All Expenses</h1>
      <div>
        {/* <div className="bg-amber-100 w-fit p-2 rounded-lg flex gap-2 items-center font-semibold mt-4 mb-4 text-lg text-amber-800">
          <label htmlFor="groupId">Change Group : </label>
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
              <option key={id.id} value={id.id}>
                {id.name}
              </option>
            ))}
          </select>
        </div> */}

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
              <tr key={expense.id} className="">
                <td>
                  <p className="mt-6">{formatDate(expense.date)}</p>
                </td>
                <td>
                  <p className="mt-6">{expense.description}</p>
                </td>
                <td>
                  <p className="mt-6">{expense.Member?.name} </p>
                </td>
                <td className="font-semibold">
                  <p className="mt-6">{formatCurrency(expense.amount)}</p>
                </td>
                <td>
                  <p className="mt-6 bg-amber-50 text-amber-800 px-3 py-1 rounded-lg  font-semibold  w-fit text">
                    {expense.split_type}
                  </p>
                </td>
                <td>
                  <button
                    className="bg-red-50 text-red-800 px-3 py-1 rounded-lg mt-4 font-semibold cursor-pointer"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Delete Expense
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {expenses.length == 0 && (
          <p className="text-center w-full mt-5 text-gray-500">
            See All Your Expenses here{" "}
          </p>
        )}
      </div>
    </div>
  );
}
