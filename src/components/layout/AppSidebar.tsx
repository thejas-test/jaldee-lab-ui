import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Calendar, Heart, ShoppingCart, Landmark, DollarSign,
  MoreHorizontal, Settings, LayoutDashboard, FileText, TestTubes,
  Package, CheckSquare, Users, BarChart3, ChevronLeft, ChevronRight,
  FlaskConical, ClipboardList
} from 'lucide-react';

const primaryNavItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Calendar, label: 'Bookings', path: '#' },
  { icon: Heart, label: 'Health', path: '#', active: true },
  { icon: ShoppingCart, label: 'Karty', path: '#' },
  { icon: Landmark, label: 'Lending', path: '#' },
  { icon: DollarSign, label: 'Finance', path: '#' },
  { icon: MoreHorizontal, label: 'More', path: '#' },
  { icon: Settings, label: 'Settings', path: '#' },
];

const secondaryNavItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '#' },
  { icon: Users, label: 'OP-Patient', path: '#' },
  { icon: Users, label: 'In-Patient', path: '#' },
  { icon: FlaskConical, label: 'LIMS', path: '/', isSection: true },
];

const limsSubItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ClipboardList, label: 'Orders', path: '/orders' },
  { icon: TestTubes, label: 'Samples', path: '/samples' },
  { icon: FileText, label: 'Tests', path: '/tests' },
  { icon: Package, label: 'Test Package', path: '/test-packages' },
  { icon: CheckSquare, label: 'Validate', path: '/validate' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
];

interface AppSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed = false, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse?.(!isCollapsed);
  };

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen">
      {/* Primary icon sidebar */}
      <div className="w-16 bg-card border-r flex flex-col items-center py-4 gap-1 shrink-0">
        {primaryNavItems.map((item) => (
          <button
            key={item.label}
            className={`sidebar-nav-item w-12 ${
              item.label === 'Health'
                ? 'sidebar-nav-item-active'
                : 'text-muted-foreground hover:bg-muted'
            }`}
            onClick={() => item.path !== '#' && navigate(item.path)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Secondary sidebar */}
      {!isCollapsed && (
        <div className="w-52 bg-card border-r flex flex-col relative">
          {/* Location dropdown */}
          <div className="p-3 border-b">
            <select className="w-full px-3 py-2 text-sm border rounded-md bg-card text-foreground">
              <option>Thrissur</option>
              <option>Kochi</option>
              <option>Calicut</option>
            </select>
          </div>

          {/* Secondary nav */}
          <div className="p-2 space-y-0.5">
            {secondaryNavItems.map((item) => (
              <button
                key={item.label}
                className={`sidebar-sub-item w-full text-left ${
                  item.isSection
                    ? 'sidebar-sub-item-active'
                    : 'text-muted-foreground'
                }`}
                onClick={() => item.path !== '#' && navigate(item.path)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* LIMS sub-items */}
          <div className="px-2 pb-2 space-y-0.5 border-t pt-2">
            {limsSubItems.map((item) => (
              <button
                key={item.label}
                className={`sidebar-sub-item w-full text-left pl-6 ${
                  isActivePath(item.path)
                    ? 'text-primary font-medium bg-accent'
                    : 'text-muted-foreground'
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Collapse button */}
          <button
            onClick={handleCollapse}
            className="absolute -right-3 top-14 z-10 h-6 w-6 rounded-full bg-card border shadow-sm flex items-center justify-center hover:bg-muted"
          >
            <ChevronLeft className="h-3 w-3" />
          </button>
        </div>
      )}

      {isCollapsed && (
        <button
          onClick={handleCollapse}
          className="absolute left-16 top-14 z-10 h-6 w-6 rounded-full bg-card border shadow-sm flex items-center justify-center hover:bg-muted"
        >
          <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default AppSidebar;
