import apiClient from "./apiClient";

const groupExpenseService = {
  getGroupId: async () => {
    const groupIds = await apiClient.get("/groups");
    return groupIds;
  },

  getGroupDataById: async (id) => {
    const groupData = await apiClient.get(`/groups/${id}`);
    return groupData;
  },

  getAllExpenses: async (id) => {
    const groupExpenses = await apiClient.get(`/groups/${id}/expenses`);
    return groupExpenses;
  },

  getgroupBalance: async (id) => {
    const data = await apiClient.get(`/groups/${id}/balances`);
    return data;
  },

  deleteExpenseById: async (id) => {
    const deletedExpense = await apiClient.delete(`/expenses/${id}`);
    return deletedExpense;
  },

  addGroupExpense: async (id, data) => {
    const response = await apiClient.post(`/groups/${id}/expenses`, data);
    return response;
  },
};

export default groupExpenseService;
