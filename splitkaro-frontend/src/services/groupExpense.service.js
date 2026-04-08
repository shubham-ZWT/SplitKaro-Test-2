import apiClient from "./apiClient";

const groupExpenseService = {
  getGroupId: async () => {
    const groupIds = await apiClient.get("/groups");
    return groupIds;
  },

  getAllExpenses: async (id) => {
    const groupExpenses = await apiClient.get(`/groups/${id}/expenses`);
    return groupExpenses;
  },

  deleteExpenseById: async (id) => {
    const deletedExpense = await apiClient.delete(`/expenses/${id}`);
    return deletedExpense;
  },
};

export default groupExpenseService;
