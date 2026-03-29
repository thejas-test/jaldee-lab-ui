import React from 'react';
import type { OrderStatus } from '@/data/mockData';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const statusStyles: Record<string, string> = {
  'Order Confirmed': 'status-badge status-processing',
  'Sample Collected': 'status-badge status-pending',
  'In Processing': 'status-badge status-processing',
  'Result Entered': 'status-badge status-pending',
  'Validated': 'status-badge status-validated',
  'Report Published': 'status-badge status-completed',
  'Pending': 'status-badge status-pending',
  'Completed': 'status-badge status-completed',
  'Active': 'status-badge status-completed',
  'Inactive': 'status-badge bg-gray-50 text-gray-600 border border-gray-200',
  'Online': 'status-badge status-completed',
  'Offline': 'status-badge status-critical',
  'Normal': 'status-badge status-completed',
  'Urgent': 'status-badge status-pending',
  'STAT': 'status-badge status-critical',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const className = statusStyles[status] || 'status-badge bg-gray-50 text-gray-600 border border-gray-200';
  return (
    <span className={`${className} ${size === 'sm' ? 'text-xs' : 'text-sm px-3 py-1'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
