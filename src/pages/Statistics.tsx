import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  TreePine, 
  Users, 
  Zap,
  Calendar,
  Download,
  MapPin,
  Target
} from 'lucide-react';
import { mockStatistics, mockSchools } from '@/data/mockData';
import StatsCard from '@/components/StatsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Statistics = () => {
  // Sample data for charts
  const monthlyData = [
    { month: 'იან', papers: 1200, schools: 3 },
    { month: 'თებ', papers: 1800, schools: 4 },
    { month: 'მარ', papers: 2400, schools: 4 },
    { month: 'აპრ', papers: 3100, schools: 5 },
    { month: 'მაი', papers: 4200, schools: 5 },
    { month: 'ივნ', papers: 5800, schools: 5 },
    { month: 'ივლ', papers: 7200, schools: 5 },
    { month: 'აგვ', papers: 8454, schools: 5 },
  ];

  const schoolData = mockSchools.map(school => ({
    name: school.city,
    papers: school.totalPapers,
    students: school.totalStudents,
  }));

  const impactData = [
    { name: 'დაზოგილი ხეები', value: mockStatistics.savedTrees, color: '#22c55e' },
    { name: 'შემცირებული CO₂ (კგ)', value: mockStatistics.carbonReduced, color: '#3b82f6' },
    { name: 'მონაწილე სკოლები', value: mockStatistics.totalSchools, color: '#f59e0b' },
  ];

  const deviceStatusData = [
    { name: 'აქტიური', value: 4, color: '#22c55e' },
    { name: 'სერვისი', value: 1, color: '#f59e0b' },
    { name: 'სავსე', value: 1, color: '#ef4444' },
  ];

  const COLORS = ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-secondary text-secondary-dark px-6 py-2 rounded-full shadow-glow mb-4">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm font-medium">რეალურ დროში</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            EcoBox სტატისტიკა
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ეკოლოგიური განათლების პლატფორმის სრული ანალიტიკა და ზემოქმედების შეფასება
          </p>
        </div>

        {/* Main Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="სულ ქაღალდი"
            value={mockStatistics.totalPapers}
            subtitle="ფურცელი"
            icon={<FileText className="w-6 h-6 text-primary" />}
            trend={{ value: mockStatistics.monthlyGrowth, isPositive: true }}
            variant="gradient"
          />
          <StatsCard
            title="მონაწილე მოსწავლეები"
            value={mockStatistics.totalStudents}
            icon={<Users className="w-6 h-6 text-success" />}
            variant="success"
          />
          <StatsCard
            title="დაზოგილი ხეები"
            value={mockStatistics.savedTrees.toFixed(1)}
            icon={<TreePine className="w-6 h-6 text-accent" />}
            variant="accent"
          />
          <StatsCard
            title="ყოველდღიური საშუალო"
            value={mockStatistics.dailyAverage}
            subtitle="ფურცელი/დღე"
            icon={<TrendingUp className="w-6 h-6 text-warning" />}
          />
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="overview">მიმოხილვა</TabsTrigger>
              <TabsTrigger value="schools">სკოლები</TabsTrigger>
              <TabsTrigger value="impact">ზემოქმედება</TabsTrigger>
              <TabsTrigger value="devices">მოწყობილობები</TabsTrigger>
            </TabsList>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>ანგარიშის ექსპორტი</span>
            </Button>
          </div>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Growth Chart */}
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>ზრდის ტენდენცია</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="papers" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Schools Performance */}
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    <span>სკოლების შედარება</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={schoolData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="papers" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-success/20 rounded-lg">
                      <Target className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">95%</div>
                      <div className="text-sm text-muted-foreground">მიზნის მიღწევა</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">83%</div>
                      <div className="text-sm text-muted-foreground">მოწყობილობების აქტიურობა</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-accent/20 rounded-lg">
                      <Calendar className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">12</div>
                      <div className="text-sm text-muted-foreground">საშუალო სტრიკი</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schools">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>სკოლების დეტალური სტატისტიკა</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSchools.map((school, index) => (
                    <div key={school.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Badge variant={index < 3 ? "default" : "secondary"} className="min-w-[60px] justify-center">
                          #{school.ranking}
                        </Badge>
                        <div>
                          <h3 className="font-semibold text-foreground">{school.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{school.city}</span>
                            <span>•</span>
                            <span>{school.totalStudents} მოსწავლე</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">{school.totalPapers.toLocaleString('ka-GE')}</div>
                        <div className="text-sm text-muted-foreground">ფურცელი</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>ეკოლოგიური ზემოქმედება</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={impactData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {impactData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>გარემოსდაცვითი მიღწევები</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center space-x-3">
                      <TreePine className="w-8 h-8 text-success" />
                      <div>
                        <div className="font-semibold text-success">დაზოგილი ხეები</div>
                        <div className="text-sm text-muted-foreground">რეციკლირების შედეგად</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-success">{mockStatistics.savedTrees.toFixed(1)}</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-8 h-8 text-primary" />
                      <div>
                        <div className="font-semibold text-primary">CO₂ შემცირება</div>
                        <div className="text-sm text-muted-foreground">კილოგრამებში</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary">{mockStatistics.carbonReduced}</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-center space-x-3">
                      <Users className="w-8 h-8 text-accent" />
                      <div>
                        <div className="font-semibold text-accent">ჩართული მოსწავლეები</div>
                        <div className="text-sm text-muted-foreground">აქტიური მონაწილეები</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-accent">{mockStatistics.totalStudents}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>მოწყობილობების სტატუსი</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {deviceStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>EcoBox მოწყობილობები</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSchools.flatMap(school => 
                      school.ecoBoxDevices.map(device => (
                        <div key={device.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              device.status === 'online' ? 'bg-success' :
                              device.status === 'offline' ? 'bg-destructive' :
                              device.status === 'maintenance' ? 'bg-warning' :
                              'bg-accent'
                            }`} />
                            <div>
                              <div className="font-medium text-foreground">{device.location}</div>
                              <div className="text-sm text-muted-foreground">
                                {mockSchools.find(s => s.id === device.schoolId)?.name}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {device.currentCapacity}/{device.totalCapacity}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {Math.round((device.currentCapacity / device.totalCapacity) * 100)}%
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Statistics;