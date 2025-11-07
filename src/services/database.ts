import { supabase } from '@/integrations/supabase/client';
import type { 
  School, 
  EcoBoxDevice, 
  Achievement, 
  Challenge, 
  Statistics, 
  LeaderboardEntry, 
  EcoTip, 
  NotificationItem 
} from '@/types';

// Schools Service
export const getSchools = async (): Promise<School[]> => {
  const { data, error } = await supabase
    .from('schools')
    .select(`
      *,
      ecobox_devices(*),
      school_classes(*)
    `)
    .order('ranking', { ascending: true });

  if (error) throw error;

  return data.map(school => ({
    id: school.id,
    name: school.name,
    city: school.city,
    region: school.region,
    totalStudents: school.total_students,
    totalPapers: school.total_papers,
    totalClasses: school.total_classes,
    ranking: school.ranking,
    monthlyPapers: school.monthly_papers,
    savedTrees: school.saved_trees,
    carbonReduced: school.carbon_reduced,
    ecoBoxDevices: school.ecobox_devices.map((device: any) => ({
      id: device.id,
      schoolId: device.school_id,
      location: device.location,
      status: device.status,
      totalCapacity: device.total_capacity,
      currentCapacity: device.current_capacity,
      lastDataReceived: new Date(device.last_data_received),
      dailyCollections: device.daily_collections,
      coordinates: device.coordinates_lat && device.coordinates_lng ? {
        lat: device.coordinates_lat,
        lng: device.coordinates_lng
      } : undefined
    })),
    classes: school.school_classes.map((cls: any) => ({
      id: cls.id,
      schoolId: cls.school_id,
      name: cls.name,
      grade: cls.grade,
      studentCount: cls.student_count,
      totalPapers: cls.total_papers,
      teacherId: cls.teacher_id,
      teacherName: cls.teacher_name
    }))
  }));
};

// EcoBox Devices Service
export const getEcoBoxDevices = async (): Promise<EcoBoxDevice[]> => {
  const { data, error } = await supabase
    .from('ecobox_devices')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(device => ({
    id: device.id,
    schoolId: device.school_id,
    location: device.location,
    status: device.status,
    totalCapacity: device.total_capacity,
    currentCapacity: device.current_capacity,
    lastDataReceived: new Date(device.last_data_received),
    dailyCollections: device.daily_collections,
    coordinates: device.coordinates_lat && device.coordinates_lng ? {
      lat: device.coordinates_lat,
      lng: device.coordinates_lng
    } : undefined
  }));
};

// Achievements Service
export const getAchievements = async (): Promise<Achievement[]> => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('requirement', { ascending: true });

  if (error) throw error;

  return data.map(achievement => ({
    id: achievement.id,
    name: achievement.name,
    nameGeorgian: achievement.name_georgian,
    description: achievement.description,
    descriptionGeorgian: achievement.description_georgian,
    icon: achievement.icon,
    category: achievement.category,
    requirement: achievement.requirement,
    rarity: achievement.rarity
  }));
};

