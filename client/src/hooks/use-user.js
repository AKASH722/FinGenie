import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/axios'
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/user`);
        return response.data;
      } catch (error) {
        if (error.response?.status === 404) {
          try {
            const session = await fetchAuthSession();
            const { idToken } = session.tokens ?? {};
            const user = await getCurrentUser();
            const createRes = await axios.post('/api/user', {
              cognitoUserId: user.userId,
              email: idToken?.payload?.email,
              username: user.username,
            });
            return createRes.data;
          } catch (authError) {
            console.error('Error creating user:', authError);
            throw new Error('Failed to create user');
          }
        } else {
          console.error('Error fetching user:', error);
          throw new Error('Failed to fetch user');
        }
      }
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userData }) => {
      const response = await axios.put(`/api/user`, userData);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["user"]});
    },
  });
};
