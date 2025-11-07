// Mock Data for EcoBox - Georgian Schools

import { School, User, Achievement, Challenge, Statistics, EcoBoxDevice, SchoolClass, EcoTip } from '../types';

// Georgian Schools Mock Data
// Mock Leaderboard Data
export const mockLeaderboard = {
  students: [
    { rank: 1, id: 's1', name: 'ანა თოვლიძე', type: 'student' as const, school: 'თბილისის #1 სკოლა', papers: 234, change: 2, trend: 'up' as const },
    { rank: 2, id: 's2', name: 'გიორგი ლორთქიფანიძე', type: 'student' as const, school: 'ბათუმის #12 სკოლა', papers: 198, change: -1, trend: 'down' as const },
    { rank: 3, id: 's3', name: 'ნინო კალანდაძე', type: 'student' as const, school: 'გორის #7 სკოლა', papers: 187, change: 1, trend: 'up' as const },
    { rank: 4, id: 's4', name: 'დავითი მელაძე', type: 'student' as const, school: 'ქუთაისის #5 სკოლა', papers: 156, change: 0, trend: 'same' as const },
    { rank: 5, id: 's5', name: 'მარიამი ღვინიაშვილი', type: 'student' as const, school: 'რუსთავის #9 სკოლა', papers: 145, change: 3, trend: 'up' as const },
  ],
  schools: [
    { rank: 1, id: '1', name: 'თბილისის #1 სკოლა', type: 'school' as const, papers: 2340, change: 1, trend: 'up' as const },
    { rank: 2, id: '2', name: 'ბათუმის #12 სკოლა', type: 'school' as const, papers: 1890, change: -1, trend: 'down' as const },
    { rank: 3, id: '3', name: 'გორის #7 სკოლა', type: 'school' as const, papers: 1567, change: 0, trend: 'same' as const },
    { rank: 4, id: '4', name: 'ქუთაისის #5 სკოლა', type: 'school' as const, papers: 1423, change: 2, trend: 'up' as const },
    { rank: 5, id: '5', name: 'რუსთავის #9 სკოლა', type: 'school' as const, papers: 1234, change: -2, trend: 'down' as const },
  ]
};