// User Achievements Service
export const getUserAchievements = async (userId: string): Promise<Achievement[]> => {
  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievements(*)
    `)
    .eq('user_id', userId);

  if (error) throw error;

  return data.map(userAchievement => ({
    id: userAchievement.achievements.id,
    name: userAchievement.achievements.name,
    nameGeorgian: userAchievement.achievements.name_georgian,
    description: userAchievement.achievements.description,
    descriptionGeorgian: userAchievement.achievements.description_georgian,
    icon: userAchievement.achievements.icon,
    category: userAchievement.achievements.category,
    requirement: userAchievement.achievements.requirement,
    rarity: userAchievement.achievements.rarity,
    earnedDate: new Date(userAchievement.earned_date),
    progress: userAchievement.progress
  }));
};

// Challenges Service
export const getChallenges = async (): Promise<Challenge[]> => {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .order('end_date', { ascending: true });

  if (error) throw error;

  return data.map(challenge => ({
    id: challenge.id,
    title: challenge.title,
    titleGeorgian: challenge.title_georgian,
    description: challenge.description,
    descriptionGeorgian: challenge.description_georgian,
    type: challenge.type,
    target: challenge.target,
    reward: challenge.reward,
    startDate: new Date(challenge.start_date),
    endDate: new Date(challenge.end_date),
    participants: challenge.participants,
    completed: false, // Will be set based on user's progress
    progress: 0 // Will be set based on user's progress
  }));
};

// User Challenges Service
export const getUserChallenges = async (userId: string): Promise<Challenge[]> => {
  const { data, error } = await supabase
    .from('user_challenges')
    .select(`
      *,
      challenges(*)
    `)
    .eq('user_id', userId);

  if (error) throw error;

  return data.map(userChallenge => ({
    id: userChallenge.challenges.id,
    title: userChallenge.challenges.title,
    titleGeorgian: userChallenge.challenges.title_georgian,
    description: userChallenge.challenges.description,
    descriptionGeorgian: userChallenge.challenges.description_georgian,
    type: userChallenge.challenges.type,
    target: userChallenge.challenges.target,
    reward: userChallenge.challenges.reward,
    startDate: new Date(userChallenge.challenges.start_date),
    endDate: new Date(userChallenge.challenges.end_date),
    participants: userChallenge.challenges.participants,
    completed: userChallenge.completed,
    progress: userChallenge.progress
  }));
};

// Statistics Service
export const getStatistics = async (): Promise<Statistics> => {
  // Get overall statistics by aggregating from various tables
  const [schoolsResult, usersResult, papersResult, ecoboxResult] = await Promise.all([
    supabase.from('schools').select('*'),
    supabase.from('profiles').select('*'),
    supabase.from('paper_submissions').select('papers_count'),
    supabase.from('ecobox_devices').select('*')
  ]);

  const totalSchools = schoolsResult.data?.length || 0;
  const totalStudents = usersResult.data?.filter(u => u.role === 'student').length || 0;
  const totalPapers = papersResult.data?.reduce((sum, submission) => sum + submission.papers_count, 0) || 0;
  const activeChallenges = await supabase
    .from('challenges')
    .select('*')
    .gte('end_date', new Date().toISOString());

  // Calculate environmental impact (rough estimates)
  const savedTrees = Math.floor(totalPapers * 0.01); // 100 papers = 1 tree
  const carbonReduced = totalPapers * 0.5; // 1 paper = 0.5kg CO2 saved

  return {
    totalPapers,
    totalStudents,
    totalSchools,
    savedTrees,
    carbonReduced,
    monthlyGrowth: 15, // Would calculate from historical data
    dailyAverage: Math.floor(totalPapers / 30), // Rough estimate
    topSchool: schoolsResult.data?.[0]?.name || 'N/A',
    activeChallenges: activeChallenges.data?.length || 0
  };
};

// Leaderboard Service
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      first_name,
      last_name,
      total_papers,
      schools:school_id(name)
    `)
    .order('total_papers', { ascending: false })
    .limit(20);

  if (error) throw error;

  return data.map((profile, index) => ({
    rank: index + 1,
    id: profile.id,
    name: `${profile.first_name} ${profile.last_name}`,
    type: 'student',
    school: profile.schools?.name || '',
    papers: profile.total_papers,
    change: 0, // Would calculate from historical data
    trend: 'same'
  }));
};

// Eco Tips Service
export const getEcoTips = async (): Promise<EcoTip[]> => {
  const { data, error } = await supabase
    .from('eco_tips')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(tip => ({
    id: tip.id,
    title: tip.title,
    titleGeorgian: tip.title_georgian,
    content: tip.content,
    contentGeorgian: tip.content_georgian,
    category: tip.category,
    difficulty: tip.difficulty,
    impact: tip.impact,
    icon: tip.icon
  }));
};

// Notifications Service
export const getUserNotifications = async (userId: string): Promise<NotificationItem[]> => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(notification => ({
    id: notification.id,
    type: notification.type,
    title: notification.title,
    titleGeorgian: notification.title_georgian,
    message: notification.message,
    messageGeorgian: notification.message_georgian,
    read: notification.read,
    createdAt: new Date(notification.created_at),
    actionUrl: notification.action_url,
    icon: notification.icon
  }));
};

// Paper Submission Service
export const submitPapers = async (userId: string, ecoboxId: string, papersCount: number) => {
  const { error } = await supabase
    .from('paper_submissions')
    .insert({
      user_id: userId,
      ecobox_id: ecoboxId,
      papers_count: papersCount
    });

  if (error) throw error;

  // First get current total papers
  const { data: currentProfile } = await supabase
    .from('profiles')
    .select('total_papers')
    .eq('id', userId)
    .single();

  if (!currentProfile) throw new Error('User not found');

  // Update user's total papers
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ 
      total_papers: currentProfile.total_papers + papersCount,
      last_active: new Date().toISOString()
    })
    .eq('id', userId);

  if (updateError) throw updateError;
};