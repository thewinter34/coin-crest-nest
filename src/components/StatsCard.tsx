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
    <Card className="glass-card p-6 hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold mb-2">{value}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={`text-sm font-medium mt-2 ${trend.positive ? 'text-success' : 'text-destructive'}`}>
              {trend.positive ? '+' : ''}{trend.value}
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center glow-primary">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );
};
