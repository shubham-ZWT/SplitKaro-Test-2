import { Routes, Route } from "react-router-dom";
import AllExpenses from "../pages/AllExpenses";
import AddExpense from "../pages/AddExpense";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/expenses" element={<AllExpenses />} />
      <Route path="/add-expense" element={<AddExpense />} />
    </Routes>
  );
}
