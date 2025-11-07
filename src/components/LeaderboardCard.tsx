import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp, TrendingDown } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  school?: string;
  papers: number;
  change: number;
  avatar?: string;
}

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  type: 'student' | 'school';
}

const LeaderboardCard = ({ entry, type }: LeaderboardCardProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-500" />;
      default:
        return <Award className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank === 1) return "default";
    if (rank <= 3) return "secondary";
    return "outline";
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className={`group hover:shadow-card transition-all duration-300 hover:scale-[1.02] ${
      entry.rank <= 3 
        ? 'bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10' 
        : 'bg-card/80 backdrop-blur-sm'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Rank and Icon */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-primary">
              {getRankIcon(entry.rank)}
            </div>
            <Badge variant={getRankBadgeVariant(entry.rank)} className="min-w-[40px] justify-center">
              #{entry.rank}
            </Badge>
          </div>

          {/* Avatar (for students) */}
          {type === 'student' && (
            <Avatar className="w-10 h-10 bg-gradient-secondary">
              <AvatarFallback className="text-white text-sm font-bold">
                {getInitials(entry.name)}
              </AvatarFallback>
            </Avatar>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {entry.name}
            </h3>
            {entry.school && (
              <p className="text-sm text-muted-foreground truncate">{entry.school}</p>
            )}
          </div>

          {/* Stats */}
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              {entry.papers.toLocaleString('ka-GE')}
            </div>
            <div className="text-xs text-muted-foreground">ფურცელი</div>
            
            {/* Change indicator */}
            {entry.change !== 0 && (
              <div className={`flex items-center justify-end text-xs font-medium mt-1 ${
                entry.change > 0 ? 'text-success' : 'text-destructive'
              }`}>
                {entry.change > 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(entry.change)}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;