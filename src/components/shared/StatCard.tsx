import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconBg?: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, iconBg = 'bg-primary/10', trend }) => {
  return (
    <div className="stat-card">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {(subtitle || trend) && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend && <span className="text-primary font-medium">{trend}</span>}
            {subtitle && ` ${subtitle}`}
          </p>
        )}
      </div>
      {Icon && (
        <div className={`h-10 w-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
          <Icon className="h-5 w-5 text-primary" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