export const mockSchools: School[] = [
  {
    id: '1',
    name: 'თბილისის #1 საჯარო სკოლა',
    city: 'თბილისი',
    region: 'კახეთი',
    totalStudents: 450,
    totalPapers: 2340,
    totalClasses: 18,
    ranking: 1,
    monthlyPapers: 890,
    savedTrees: 23.4,
    carbonReduced: 468,
    ecoBoxDevices: [
      {
        id: 'eco1',
        schoolId: '1',
        location: 'მთავარი შენობა - 1 სართული',
        status: 'online',
        totalCapacity: 100,
        currentCapacity: 65,
        lastDataReceived: new Date(),
        dailyCollections: 45,
        coordinates: { lat: 41.7151, lng: 44.8271 }
      },
      {
        id: 'eco2',
        schoolId: '1',
        location: 'ბიბლიოთეკა',
        status: 'online',
        totalCapacity: 100,
        currentCapacity: 23,
        lastDataReceived: new Date(),
        dailyCollections: 32,
        coordinates: { lat: 41.7151, lng: 44.8271 }
      }
    ],
    classes: [
      { id: 'class1', schoolId: '1', name: '7ა', grade: 7, studentCount: 25, totalPapers: 340, teacherId: 't1', teacherName: 'ნინო გელაშვილი' },
      { id: 'class2', schoolId: '1', name: '8ბ', grade: 8, studentCount: 28, totalPapers: 420, teacherId: 't2', teacherName: 'გიორგი მახარაძე' }
    ]
  },
  {
    id: '2',
    name: 'ბათუმის #12 საჯარო სკოლა',
    city: 'ბათუმი',
    region: 'აჭარა',
    totalStudents: 320,
    totalPapers: 1890,
    totalClasses: 14,
    ranking: 2,
    monthlyPapers: 720,
    savedTrees: 18.9,
    carbonReduced: 378,
    ecoBoxDevices: [
      {
        id: 'eco3',
        schoolId: '2',
        location: 'ცენტრალური ჰოლი',
        status: 'online',
        totalCapacity: 100,
        currentCapacity: 78,
        lastDataReceived: new Date(),
        dailyCollections: 38,
        coordinates: { lat: 41.6168, lng: 41.6367 }
      }
    ],
    classes: [
      { id: 'class3', schoolId: '2', name: '9ა', grade: 9, studentCount: 22, totalPapers: 290, teacherId: 't3', teacherName: 'მარიამ ხუციშვილი' }
    ]
  },
  {
    id: '3',
    name: 'გორის #7 საჯარო სკოლა',
    city: 'გორი',
    region: 'შიდა ქართლი',
    totalStudents: 280,
    totalPapers: 1567,
    totalClasses: 12,
    ranking: 3,
    monthlyPapers: 620,
    savedTrees: 15.67,
    carbonReduced: 313,
    ecoBoxDevices: [
      {
        id: 'eco4',
        schoolId: '3',
        location: 'მეორე სართული',
        status: 'maintenance',
        totalCapacity: 100,
        currentCapacity: 45,
        lastDataReceived: new Date(Date.now() - 3600000),
        dailyCollections: 28,
        coordinates: { lat: 41.9838, lng: 44.1085 }
      }
    ],
    classes: []
  },
  {
    id: '4',
    name: 'ქუთაისის #5 საჯარო სკოლა',
    city: 'ქუთაისი',
    region: 'იმერეთი',
    totalStudents: 385,
    totalPapers: 1423,
    totalClasses: 16,
    ranking: 4,
    monthlyPapers: 580,
    savedTrees: 14.23,
    carbonReduced: 285,
    ecoBoxDevices: [
      {
        id: 'eco5',
        schoolId: '4',
        location: 'სპორტული დარბაზი',
        status: 'online',
        totalCapacity: 100,
        currentCapacity: 12,
        lastDataReceived: new Date(),
        dailyCollections: 35,
        coordinates: { lat: 42.2679, lng: 42.7010 }
      }
    ],
    classes: []
  },
  {
    id: '5',
    name: 'რუსთავის #9 საჯარო სკოლა',
    city: 'რუსთავი',
    region: 'ქვემო ქართლი',
    totalStudents: 290,
    totalPapers: 1234,
    totalClasses: 13,
    ranking: 5,
    monthlyPapers: 510,
    savedTrees: 12.34,
    carbonReduced: 247,
    ecoBoxDevices: [
      {
        id: 'eco6',
        schoolId: '5',
        location: 'კაფეტერია',
        status: 'full',
        totalCapacity: 100,
        currentCapacity: 98,
        lastDataReceived: new Date(),
        dailyCollections: 42,
        coordinates: { lat: 41.5495, lng: 44.9965 }
      }
    ],
    classes: []
  }
];

// Mock Achievements in Georgian
export const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    name: 'Eco Champion',
    nameGeorgian: 'ეკო-ჩემპიონი',
    description: 'Recycle 100 papers',
    descriptionGeorgian: '100 ფურცელი რეციკლირება',
    icon: '🏆',
    category: 'recycling',
    requirement: 100,
    rarity: 'rare'
  },
  {
    id: 'ach2',
    name: 'Green Friend',
    nameGeorgian: 'მწვანე მეგობარი',
    description: 'First recycling submission',
    descriptionGeorgian: 'პირველი რეციკლირების წარდგენა',
    icon: '🌱',
    category: 'recycling',
    requirement: 1,
    rarity: 'common'
  },
  {
    id: 'ach3',
    name: 'Recycling Star',
    nameGeorgian: 'რეციკლინგ ვარსკვლავი',
    description: 'Top 10 in school ranking',
    descriptionGeorgian: 'ტოპ 10 სკოლის რეიტინგში',
    icon: '⭐',
    category: 'competition',
    requirement: 10,
    rarity: 'epic'
  },
  {
    id: 'ach4',
    name: 'Environment Protector',
    nameGeorgian: 'გარემოს დამცველი',
    description: 'Complete 30-day streak',
    descriptionGeorgian: '30-დღიანი უწყვეტი მონაწილეობა',
    icon: '🛡️',
    category: 'streak',
    requirement: 30,
    rarity: 'legendary'
  },
  {
    id: 'ach5',
    name: 'Paper Warrior',
    nameGeorgian: 'ქაღალდის მეომარი',
    description: 'Recycle 500 papers',
    descriptionGeorgian: '500 ფურცელი რეციკლირება',
    icon: '⚔️',
    category: 'recycling',
    requirement: 500,
    rarity: 'epic'
  }
];

