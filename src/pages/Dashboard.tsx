import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList, FileText, TestTubes, Package, CheckSquare, Users, BarChart3,
  FlaskConical, Clock, AlertTriangle, Timer, TrendingDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import StatCard from '@/components/shared/StatCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { chartData, technicians, machineIntegration } from '@/data/mockData';

const quickActions = [
  { icon: ClipboardList, label: 'Create Order', path: '/orders/create' },
  { icon: FileText, label: 'Orders', path: '/orders' },
  { icon: FlaskConical, label: 'Samples', path: '/samples' },
  { icon: TestTubes, label: 'Tests', path: '/tests' },
  { icon: Package, label: 'Test Package', path: '/test-packages' },
  { icon: CheckSquare, label: 'Validate', path: '/validate' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-title text-2xl">LIMS Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's your lab overview.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.label}
            className="quick-action-tile"
            onClick={() => navigate(action.path)}
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <action.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-medium text-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Workflow Status */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">Sample Workflow Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard title="Pending Collection" value={18} icon={Clock} trend="<3" subtitle="vs. last week" />
          <StatCard title="In Processing" value={45} icon={FlaskConical} iconBg="bg-info/10" trend="<3" subtitle="vs. last week" />
          <StatCard title="Awaiting Validation" value={23} icon={CheckSquare} iconBg="bg-success/10" trend="" subtitle="vs. last week" />
          <StatCard title="Critical Results" value="04" icon={AlertTriangle} iconBg="bg-destructive/10" trend="<3" subtitle="vs. last week" />
          <StatCard title="Avg Turnaround Time" value="4.2" icon={Timer} iconBg="bg-success/10" trend="-0.5 hrs" subtitle="vs. last week" />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Ordered Tests */}
        <div className="content-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">Most Ordered Tests</h3>
            <select className="text-xs border rounded px-2 py-1 text-muted-foreground bg-card">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData.mostOrderedTests}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" name="Orders" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Volume */}
        <div className="content-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">Order Volume</h3>
            <select className="text-xs border rounded px-2 py-1 text-muted-foreground bg-card">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData.orderVolume}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Machine Integration Status */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">Machine Integration Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="stat-card">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <CheckSquare className="h-6 w-6 text-primary" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">7/8</p>
              <p className="text-sm text-muted-foreground">Machines Online</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
              <FlaskConical className="h-6 w-6 text-warning" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Samples in Queue</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">02</p>
              <p className="text-sm text-muted-foreground">Machine Errors</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">02</p>
              <p className="text-sm text-muted-foreground">Machine Errors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Analyzers & Technician Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="content-card p-4">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            Connected Analyzers
          </h3>
          <div className="space-y-3">
            {machineIntegration.map((machine) => (
              <div key={machine.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${machine.status === 'Online' ? 'bg-success' : 'bg-destructive'}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{machine.name}</p>
                    <p className="text-xs text-muted-foreground">{machine.model}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {machine.status === 'Online' && (
                    <span className="text-xs text-muted-foreground">Queue <span className="font-medium text-foreground">{machine.queue} samples</span></span>
                  )}
                  <StatusBadge status={machine.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card p-4">
          <h3 className="text-base font-semibold text-foreground mb-4">Technician Performance</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-xs font-medium text-muted-foreground">Technician</th>
                <th className="text-center py-2 text-xs font-medium text-muted-foreground">Completed</th>
                <th className="text-center py-2 text-xs font-medium text-muted-foreground">Pending</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((tech) => (
                <tr key={tech.id} className="border-b last:border-0">
                  <td className="py-3 text-sm font-medium text-foreground">{tech.name}</td>
                  <td className="py-3 text-sm text-center text-foreground">{tech.completed}</td>
                  <td className="py-3 text-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                      {tech.pending}
                    </span>
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

export default Dashboard;
