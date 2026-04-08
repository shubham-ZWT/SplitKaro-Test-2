import { useEffect } from "react";
import { useState } from "react";
import groupExpenseService from "../services/groupExpense.service";

export default function useExpense({ id }) {
  const [expenses, setAllExpenses] = useState([]);

  const fetchExpense = async (id) => {
    const data = await groupExpenseService.getAllExpenses(id);
    setAllExpenses(data?.groupExpenses);
  };

  useEffect(() => {
    fetchExpense(id);
  }, [id]);

  return { expenses };
}
