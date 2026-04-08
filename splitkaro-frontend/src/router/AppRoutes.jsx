import { Routes, Route } from "react-router-dom";
import AllExpenses from "../pages/AllExpenses";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/expenses" element={<AllExpenses />} />
    </Routes>
  );
}
