import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getSchools, 
  getEcoBoxDevices, 
  getAchievements, 
  getUserAchievements,
  getChallenges, 
  getUserChallenges,
  getStatistics, 
  getLeaderboard, 
  getEcoTips, 
  getUserNotifications,
  submitPapers 
} from '@/services/database';

// Schools
export const useSchools = () => {
  return useQuery({
    queryKey: ['schools'],
    queryFn: getSchools,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// EcoBox Devices
export const useEcoBoxDevices = () => {
  return useQuery({
    queryKey: ['ecobox-devices'],
    queryFn: getEcoBoxDevices,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Achievements
export const useAchievements = () => {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: getAchievements,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUserAchievements = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['user-achievements', user?.id],
    queryFn: () => getUserAchievements(user!.id),
    enabled: !!user,
  });
};

// Challenges
export const useChallenges = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: getChallenges,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUserChallenges = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['user-challenges', user?.id],
    queryFn: () => getUserChallenges(user!.id),
    enabled: !!user,
  });
};

// Statistics
export const useStatistics = () => {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: getStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Leaderboard
export const useLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Eco Tips
export const useEcoTips = () => {
  return useQuery({
    queryKey: ['eco-tips'],
    queryFn: getEcoTips,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Notifications
export const useUserNotifications = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['user-notifications', user?.id],
    queryFn: () => getUserNotifications(user!.id),
    enabled: !!user,
  });
};

// Paper submission mutation
export const useSubmitPapers = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ ecoboxId, papersCount }: { ecoboxId: string; papersCount: number }) =>
      submitPapers(user!.id, ecoboxId, papersCount),
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['user-achievements', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['user-challenges', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['ecobox-devices'] });
    },
  });
};