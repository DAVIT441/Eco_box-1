// EcoBox Types - Georgian Ecological Education Platform

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  school: string;
  schoolId: string;
  class?: string;
  level: number;
  totalPapers: number;
  achievements: Achievement[];
  streak: number;
  joinedDate: Date;
  lastActive: Date;
}

export interface School {
  id: string;
  name: string;
  city: string;
  region: string;
  totalStudents: number;
  totalPapers: number;
  totalClasses: number;
  ecoBoxDevices: EcoBoxDevice[];
  classes: SchoolClass[];
  ranking: number;
  monthlyPapers: number;
  savedTrees: number;
  carbonReduced: number; // in kg
}

export interface SchoolClass {
  id: string;
  schoolId: string;
  name: string;
  grade: number;
  studentCount: number;
  totalPapers: number;
  teacherId: string;
  teacherName: string;
}

export interface EcoBoxDevice {
  id: string;
  schoolId: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance' | 'full';
  totalCapacity: number;
  currentCapacity: number;
  lastDataReceived: Date;
  dailyCollections: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Achievement {
  id: string;
  name: string;
  nameGeorgian: string;
  description: string;
  descriptionGeorgian: string;
  icon: string;
  category: 'recycling' | 'streak' | 'competition' | 'education' | 'special';
  requirement: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedDate?: Date;
  progress?: number;
}

export interface Challenge {
  id: string;
  title: string;
  titleGeorgian: string;
  description: string;
  descriptionGeorgian: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  target: number;
  reward: number;
  startDate: Date;
  endDate: Date;
  participants: number;
  completed: boolean;
  progress: number;
}

export interface Statistics {
  totalPapers: number;
  totalStudents: number;
  totalSchools: number;
  savedTrees: number;
  carbonReduced: number;
  monthlyGrowth: number;
  dailyAverage: number;
  topSchool: string;
  activeChallenges: number;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  type: 'student' | 'class' | 'school';
  school?: string;
  papers: number;
  change: number; // position change from last period
  trend: 'up' | 'down' | 'same';
  avatar?: string;
}

export interface EcoTip {
  id: string;
  title: string;
  titleGeorgian: string;
  content: string;
  contentGeorgian: string;
  category: 'recycling' | 'energy' | 'water' | 'transportation' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  impact: 'low' | 'medium' | 'high';
  icon: string;
}

export interface NotificationItem {
  id: string;
  type: 'achievement' | 'challenge' | 'ranking' | 'system' | 'educational';
  title: string;
  titleGeorgian: string;
  message: string;
  messageGeorgian: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  icon?: string;
}