import React from 'react';
import { Check } from 'lucide-react';
import { orderStatusFlow, type OrderStatus } from '@/data/mockData';

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ currentStatus }) => {
  const currentIndex = orderStatusFlow.indexOf(currentStatus);

  return (
    <div className="space-y-0">
      {orderStatusFlow.map((status, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <div key={status} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              {index < orderStatusFlow.length - 1 && (
                <div
                  className={`w-0.5 h-8 ${
                    index < currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
            <div className="pb-6">
              <p
                className={`text-sm ${
                  isCurrent ? 'font-semibold text-foreground' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {status}
              </p>
              {isCompleted && (
                <p className="text-xs text-muted-foreground">Completed</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
