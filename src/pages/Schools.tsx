import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Users, FileText, TreePine, Award, Zap } from 'lucide-react';
import { mockSchools } from '@/data/mockData';
import StatsCard from '@/components/StatsCard';

const Schools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent-light/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            ქართული სკოლები
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            EcoBox პროგრამაში მონაწილე სკოლების სრული სია და მათი მიღწევები
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="სულ სკოლები"
            value={mockSchools.length}
            icon={<Users className="w-6 h-6 text-primary" />}
            variant="gradient"
          />
          <StatsCard
            title="სულ მოსწავლეები"
            value={mockSchools.reduce((sum, school) => sum + school.totalStudents, 0)}
            icon={<Users className="w-6 h-6 text-success" />}
            variant="success"
          />
          <StatsCard
            title="გადამუშავებული ქაღალდი"
            value={mockSchools.reduce((sum, school) => sum + school.totalPapers, 0)}
            subtitle="ფურცელი"
            icon={<FileText className="w-6 h-6 text-accent" />}
            variant="accent"
          />
          <StatsCard
            title="დაზოგილი ხეები"
            value={mockSchools.reduce((sum, school) => sum + school.savedTrees, 0).toFixed(1)}
            icon={<TreePine className="w-6 h-6 text-success" />}
          />
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockSchools.map((school, index) => (
            <Card key={school.id} className="group hover:shadow-card transition-all duration-300 hover:scale-[1.02] bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant={index < 3 ? "default" : "secondary"} className="text-xs">
                        #{school.ranking} ადგილი
                      </Badge>
                      {school.ecoBoxDevices.some(d => d.status === 'online') && (
                        <Badge variant="outline" className="text-xs border-success text-success">
                          <Zap className="w-3 h-3 mr-1" />
                          აქტიური
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {school.name}
                    </CardTitle>
                    <div className="flex items-center text-muted-foreground text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {school.city}, {school.region}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-eco">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Statistics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{school.totalStudents.toLocaleString('ka-GE')}</div>
                    <div className="text-xs text-muted-foreground">მოსწავლე</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{school.totalPapers.toLocaleString('ka-GE')}</div>
                    <div className="text-xs text-muted-foreground">ფურცელი</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{school.savedTrees.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground">ხე</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">თვიური პროგრესი</span>
                    <span className="font-medium">{school.monthlyPapers} / 1000</span>
                  </div>
                  <Progress 
                    value={(school.monthlyPapers / 1000) * 100} 
                    className="h-2"
                  />
                </div>

                {/* EcoBox Devices Status */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">EcoBox მოწყობილობები</h4>
                  <div className="space-y-1">
                    {school.ecoBoxDevices.map((device) => (
                      <div key={device.id} className="flex items-center justify-between text-xs">
                        <span className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            device.status === 'online' ? 'bg-success' :
                            device.status === 'offline' ? 'bg-destructive' :
                            device.status === 'maintenance' ? 'bg-warning' :
                            'bg-accent'
                          }`} />
                          <span className="text-muted-foreground">{device.location}</span>
                        </span>
                        <span className="text-foreground">
                          {device.currentCapacity}/{device.totalCapacity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="bg-success/5 p-4 rounded-lg border border-success/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <TreePine className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">გარემოზე ზემოქმედება</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    შემცირებული CO₂: <span className="font-medium text-foreground">{school.carbonReduced} კგ</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  დეტალურად ნახვა
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-eco rounded-2xl shadow-glow">
          <h2 className="text-2xl font-bold text-white mb-4">
            თქვენი სკოლაც გახდეს EcoBox ოჯახის წევრი!
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            შემოუერთდით ეკოლოგიური განათლების რევოლუციას და დაიწყეთ ინოვაციური ქაღალდის რეციკლირება თქვენს სკოლაში.
          </p>
          <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-all duration-200">
            გაიგე მეტი
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Schools;