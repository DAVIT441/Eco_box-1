import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Trophy, 
  Users, 
  FileText, 
  TreePine, 
  Zap, 
  Award,
  BarChart3,
  ArrowRight,
  Play,
  CheckCircle,
  Globe,
  Smartphone,
  BookOpen
} from 'lucide-react';
import { mockStatistics, mockSchools } from '@/data/mockData';
import StatsCard from '@/components/StatsCard';
import { useStatistics, useSchools, useEcoBoxDevices } from '@/hooks/useDatabase';

const Index = () => {
  const { data: stats, isLoading: statsLoading, isError: statsError } = useStatistics();
  const { data: schools = [], isLoading: schoolsLoading, isError: schoolsError } = useSchools();
  const { data: devices = [], isLoading: devicesLoading, isError: devicesError } = useEcoBoxDevices();

  // Use mock data for now to match the design exactly
  // If you want to use real data later, uncomment the lines below
  // const finalStats = (!statsError && stats) ? stats : mockStatistics;
  // const finalSchools = (!schoolsError && schools && schools.length > 0) ? schools : mockSchools;
  const finalStats = mockStatistics;
  const finalSchools = mockSchools;
  
  // For devices, prioritize real data, otherwise extract from schools
  let finalDevices = devices && devices.length > 0 ? devices : [];
  if ((devicesError || !devices || devices.length === 0) && finalSchools.length > 0) {
    // Extract devices from schools (either real or mock) if devices failed
    finalDevices = finalSchools.flatMap(school => school.ecoBoxDevices || []);
  }

  // Show loading spinner only if we're actively loading and don't have any data yet
  // Once we have data (real or mock), show the page
  const hasAnyData = (stats && !statsError) || (schools && schools.length > 0 && !schoolsError) || (devices && devices.length > 0 && !devicesError);
  const isLoading = !hasAnyData && (statsLoading || schoolsLoading || devicesLoading);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const topSchools = finalSchools.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full shadow-glow mb-8">
              <Leaf className="w-5 h-5" />
              <span className="text-sm font-medium">Climate Hackathon 2025 - Winner Project</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              EcoBox
              <br />
              <span className="text-accent">ეკო განათლება</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              ეკოლოგიური განათლების ინოვაციური პლატფორმა ქართული სკოლებისთვის. 
              ქაღალდის რეციკლირება, გამიფიკაცია და მომავლის თაობების განათლება.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                დემო ნახვა
              </Button>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                  სტუდენტის ანგარიში
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{finalStats.totalSchools}</div>
                <div className="text-white/80 text-sm">სკოლა</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{finalStats.totalStudents.toLocaleString('ka-GE')}</div>
                <div className="text-white/80 text-sm">მოსწავლე</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{finalStats.totalPapers.toLocaleString('ka-GE')}</div>
                <div className="text-white/80 text-sm">ფურცელი</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{finalStats.savedTrees.toFixed(0)}</div>
                <div className="text-white/80 text-sm">ხე</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Statistics */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              რეალურ დროში
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              EcoBox სტატისტიკა
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ყველა მონაწილე სკოლის რეალურ დროში განახლებული მონაცემები
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard
              title="გადამუშავებული ქაღალდი"
              value={finalStats.totalPapers}
              subtitle="ფურცელი"
              icon={<FileText className="w-6 h-6 text-primary" />}
              trend={{ value: finalStats.monthlyGrowth || 0, isPositive: true }}
              variant="gradient"
            />
            <StatsCard
              title="მონაწილე მოსწავლეები"
              value={finalStats.totalStudents}
              icon={<Users className="w-6 h-6 text-success" />}
              variant="success"
            />
            <StatsCard
              title="დაზოგილი ხეები"
              value={finalStats.savedTrees.toFixed(1)}
              icon={<TreePine className="w-6 h-6 text-accent" />}
              variant="accent"
            />
            <StatsCard
              title="შემცირებული CO₂"
              value={`${finalStats.carbonReduced.toFixed(0)} კგ`}
              icon={<Zap className="w-6 h-6 text-warning" />}
            />
          </div>

          {/* Top Schools */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topSchools.map((school, index) => (
              <Card key={school.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
                      #{school.ranking} ადგილი
                    </Badge>
                    {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {school.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{school.city}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{school.totalPapers.toLocaleString('ka-GE')}</div>
                      <div className="text-xs text-muted-foreground">ფურცელი</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">{school.totalStudents}</div>
                      <div className="text-xs text-muted-foreground">მოსწავლე</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              რატომ EcoBox?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              სრული ეკოსისტემა ეკოლოგიური განათლებისთვის - ჰარდვერიდან სოფტვერამდე
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="w-8 h-8 text-primary" />,
                title: 'IoT ინტეგრაცია',
                description: 'EcoBox მოწყობილობები ავტომატურ რეჟიმში აგროვებს და ამუშავებს მონაცემებს'
              },
              {
                icon: <Trophy className="w-8 h-8 text-success" />,
                title: 'გამიფიკაცია',
                description: 'ლეველები, მიღწევები, შეჯიბრები და ჯილდოები მოტივაციის გასაზრდელად'
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-accent" />,
                title: 'რეალურ დროში ანალიტიკა',
                description: 'დეტალური სტატისტიკა და პროგრესის თვალყურის დევნება'
              },
              {
                icon: <BookOpen className="w-8 h-8 text-warning" />,
                title: 'განათლების კონტენტი',
                description: 'ეკოლოგიური განათლების მასალები და ინტერაქტიული ტესტები'
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: 'სკოლების შედარება',
                description: 'ერთიანი რეიტინგი და შეჯიბრები ქართული სკოლების შორის'
              },
              {
                icon: <Globe className="w-8 h-8 text-success" />,
                title: 'გარემოზე ზემოქმედება',
                description: 'რეალური გავლენის ვიზუალიზაცია - დაზოგილი ხეები და CO₂ შემცირება'
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit mx-auto group-hover:shadow-md transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              როგორ მუშაობს?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              სამი მარტივი ნაბიჯი ეკოლოგიური განათლების დასაწყებად
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'ქაღალდის შეგროვება',
                description: 'მოსწავლეები აგროვებენ და ახარისხებენ ქაღალდს კლასში',
                icon: <FileText className="w-6 h-6" />
              },
              {
                step: '02',
                title: 'EcoBox-ში ჩაბარება',
                description: 'ქაღალდი ჩაიბარება EcoBox მოწყობილობაში რომელიც ავტომატურად ითვლის',
                icon: <Zap className="w-6 h-6" />
              },
              {
                step: '03',
                title: 'ქულების მიღება',
                description: 'ავტომატურად ემატება ქულები, მიღწევები და შეიძლება კონკურსში მონაწილეობა',
                icon: <Award className="w-6 h-6" />
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto shadow-md mb-4">
                        {step.icon}
                      </div>
                      <div className="text-6xl font-bold text-primary/20 mb-2">{step.step}</div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-eco">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Leaf className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              მომავლის თაობისთვის
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              შემოუერთდი ეკოლოგიური განათლების რევოლუციას. EcoBox - სადაც გაუნათლება და 
              გარემოს დაცვა ერთად მოქმედებს მდგრადი მომავლისთვის.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  დაიწყე დღესვე
                </Button>
              </Link>
              <Link to="/schools">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                  მონაწილე სკოლები
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>უფასო პლატფორმა</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>24/7 მხარდაჭერა</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>ქართული ინტერფეისი</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
