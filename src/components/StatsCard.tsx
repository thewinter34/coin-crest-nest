import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export const StatsCard = ({ title, value, subtitle, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card className="glass-card p-4 md:p-6 hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{value}</h3>
          {subtitle && (
            <p className="text-xs md:text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={`text-xs md:text-sm font-medium mt-2 ${trend.positive ? 'text-success' : 'text-destructive'}`}>
              {trend.positive ? '+' : ''}{trend.value}
            </div>
          )}
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-primary flex items-center justify-center glow-primary flex-shrink-0">
          <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );
};
