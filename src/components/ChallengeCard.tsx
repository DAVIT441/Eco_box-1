import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Target, Trophy, Clock } from 'lucide-react';
import { Challenge } from '@/types';

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin?: (challengeId: string) => void;
  userParticipating?: boolean;
}

const ChallengeCard = ({ challenge, onJoin, userParticipating = false }: ChallengeCardProps) => {
  const progressPercentage = (challenge.progress / challenge.target) * 100;
  const daysRemaining = Math.ceil((challenge.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'daily':
        return 'ყოველდღიური';
      case 'weekly':
        return 'კვირეული';
      case 'monthly':
        return 'თვიური';
      case 'special':
        return 'სპეციალური';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily':
        return 'bg-success/10 text-success border-success/20';
      case 'weekly':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'monthly':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'special':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:scale-[1.02] bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className={`text-xs ${getTypeColor(challenge.type)}`}>
                {getTypeLabel(challenge.type)}
              </Badge>
              {challenge.completed && (
                <Badge variant="default" className="text-xs bg-success">
                  დასრულებული
                </Badge>
              )}
              {userParticipating && (
                <Badge variant="secondary" className="text-xs">
                  მონაწილეობს
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {challenge.titleGeorgian}
            </CardTitle>
          </div>
          <div className="p-3 bg-gradient-primary rounded-xl shadow-eco">
            <Target className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {challenge.descriptionGeorgian}
        </p>

        {/* Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">პროგრესი</span>
            <span className="text-sm text-muted-foreground">
              {challenge.progress.toLocaleString('ka-GE')} / {challenge.target.toLocaleString('ka-GE')}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="text-right">
            <span className="text-xs text-muted-foreground">
              {progressPercentage.toFixed(1)}% შესრულებული
            </span>
          </div>
        </div>

        {/* Challenge Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 bg-muted/20 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="text-lg font-bold text-primary">
              {challenge.participants.toLocaleString('ka-GE')}
            </div>
            <div className="text-xs text-muted-foreground">მონაწილე</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="w-4 h-4 text-accent" />
            </div>
            <div className="text-lg font-bold text-accent">{challenge.reward}</div>
            <div className="text-xs text-muted-foreground">ქულა</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-warning" />
            </div>
            <div className="text-lg font-bold text-warning">{daysRemaining}</div>
            <div className="text-xs text-muted-foreground">დღე</div>
          </div>
        </div>

        {/* Challenge Timeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>დაიწყო: {challenge.startDate.toLocaleDateString('ka-GE')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>მთავრდება: {challenge.endDate.toLocaleDateString('ka-GE')}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {challenge.completed ? (
            <Button disabled className="w-full">
              გამოწვევა დასრულებულია
            </Button>
          ) : userParticipating ? (
            <Button variant="secondary" className="w-full">
              გაგრძელება
            </Button>
          ) : (
            <Button 
              className="w-full bg-gradient-secondary hover:shadow-eco transition-all duration-200"
              onClick={() => onJoin?.(challenge.id)}
            >
              მონაწილეობა
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;