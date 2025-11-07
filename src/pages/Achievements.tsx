import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Trophy, Star, Search, Filter } from 'lucide-react';
import { mockAchievements, mockCurrentUser } from '@/data/mockData';
import AchievementCard from '@/components/AchievementCard';

const Achievements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  // Get user's achievements
  const userAchievements = mockCurrentUser.achievements;
  const earnedIds = userAchievements.filter(a => a.earnedDate).map(a => a.id);
  const inProgressIds = userAchievements.filter(a => !a.earnedDate && a.progress && a.progress > 0).map(a => a.id);

  // Filter achievements
  const filteredAchievements = mockAchievements.filter(achievement => {
    const matchesSearch = achievement.nameGeorgian.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.descriptionGeorgian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
    const matchesRarity = selectedRarity === 'all' || achievement.rarity === selectedRarity;
    
    return matchesSearch && matchesCategory && matchesRarity;
  });

  const earnedAchievements = filteredAchievements.filter(a => earnedIds.includes(a.id))
    .map(a => ({ ...a, ...userAchievements.find(ua => ua.id === a.id) }));

  const inProgressAchievements = filteredAchievements.filter(a => inProgressIds.includes(a.id))
    .map(a => ({ ...a, ...userAchievements.find(ua => ua.id === a.id) }));

  const lockedAchievements = filteredAchievements.filter(a => 
    !earnedIds.includes(a.id) && !inProgressIds.includes(a.id)
  );

  const categories = [
    { value: 'all', label: 'ყველა' },
    { value: 'recycling', label: 'რეციკლირება' },
    { value: 'streak', label: 'სტრიკი' },
    { value: 'competition', label: 'კონკურსი' },
    { value: 'education', label: 'განათლება' },
    { value: 'special', label: 'სპეციალური' }
  ];

  const rarities = [
    { value: 'all', label: 'ყველა' },
    { value: 'common', label: 'ჩვეულებრივი' },
    { value: 'rare', label: 'იშვიათი' },
    { value: 'epic', label: 'ეპიკური' },
    { value: 'legendary', label: 'ლეგენდარული' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/5 to-accent-light/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-hero text-white px-6 py-2 rounded-full shadow-glow mb-4">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-medium">მიღწევების გალერეა</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            ეკო მიღწევები
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            შენი გზა ეკოლოგიური ჩემპიონობისკენ - მიღწევები, ვარსკვლავები და უნიკალური ნიშნები
          </p>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-eco text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{earnedAchievements.length}</div>
              <div className="text-white/80 text-sm">მიღებული</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-secondary text-white">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{inProgressAchievements.length}</div>
              <div className="text-white/80 text-sm">პროცესში</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-muted rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-muted-foreground">🔒</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{lockedAchievements.length}</div>
              <div className="text-muted-foreground text-sm">ჩაკეტილი</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-primary text-white">
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white">%</span>
              </div>
              <div className="text-2xl font-bold">
                {((earnedAchievements.length / mockAchievements.length) * 100).toFixed(0)}%
              </div>
              <div className="text-white/80 text-sm">დასრულება</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="მიღწევების ძიება..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>

              {/* Rarity Filter */}
              <div className="flex flex-wrap gap-2">
                {rarities.map((rarity) => (
                  <Button
                    key={rarity.value}
                    variant={selectedRarity === rarity.value ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRarity(rarity.value)}
                  >
                    {rarity.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Tabs */}
        <Tabs defaultValue="earned" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="earned">მიღებული ({earnedAchievements.length})</TabsTrigger>
            <TabsTrigger value="progress">პროცესში ({inProgressAchievements.length})</TabsTrigger>
            <TabsTrigger value="locked">ჩაკეტილი ({lockedAchievements.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="earned">
            {earnedAchievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {earnedAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} size="lg" />
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    მიღწევები არ მოიძებნა
                  </h3>
                  <p className="text-muted-foreground">
                    შეცვალე ფილტრები ან დაიწყე ქაღალდის რეციკლირება პირველი მიღწევის მისაღებად
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="progress">
            {inProgressAchievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {inProgressAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} size="lg" />
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    მიღწევები პროცესში არ არის
                  </h3>
                  <p className="text-muted-foreground">
                    დაიწყე ახალი აქტივობები მიღწევების განბლოკვისათვის
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="locked">
            {lockedAchievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {lockedAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} size="lg" />
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🔓</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    ყველა მიღწევა განბლოკილია!
                  </h3>
                  <p className="text-muted-foreground">
                    გილოცავ! შენ უკვე ყველა მიღწევა გაქვს ხელმისაწვდომი
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-eco rounded-2xl shadow-glow">
          <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            გახდი ეკო-ჩემპიონი!
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            ყოველი რეციკლირებული ფურცელი - ნაბიჯია მდგრადი მომავლისკენ. 
            განაგრძე მიღწევების შეგროვება და გახდი შენი სკოლის ეკოლოგიური ლიდერი.
          </p>
          <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
            დაიწყე რეციკლირება
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Achievements;