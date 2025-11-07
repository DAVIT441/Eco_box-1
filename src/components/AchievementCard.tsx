import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle } from 'lucide-react';
import { Achievement } from '@/types';

interface AchievementCardProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

const AchievementCard = ({ achievement, size = 'md' }: AchievementCardProps) => {
  const isEarned = !!achievement.earnedDate;
  const progress = achievement.progress || 0;

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'epic':
        return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      case 'rare':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      default:
        return 'from-gray-500/20 to-gray-400/20 border-gray-500/30';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'ლეგენდარული';
      case 'epic':
        return 'ეპიკური';
      case 'rare':
        return 'იშვიათი';
      default:
        return 'ჩვეულებრივი';
    }
  };

  return (
    <Card className={`group hover:shadow-card transition-all duration-300 hover:scale-[1.02] ${
      isEarned 
        ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} border` 
        : 'bg-card/50 backdrop-blur-sm border border-dashed border-muted'
    } ${!isEarned && 'opacity-75'}`}>
      <CardContent className={sizeClasses[size]}>
        <div className="text-center space-y-3">
          {/* Achievement Icon */}
          <div className="relative">
            <div className={`${iconSizes[size]} ${isEarned ? '' : 'grayscale'} transition-all duration-300`}>
              {achievement.icon}
            </div>
            {!isEarned && progress < 100 && (
              <div className="absolute -top-1 -right-1 p-1 bg-muted rounded-full">
                <Lock className="w-3 h-3 text-muted-foreground" />
              </div>
            )}
            {isEarned && (
              <div className="absolute -top-1 -right-1 p-1 bg-success rounded-full">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Achievement Name */}
          <div>
            <h3 className={`font-bold text-foreground ${
              size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
            } ${isEarned ? 'group-hover:text-primary transition-colors' : ''}`}>
              {achievement.nameGeorgian}
            </h3>
            <p className={`text-muted-foreground ${
              size === 'sm' ? 'text-xs' : 'text-sm'
            } mt-1`}>
              {achievement.descriptionGeorgian}
            </p>
          </div>

          {/* Progress Bar (for unearned achievements) */}
          {!isEarned && progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">პროგრესი</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}

          {/* Rarity Badge */}
          <Badge 
            variant={isEarned ? "default" : "secondary"} 
            className={`text-xs ${
              achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
              achievement.rarity === 'epic' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
              achievement.rarity === 'rare' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
              ''
            }`}
          >
            {getRarityLabel(achievement.rarity)}
          </Badge>

          {/* Earned Date */}
          {isEarned && achievement.earnedDate && (
            <p className="text-xs text-muted-foreground">
              მიღებულია: {new Date(achievement.earnedDate).toLocaleDateString('ka-GE')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;