import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp, TrendingDown } from 'lucide-react';
import { LeaderboardEntry } from '@/types';

interface EcoLeaderboardProps {
  entries: LeaderboardEntry[];
  title: string;
  type: 'students' | 'classes' | 'schools';
}

const EcoLeaderboard = ({ entries, title, type }: EcoLeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'same', change: number) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-eco-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${
                entry.rank <= 3 ? 'bg-gradient-to-r from-eco-primary/5 to-transparent' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(entry.rank)}
                </div>
                
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-eco-secondary text-white text-sm">
                    {entry.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{entry.name}</span>
                  {entry.school && (
                    <span className="text-xs text-muted-foreground">{entry.school}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getTrendIcon(entry.trend, entry.change)}
                  {entry.change !== 0 && (
                    <span className={`text-xs ${
                      entry.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.trend === 'up' ? '+' : '-'}{Math.abs(entry.change)}
                    </span>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-eco-primary">{entry.papers}</div>
                  <div className="text-xs text-muted-foreground">ფურცელი</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EcoLeaderboard;