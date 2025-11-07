import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { mockSchools } from '@/data/mockData';

const EcoMap = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-yellow-500';
      case 'full':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'offline':
        return <WifiOff className="h-4 w-4 text-red-500" />;
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'full':
        return <Wifi className="h-4 w-4 text-blue-500" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'აქტიური';
      case 'offline':
        return 'არააქტიური';
      case 'maintenance':
        return 'მომსახურება';
      case 'full':
        return 'სავსე';
      default:
        return 'უცნობი';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-eco-primary" />
          EcoBox მოწყობილობების რუქა
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Simulated Map View */}
        <div className="relative bg-gradient-to-br from-eco-light/20 to-eco-secondary/10 rounded-lg h-64 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23059669%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M20%2020c0-11.046-8.954-20-20-20v20h20z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          {/* School Locations */}
          {mockSchools.map((school, index) => (
            <div
              key={school.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 20}%`,
              }}
            >
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(school.ecoBoxDevices[0]?.status || 'offline')} pulse-ring`}></div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-card border border-border rounded-lg p-2 shadow-lg min-w-48">
                    <div className="font-medium text-sm">{school.name}</div>
                    <div className="text-xs text-muted-foreground">{school.city}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {getStatusIcon(school.ecoBoxDevices[0]?.status || 'offline')}
                      <span className="text-xs">{getStatusText(school.ecoBoxDevices[0]?.status || 'offline')}</span>
                    </div>
                    <div className="text-xs text-eco-primary mt-1">
                      {school.totalPapers} ფურცელი
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>აქტიური</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>არააქტიური</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>მომსახურება</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>სავსე</span>
          </div>
        </div>

        {/* Device Statistics */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {mockSchools.reduce((acc, school) => acc + school.ecoBoxDevices.filter(d => d.status === 'online').length, 0)}
            </div>
            <div className="text-xs text-muted-foreground">აქტიური</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">
              {mockSchools.reduce((acc, school) => acc + school.ecoBoxDevices.filter(d => d.status === 'offline').length, 0)}
            </div>
            <div className="text-xs text-muted-foreground">არააქტიური</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {mockSchools.reduce((acc, school) => acc + school.ecoBoxDevices.filter(d => d.status === 'maintenance').length, 0)}
            </div>
            <div className="text-xs text-muted-foreground">მომსახურება</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {mockSchools.reduce((acc, school) => acc + school.ecoBoxDevices.filter(d => d.status === 'full').length, 0)}
            </div>
            <div className="text-xs text-muted-foreground">სავსე</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EcoMap;