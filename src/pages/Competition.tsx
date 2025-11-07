import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Medal, Award, Users, TrendingUp, Calendar, Target } from 'lucide-react';
import { mockSchools, mockChallenges } from '@/data/mockData';
import StatsCard from '@/components/StatsCard';

const Competition = () => {
  // Create leaderboard data
  const leaderboard = mockSchools
    .sort((a, b) => b.totalPapers - a.totalPapers)
    .map((school, index) => ({
      ...school,
      rank: index + 1,
      change: Math.floor(Math.random() * 6) - 3, // Random change for demo
    }));

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-500" />;
      default:
        return <Award className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return "default";
      case 2:
      case 3:
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent-light/5 to-primary-light/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-eco text-white px-6 py-2 rounded-full shadow-glow mb-4">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-medium">ეროვნული შეჯიბრი</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            EcoBox ჩემპიონატი 2025
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ქართული სკოლების ეკოლოგიური განათლების ყველაზე დიდი შეჯიბრი
          </p>
        </div>

        {/* Competition Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="მონაწილე სკოლები"
            value={mockSchools.length}
            icon={<Users className="w-6 h-6 text-primary" />}
            variant="gradient"
          />
          <StatsCard
            title="აქტიური გამოწვევები"
            value={mockChallenges.length}
            icon={<Target className="w-6 h-6 text-accent" />}
            variant="accent"
          />
          <StatsCard
            title="ლიდერი სკოლა"
            value={leaderboard[0]?.totalPapers || 0}
            subtitle="ფურცელი"
            icon={<TrendingUp className="w-6 h-6 text-success" />}
            variant="success"
          />
          <StatsCard
            title="შეჯიბრი მთავრდება"
            value="25"
            subtitle="დღეში"
            icon={<Calendar className="w-6 h-6 text-warning" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  <span>სკოლების რეიტინგი</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {leaderboard.map((school) => (
                  <div
                    key={school.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                      school.rank <= 3 
                        ? 'bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10' 
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-primary">
                        {getRankIcon(school.rank)}
                      </div>
                      <Badge variant={getRankBadgeVariant(school.rank)} className="min-w-[40px] justify-center">
                        #{school.rank}
                      </Badge>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {school.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{school.city}</span>
                        <span>•</span>
                        <span>{school.totalStudents} მოსწავლე</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        {school.totalPapers.toLocaleString('ka-GE')}
                      </div>
                      <div className="text-xs text-muted-foreground">ფურცელი</div>
                      {school.change !== 0 && (
                        <div className={`text-xs font-medium ${
                          school.change > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {school.change > 0 ? '↗' : '↘'} {Math.abs(school.change)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Active Challenges */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-6 h-6 text-accent" />
                  <span>აქტიური გამოწვევები</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockChallenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-accent/10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">
                        {challenge.titleGeorgian}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {challenge.type === 'weekly' ? 'კვირეული' : 
                         challenge.type === 'monthly' ? 'თვიური' : 'სპეციალური'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.descriptionGeorgian}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">პროგრესი</span>
                        <span className="font-medium">
                          {challenge.progress} / {challenge.target}
                        </span>
                      </div>
                      <Progress 
                        value={(challenge.progress / challenge.target) * 100} 
                        className="h-2"
                      />
                    </div>

                    <div className="flex items-center justify-between mt-3 text-xs">
                      <span className="text-muted-foreground">
                        მონაწილეები: {challenge.participants.toLocaleString('ka-GE')}
                      </span>
                      <span className="font-medium text-accent">
                        ჯილდო: {challenge.reward} ქულა
                      </span>
                    </div>
                  </div>
                ))}

                <Button className="w-full bg-gradient-secondary hover:shadow-eco">
                  ყველა გამოწვევის ნახვა
                </Button>
              </CardContent>
            </Card>

            {/* Achievement Spotlight */}
            <Card className="bg-gradient-to-br from-success/10 to-accent/10 border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-success">
                  <Award className="w-6 h-6" />
                  <span>კვირის გმირი</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {leaderboard[0]?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    ამ კვირაში ყველაზე მეტი ქაღალდი მოაგროვეს
                  </p>
                  <div className="text-2xl font-bold text-primary mb-2">
                    +{Math.floor(Math.random() * 200) + 100} ფურცელი
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    ეკო-ჩემპიონი
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-hero rounded-2xl shadow-glow">
          <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            გახდი შემდეგი ჩემპიონი!
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            დაიწყე ქაღალდის რეციკლირება შენს სკოლაში და გახდი ეკოლოგიური განათლების ლიდერი.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
              რეგისტრაცია
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              წესები და დებულება
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Competition;