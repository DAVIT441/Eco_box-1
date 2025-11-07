import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'gradient' | 'success' | 'accent';
}

const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  className,
  variant = 'default' 
}: StatsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-primary text-primary-foreground shadow-eco';
      case 'success':
        return 'bg-success/10 border-success/20 text-success-foreground';
      case 'accent':
        return 'bg-accent/10 border-accent/20 text-accent-foreground';
      default:
        return 'bg-card text-card-foreground';
    }
  };

  return (
    <Card className={cn(
      'transition-all duration-200 hover:shadow-card hover:scale-[1.02]',
      getVariantStyles(),
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className={cn(
              'text-sm font-medium',
              variant === 'gradient' ? 'text-primary-foreground/80' : 'text-muted-foreground'
            )}>
              {title}
            </p>
            <div className="flex items-baseline space-x-2 mt-1">
              <h3 className={cn(
                'text-2xl font-bold',
                variant === 'gradient' ? 'text-primary-foreground' : 'text-foreground'
              )}>
                {typeof value === 'number' ? value.toLocaleString('ka-GE') : value}
              </h3>
              {trend && (
                <span className={cn(
                  'text-xs font-medium px-2 py-1 rounded-full',
                  trend.isPositive 
                    ? 'bg-success/20 text-success' 
                    : 'bg-destructive/20 text-destructive'
                )}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className={cn(
                'text-xs mt-1',
                variant === 'gradient' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}>
                {subtitle}
              </p>
            )}
          </div>
          <div className={cn(
            'p-3 rounded-xl',
            variant === 'gradient' 
              ? 'bg-white/20' 
              : variant === 'success'
              ? 'bg-success/20'
              : variant === 'accent'
              ? 'bg-accent/20'
              : 'bg-muted'
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;