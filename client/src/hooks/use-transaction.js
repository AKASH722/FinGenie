import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/axios';

// Fetch all transactions for a user
export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await axios.get(`/api/transactions`);
      return response.data;
    },
  });
};

// Create a new transaction
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (transactionData) => {
      const response = await axios.post(`/api/transactions`, transactionData);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

// Update an existing transaction
export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, transactionData }) => {
      const response = await axios.put(`/api/transactions/${id}`, transactionData);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

// Delete a transaction
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/api/transactions/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

// Get income vs. expense summary
export const useTransactionSummary = () => {
  return useQuery({
    queryKey: ['transactions', 'summary'],
    queryFn: async () => {
      const response = await axios.get(`/api/transactions/summary`);
      return response.data;
    },
  });
};
