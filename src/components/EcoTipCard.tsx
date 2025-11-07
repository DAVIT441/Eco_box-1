import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Leaf, Droplets, Zap, Car, BookOpen } from 'lucide-react';
import { EcoTip } from '@/types';

interface EcoTipCardProps {
  tip: EcoTip;
  onLearnMore?: (tipId: string) => void;
}

const EcoTipCard = ({ tip, onLearnMore }: EcoTipCardProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'recycling':
        return <Leaf className="w-5 h-5 text-success" />;
      case 'energy':
        return <Zap className="w-5 h-5 text-warning" />;
      case 'water':
        return <Droplets className="w-5 h-5 text-primary" />;
      case 'transportation':
        return <Car className="w-5 h-5 text-accent" />;
      case 'general':
        return <BookOpen className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Lightbulb className="w-5 h-5 text-primary" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'recycling':
        return 'რეციკლირება';
      case 'energy':
        return 'ენერგია';
      case 'water':
        return 'წყალი';
      case 'transportation':
        return 'ტრანსპორტი';
      case 'general':
        return 'ზოგადი';
      default:
        return category;
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'მარტივი';
      case 'medium':
        return 'საშუალო';
      case 'hard':
        return 'რთული';
      default:
        return difficulty;
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'low':
        return 'დაბალი';
      case 'medium':
        return 'საშუალო';
      case 'high':
        return 'მაღალი';
      default:
        return impact;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success/10 text-success border-success/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'hard':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      case 'medium':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'high':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:scale-[1.02] bg-card/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary/10 rounded-lg">
                {getCategoryIcon(tip.category)}
              </div>
              <div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {tip.titleGeorgian}
                </h3>
                <Badge variant="outline" className="text-xs mt-1">
                  {getCategoryLabel(tip.category)}
                </Badge>
              </div>
            </div>
            <div className="text-3xl">{tip.icon}</div>
          </div>

          {/* Content */}
          <p className="text-muted-foreground leading-relaxed">
            {tip.contentGeorgian}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={`text-xs ${getDifficultyColor(tip.difficulty)}`}>
              სირთულე: {getDifficultyLabel(tip.difficulty)}
            </Badge>
            <Badge variant="outline" className={`text-xs ${getImpactColor(tip.impact)}`}>
              ზემოქმედება: {getImpactLabel(tip.impact)}
            </Badge>
          </div>

          {/* Action */}
          {onLearnMore && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              onClick={() => onLearnMore(tip.id)}
            >
              მეტის გაგება
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EcoTipCard;