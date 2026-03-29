import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, MoreVertical, Eye } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { orders } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const OrdersList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter((o) => {
    const matchSearch = o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.patient.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Orders</h1>
          <p className="page-subtitle">{orders.length} total orders</p>
        </div>
        <Button onClick={() => navigate('/orders/create')}>
          <Plus className="h-4 w-4" />
          Create Order
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Order Confirmed', 'Sample Collected', 'In Processing', 'Result Entered', 'Validated', 'Report Published'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                statusFilter === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="content-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="text-left px-4 py-3">Order ID</th>
                <th className="text-left px-4 py-3">Patient</th>
                <th className="text-left px-4 py-3">Tests</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Priority</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Amount</th>
                <th className="text-center px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <td className="px-4 py-3 text-sm font-medium text-primary">{order.orderId}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">{order.patient.name}</p>
                    <p className="text-xs text-muted-foreground">{order.patient.uhid}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {order.tests.map((t) => (
                        <span key={t.id} className="text-xs bg-muted px-2 py-0.5 rounded">{t.testCode}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{order.createdAt}</td>
                  <td className="px-4 py-3"><StatusBadge status={order.priority} /></td>
                  <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">₹{order.netAmount}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="p-1 hover:bg-muted rounded"
                      onClick={(e) => { e.stopPropagation(); navigate(`/orders/${order.id}`); }}
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
