import { Routes, Route } from "react-router-dom";
import AllExpenses from "../pages/AllExpenses";
import AddExpense from "../pages/AddExpense";
import Dashboard from "../pages/Dashboard";
import SettlementPage from "../pages/SettlementPage";
import ErrorPage from "../pages/Error";
import { useState } from "react";
import ChangeGroup from "../components/ChangeGroup";

export default function AppRoutes() {
  const [groupIds, setGroupIds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <ChangeGroup
          selectedId={selectedId}
          setGroupIds={setGroupIds}
          groupIds={groupIds}
          setSelectedId={setSelectedId}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={<Dashboard selectedId={selectedId} groupIds={groupIds} />}
        />
        <Route
          path="/expenses"
          element={<AllExpenses selectedId={selectedId} groupIds={groupIds} />}
        />
        <Route
          path="/add-expense"
          element={<AddExpense selectedId={selectedId} />}
        />
        <Route
          path="/settle"
          element={<SettlementPage selectedId={selectedId} />}
        />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