// Mock Statistics
export const mockStatistics: Statistics = {
  totalPapers: 8454,
  totalStudents: 1725,
  totalSchools: 5,
  savedTrees: 84.5, // ზუსტად 84.5 როგორც ფოტოზე
  carbonReduced: 1691,
  monthlyGrowth: 15.8,
  dailyAverage: 273,
  topSchool: 'თბილისის #1 საჯარო სკოლა',
  activeChallenges: 3
};

// Mock Challenges in Georgian
export const mockChallenges: Challenge[] = [
  {
    id: 'ch1',
    title: 'Weekly Paper Challenge',
    titleGeorgian: 'კვირეული ქაღალდის გამოწვევა',
    description: 'Collect 20 papers this week',
    descriptionGeorgian: 'შეაგროვე 20 ფურცელი ამ კვირაში',
    type: 'weekly',
    target: 20,
    reward: 50,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    participants: 342,
    completed: false,
    progress: 12
  },
  {
    id: 'ch2',
    title: 'Earth Day Special',
    titleGeorgian: 'დედამიწის დღის სპეციალური',
    description: 'School-wide recycling competition',
    descriptionGeorgian: 'სკოლის მასშტაბის რეციკლინგ კონკურსი',
    type: 'special',
    target: 1000,
    reward: 500,
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    participants: 1200,
    completed: false,
    progress: 340
  }
];

// Mock Eco Tips in Georgian
export const mockEcoTips: EcoTip[] = [
  {
    id: 'tip1',
    title: 'Paper Recycling',
    titleGeorgian: 'ქაღალდის რეციკლირება',
    content: 'Always separate clean paper from contaminated materials',
    contentGeorgian: 'ყოველთვის გამოყავი სუფთა ქაღალდი დაბინძურებული მასალებისგან',
    category: 'recycling',
    difficulty: 'easy',
    impact: 'high',
    icon: '📄'
  },
  {
    id: 'tip2',
    title: 'Energy Saving',
    titleGeorgian: 'ენერგიის დაზოგვა',
    content: 'Turn off lights when leaving the classroom',
    contentGeorgian: 'გამორთე შუქი კლასიდან გასვლისას',
    category: 'energy',
    difficulty: 'easy',
    impact: 'medium',
    icon: '💡'
  },
  {
    id: 'tip3',
    title: 'Water Conservation',
    titleGeorgian: 'წყლის დაზოგვა',
    content: 'Fix leaky faucets to save water',
    contentGeorgian: 'შეაკეთე მდინარე ონკანები წყლის დასაზოგად',
    category: 'water',
    difficulty: 'medium',
    impact: 'high',
    icon: '💧'
  }
];

// Mock Current User (Student)
export const mockCurrentUser: User = {
  id: 'user1',
  firstName: 'ნიკა',
  lastName: 'ქართველიშვილი',
  email: 'nika.kartvelishvili@student.edu.ge',
  role: 'student',
  school: 'თბილისის #1 საჯარო სკოლა',
  schoolId: '1',
  class: '8ბ',
  level: 7,
  totalPapers: 156,
  achievements: [
    { ...mockAchievements[0], earnedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), progress: 100 },
    { ...mockAchievements[1], earnedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), progress: 100 },
    { ...mockAchievements[2], progress: 80 }
  ],
  streak: 12,
  joinedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  lastActive: new Date()
};