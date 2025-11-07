import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Target, Trophy, Users, Calendar, Search, Plus } from 'lucide-react';
import { mockChallenges, mockCurrentUser } from '@/data/mockData';
import ChallengeCard from '@/components/ChallengeCard';
import StatsCard from '@/components/StatsCard';

const Challenges = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Mock user participation data
  const userParticipatingChallenges = ['ch1']; // User is participating in first challenge
  const userCompletedChallenges = []; // No completed challenges yet

  // Filter challenges
  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesSearch = challenge.titleGeorgian.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.descriptionGeorgian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || challenge.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const activeChallenges = filteredChallenges.filter(c => !c.completed);
  const completedChallenges = filteredChallenges.filter(c => c.completed);
  const userActiveChallenges = activeChallenges.filter(c => userParticipatingChallenges.includes(c.id));

  const challengeTypes = [
    { value: 'all', label: 'ყველა' },
    { value: 'daily', label: 'ყოველდღიური' },
    { value: 'weekly', label: 'კვირეული' },
    { value: 'monthly', label: 'თვიური' },
    { value: 'special', label: 'სპეციალური' }
  ];

  const handleJoinChallenge = (challengeId: string) => {
    // Mock join functionality
    console.log(`Joining challenge: ${challengeId}`);
    // In real app, this would make API call to join challenge
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent-light/5 to-primary-light/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-secondary text-secondary-dark px-6 py-2 rounded-full shadow-glow mb-4">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">გამოწვევების ცენტრი</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            EcoBox გამოწვევები
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ყოველდღიური, კვირეული და სპეციალური გამოწვევები ეკოლოგიური განათლებისთვის
          </p>
        </div>

        {/* Challenge Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="აქტიური გამოწვევები"
            value={activeChallenges.length}
            icon={<Target className="w-6 h-6 text-primary" />}
            variant="gradient"
          />
          <StatsCard
            title="ჩემი გამოწვევები"
            value={userActiveChallenges.length}
            icon={<Users className="w-6 h-6 text-success" />}
            variant="success"
          />
          <StatsCard
            title="დასრულებული"
            value={userCompletedChallenges.length}
            icon={<Trophy className="w-6 h-6 text-accent" />}
            variant="accent"
          />
          <StatsCard
            title="სულ მონაწილე"
            value={mockChallenges.reduce((sum, c) => sum + c.participants, 0)}
            icon={<Users className="w-6 h-6 text-warning" />}
          />
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="გამოწვევების ძიება..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div className="flex flex-wrap gap-2">
                {challengeTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={selectedType === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type.value)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>

              {/* Create Challenge Button */}
              <Button className="bg-gradient-secondary hover:shadow-eco">
                <Plus className="w-4 h-4 mr-2" />
                ახალი გამოწვევა
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Challenge */}
        {activeChallenges.length > 0 && (
          <Card className="mb-8 bg-gradient-hero text-white shadow-glow">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  რეკომენდებული
                </Badge>
              </div>
              <CardTitle className="text-2xl">
                {activeChallenges[0].titleGeorgian}
              </CardTitle>
              <p className="text-white/90">
                {activeChallenges[0].descriptionGeorgian}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{activeChallenges[0].reward}</div>
                  <div className="text-white/80 text-sm">ქულა ჯილდო</div>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{activeChallenges[0].participants.toLocaleString('ka-GE')}</div>
                  <div className="text-white/80 text-sm">მონაწილე</div>
                </div>
                <div className="text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {Math.ceil((activeChallenges[0].endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className="text-white/80 text-sm">დღე დარჩა</div>
                </div>
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full mt-6 shadow-lg hover:shadow-xl"
                onClick={() => handleJoinChallenge(activeChallenges[0].id)}
              >
                {userParticipatingChallenges.includes(activeChallenges[0].id) ? 'გაგრძელება' : 'მონაწილეობა'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Challenges Tabs */}
        <Tabs defaultValue="active" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">აქტიური ({activeChallenges.length})</TabsTrigger>
            <TabsTrigger value="my">ჩემი ({userActiveChallenges.length})</TabsTrigger>
            <TabsTrigger value="completed">დასრულებული ({completedChallenges.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeChallenges.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onJoin={handleJoinChallenge}
                    userParticipating={userParticipatingChallenges.includes(challenge.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    აქტიური გამოწვევები არ მოიძებნა
                  </h3>
                  <p className="text-muted-foreground">
                    შეცვალე ძიების პარამეტრები ან დალოდე ახალ გამოწვევებს
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my">
            {userActiveChallenges.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {userActiveChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    userParticipating={true}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    შენ არ მონაწილეობ გამოწვევებში
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    მონაწილე აქტიურ გამოწვევებში და მოიგე ქულები და მიღწევები
                  </p>
                  <Button onClick={() => setSelectedType('all')}>
                    აქტიური გამოწვევების ნახვა
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedChallenges.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {completedChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    userParticipating={userCompletedChallenges.includes(challenge.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    დასრულებული გამოწვევები არ არის
                  </h3>
                  <p className="text-muted-foreground">
                    დასრულებული გამოწვევები გამოჩნდება აქ
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Challenge Creation CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-secondary rounded-2xl shadow-glow">
          <Target className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            შექმენი შენი გამოწვევა!
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            იყავი ლიდერი და შექმენი უნიკალური გამოწვევები შენი სკოლისა და კლასისთვის. 
            წაახალისე სხვები ეკოლოგიური აქტივობებში მონაწილეობის მისაღებად.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              გამოწვევის შექმნა
            </Button>
            <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
              რჩევები და წესები
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;