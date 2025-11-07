import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Activity,
  Settings,
  Archive
} from 'lucide-react';
import { EcoBoxDevice } from '@/types';

interface EcoBoxStatusProps {
  device: EcoBoxDevice;
  onManage?: (deviceId: string) => void;
  showDetails?: boolean;
}

const EcoBoxStatus = ({ device, onManage, showDetails = false }: EcoBoxStatusProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'offline':
        return <WifiOff className="w-5 h-5 text-destructive" />;
      case 'maintenance':
        return <Settings className="w-5 h-5 text-warning" />;
      case 'full':
        return <Archive className="w-5 h-5 text-accent" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online':
        return 'აქტიური';
      case 'offline':
        return 'არააქტიური';
      case 'maintenance':
        return 'სერვისი';
      case 'full':
        return 'სავსე';
      default:
        return 'უცნობი';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-success/10 text-success border-success/20';
      case 'offline':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'maintenance':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'full':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const capacityPercentage = (device.currentCapacity / device.totalCapacity) * 100;
  const lastSeenMinutes = Math.floor((Date.now() - device.lastDataReceived.getTime()) / (1000 * 60));
  
  const getLastSeenText = (minutes: number) => {
    if (minutes < 1) return 'ახლახან';
    if (minutes < 60) return `${minutes} წუთის წინ`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} საათის წინ`;
    const days = Math.floor(hours / 24);
    return `${days} დღის წინ`;
  };

  return (
    <Card className={`group hover:shadow-card transition-all duration-300 hover:scale-[1.02] bg-card/80 backdrop-blur-sm ${
      device.status === 'full' ? 'border-accent/30' : 
      device.status === 'offline' ? 'border-destructive/30' : 
      'border-border'
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className={`text-xs ${getStatusColor(device.status)}`}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(device.status)}
                  <span>{getStatusLabel(device.status)}</span>
                </div>
              </Badge>
              {device.status === 'online' && (
                <div className="flex items-center space-x-1 text-xs text-success">
                  <Wifi className="w-3 h-3" />
                  <span>კავშირი აქტიურია</span>
                </div>
              )}
            </div>
            <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {device.location}
            </CardTitle>
          </div>
          <div className="p-3 bg-gradient-primary rounded-xl shadow-eco">
            <Archive className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Capacity Status */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">დატვირთვა</span>
            <span className="text-sm text-muted-foreground">
              {device.currentCapacity} / {device.totalCapacity}
            </span>
          </div>
          <Progress 
            value={capacityPercentage} 
            className={`h-3 ${
              capacityPercentage > 90 ? '[&>div]:bg-destructive' :
              capacityPercentage > 75 ? '[&>div]:bg-warning' :
              '[&>div]:bg-success'
            }`}
          />
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">
              {capacityPercentage.toFixed(1)}% სავse
            </span>
            <span className={`font-medium ${
              capacityPercentage > 90 ? 'text-destructive' :
              capacityPercentage > 75 ? 'text-warning' :
              'text-success'
            }`}>
              {device.totalCapacity - device.currentCapacity} ფურცელი დარჩენილია
            </span>
          </div>
        </div>

        {showDetails && (
          <>
            {/* Daily Statistics */}
            <div className="grid grid-cols-2 gap-4 py-4 bg-muted/20 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <div className="text-lg font-bold text-primary">{device.dailyCollections}</div>
                <div className="text-xs text-muted-foreground">დღეს შეგროვებული</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div className="text-lg font-bold text-accent">
                  {getLastSeenText(lastSeenMinutes)}
                </div>
                <div className="text-xs text-muted-foreground">ბოლო სიგნალი</div>
              </div>
            </div>

            {/* Location */}
            {device.coordinates && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>
                  {device.coordinates.lat.toFixed(4)}, {device.coordinates.lng.toFixed(4)}
                </span>
              </div>
            )}
          </>
        )}

        {/* Status Messages */}
        {device.status === 'full' && (
          <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-center space-x-2 text-accent">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">საჭიროა დაცლა</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              EcoBox მოწყობილობა სავსეა და საჭიროებს დაცლას
            </p>
          </div>
        )}

        {device.status === 'offline' && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2 text-destructive">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">კავშირი წყვეტილია</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              მოწყობილობა არ აგზავნის მონაცემებს. შეამოწმეთ კავშირი.
            </p>
          </div>
        )}

        {device.status === 'maintenance' && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 text-warning">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">სერვისის რეჟიმი</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              მოწყობილობა სერვისის რეჟიმშია და დროებით არ იღებს ქაღალდს
            </p>
          </div>
        )}

        {/* Action Button */}
        {onManage && (
          <Button 
            variant="outline" 
            className="w-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            onClick={() => onManage(device.id)}
          >
            მართვა
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EcoBoxStatus;