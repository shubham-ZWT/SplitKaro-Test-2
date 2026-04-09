import apiClient from "./apiClient";

const groupSettlementService = {
  getPendingSettlement: async (id) => {
    const response = await apiClient.get(`/groups/${id}/settlements/suggest`);
    return response;
  },

  getSettlementHistory: async (id) => {
    const response = await apiClient.get(`/groups/${id}/settlements`);
    return response;
  },

  addSettlement: async (id, data) => {
    const response = await apiClient.post(`/groups/${id}/settlements`, data);
    return response;
  },
};

export default groupSettlementService;
