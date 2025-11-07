import React from 'react';
import StatsCard from '@/components/StatsCard';
import ChallengeCard from '@/components/ChallengeCard';
import AchievementCard from '@/components/AchievementCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Clock, Target, Trophy, Leaf, Users, Zap, Calendar, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserChallenges, useUserAchievements } from '@/hooks/useDatabase';

const StudentDashboard = () => {
  const { user, loading } = useAuth();
  const { data: challenges = [], isLoading: challengesLoading } = useUserChallenges();
  const { data: achievements = [], isLoading: achievementsLoading } = useUserAchievements();

  if (loading || challengesLoading || achievementsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-eco-light via-background to-eco-light/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-eco-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">იტვირთება...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-eco-light via-background to-eco-light/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-eco-dark mb-4">მომხმარებელი ვერ მოიძებნა</h1>
          <p className="text-muted-foreground">გთხოვთ, შეხვიდეთ სისტემაში</p>
        </div>
      </div>
    );
  }

  // Calculate user's level progress (assuming 100 papers per level)
  const papersPerLevel = 100;
  const currentLevelPapers = user.totalPapers % papersPerLevel;
  const levelProgress = (currentLevelPapers / papersPerLevel) * 100;

  // Get current time for greeting
  const currentHour = new Date().getHours();
  let greeting = 'გამარჯობა';
  if (currentHour < 12) greeting = 'დილა მშვიდობისა';
  else if (currentHour < 18) greeting = 'დღე მშვიდობისა';
  else greeting = 'საღამო მშვიდობისა';

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light via-background to-eco-light/20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* User Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-eco-dark mb-2">
                {greeting}, {user.firstName}! 👋
              </h1>
              <p className="text-muted-foreground">
                კეთილი იყოს თქვენი მობრუნება EcoBox-ში
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              დონე {user.level}
            </Badge>
          </div>
          
          {/* Level Progress */}
          <Card className="border-eco-primary/20 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-eco-dark">დონე {user.level}</span>
                <span className="text-sm text-muted-foreground">
                  {currentLevelPapers}/{papersPerLevel} ქაღალდი
                </span>
              </div>
              <Progress value={levelProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                შემდეგ დონემდე: {papersPerLevel - currentLevelPapers} ქაღალდი
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="ჩაბარებული ქაღალდები"
            value={user.totalPapers.toString()}
            icon={<Leaf className="h-6 w-6" />}
            subtitle="+12 ბოლო კვირაში"
          />
          <StatsCard
            title="მიმდინარე სერია"
            value={`${user.streak} დღე`}
            icon={<Zap className="h-6 w-6" />}
            subtitle="მიმდინარე"
          />
          <StatsCard
            title="მიღწევები"
            value={achievements.length.toString()}
            icon={<Trophy className="h-6 w-6" />}
            subtitle={`${achievements.filter(a => a.earnedDate && new Date(a.earnedDate).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000).length} ახალი`}
          />
          <StatsCard
            title="კლასში ადგილი"
            value="3-ე"
            icon={<Users className="h-6 w-6" />}
            subtitle="↑1 ადგილი"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content Area - Left Column (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Active Challenges */}
              <Card className="border-eco-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-eco-dark">
                    <Target className="h-5 w-5" />
                    აქტიური გამოწვევები
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {challenges.filter(c => !c.completed).slice(0, 3).map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                  {challenges.filter(c => !c.completed).length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      ყველა გამოწვევა დასრულებულია! 🎉
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-eco-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-eco-dark">
                    <Clock className="h-5 w-5" />
                    ბოლო აქტივობა
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-eco-light/10">
                      <div className="w-2 h-2 bg-eco-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">ქაღალდების ჩაბარება</p>
                        <p className="text-xs text-muted-foreground">15 ქაღალდი ჩაბარდა</p>
                      </div>
                      <Badge variant="outline" className="text-xs">დღეს</Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-eco-light/10">
                      <div className="w-2 h-2 bg-eco-secondary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">ახალი მიღწევა</p>
                        <p className="text-xs text-muted-foreground">ეკო მეომარი მიღწევა მოპოვებულია</p>
                      </div>
                      <Badge variant="outline" className="text-xs">გუშინ</Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-eco-light/10">
                      <div className="w-2 h-2 bg-eco-accent rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">ვიქტორინის დასრულება</p>
                        <p className="text-xs text-muted-foreground">გარემოს დაცვის ვიქტორინა - 90%</p>
                      </div>
                      <Badge variant="outline" className="text-xs">2 დღის წინ</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Right Column (1/3 width) */}
          <div className="space-y-6">
            {/* Next Achievement */}
            <Card className="border-eco-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-eco-dark">
                  <Award className="h-5 w-5" />
                  შემდეგი მიღწევა
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <h3 className="font-semibold text-eco-dark mb-1">მწვანე ჩემპიონი</h3>
                  <p className="text-xs text-muted-foreground mb-3">500 ქაღალდის შეგროვება</p>
                  <Progress value={(user.totalPapers / 500) * 100} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {500 - user.totalPapers} ქაღალდი დარჩენილია
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Gallery */}
            <Card className="border-eco-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-eco-dark">
                  <Trophy className="h-5 w-5" />
                  მიღწევები
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.slice(0, 4).map((achievement) => (
                    <div key={achievement.id} className="text-center p-3 rounded-lg bg-eco-light/20">
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <div className="text-xs font-medium text-eco-dark">{achievement.nameGeorgian}</div>
                    </div>
                  ))}
                  {achievements.length === 0 && (
                    <div className="col-span-2 text-center py-4 text-muted-foreground">
                      პირველი მიღწევის მისაღებად დაიწყეთ ქაღალდების შეგროვება!
                    </div>
                  )}
                </div>
                {achievements.length > 4 && (
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    ყველა მიღწევის ნახვა
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card className="border-eco-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-eco-dark">
                  <Leaf className="h-5 w-5" />
                  გარემოზე ზემოქმედება
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-eco-primary">
                      {Math.floor(user.totalPapers * 0.01)}
                    </div>
                    <div className="text-xs text-muted-foreground">ხე გადარჩენილი</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-eco-secondary">
                      {Math.floor(user.totalPapers * 0.5)}კგ
                    </div>
                    <div className="text-xs text-muted-foreground">CO₂ შემცირება</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;