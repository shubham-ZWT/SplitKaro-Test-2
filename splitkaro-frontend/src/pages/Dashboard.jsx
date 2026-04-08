import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <div>
          <h2>Grop Name:</h2>
          <p>Number of members: </p>
        </div>
        <div>
          <div>
            <h1>MemberName</h1>
            <p>Member Expense </p>
          </div>
        </div>

        <div className="flex justify-between">
          <p>Total Group Expense</p>
          <p>Total You Paid</p>
          <p>Net Balance</p>
        </div>

        <div>
          <h3>All Expenses</h3>
          <div className="flex flex-row-reverse ">
            <Link to="/add-expense" className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg self-end">
              Add Expense
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
