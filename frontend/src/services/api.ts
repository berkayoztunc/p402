import axios from 'axios';
import type { Api, ApiFormData, PaymentHistory, PaymentAnalytics, PaymentStats, PaymentHistoryFilters } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Get all active APIs
  async getAllApis(): Promise<Api[]> {
    const response = await apiClient.get('/manage/apis');
    return response.data.apis.map(parseApiHeaders);
  },

  // Get user's APIs
  async getUserApis(address: string): Promise<Api[]> {
    const response = await apiClient.get(`/manage/my-apis/${address}`);
    return response.data.apis.map(parseApiHeaders);
  },

  // Register new API
  async registerApi(data: ApiFormData & { owner_address: string }): Promise<Api> {
    const response = await apiClient.post('/manage/register', data);
    return parseApiHeaders(response.data.api);
  },

  // Update API
  async updateApi(id: string, data: Partial<ApiFormData>): Promise<void> {
    await apiClient.put(`/manage/apis/${id}`, data);
  },

  // Delete API
  async deleteApi(id: string): Promise<void> {
    await apiClient.delete(`/manage/apis/${id}`);
  },

  // Toggle API active status
  async toggleApiStatus(id: string, isActive: boolean): Promise<void> {
    await apiClient.put(`/manage/apis/${id}`, { is_active: isActive ? 1 : 0 });
  },

  // Get payment history with filters
  async getPaymentHistory(filters?: PaymentHistoryFilters): Promise<{
    data: PaymentHistory[];
    pagination: { total: number; limit: number; offset: number };
  }> {
    const params = new URLSearchParams();
    
    if (filters?.endpoint) params.append('endpoint', filters.endpoint);
    if (filters?.network) params.append('network', filters.network);
    if (filters?.success !== undefined) params.append('success', String(filters.success));
    if (filters?.payer) params.append('payer', filters.payer);
    if (filters?.limit) params.append('limit', String(filters.limit));
    if (filters?.offset) params.append('offset', String(filters.offset));
    
    const response = await apiClient.get(`/manage/payment-history?${params.toString()}`);
    return {
      data: response.data.data,
      pagination: response.data.pagination
    };
  },

  // Get payment analytics
  async getPaymentAnalytics(days: number = 30): Promise<PaymentAnalytics[]> {
    const response = await apiClient.get(`/manage/payment-analytics?days=${days}`);
    return response.data.data;
  },

  // Get payment statistics summary
  async getPaymentStats(): Promise<PaymentStats> {
    const response = await apiClient.get('/manage/payment-stats');
    return response.data.stats;
  },
};

// Helper function to parse headers string to object
function parseApiHeaders(api: any): Api {
  if (api.headers && typeof api.headers === 'string') {
    try {
      api.headers = JSON.parse(api.headers);
    } catch {
      api.headers = {};
    }
  }
  return api;
}
