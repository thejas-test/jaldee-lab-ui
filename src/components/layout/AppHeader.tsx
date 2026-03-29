import React from 'react';
import { Search, MessageSquare, Bell, Grid3X3, ChevronDown } from 'lucide-react';

const AppHeader: React.FC = () => {
  return (
    <header className="h-14 bg-card border-b flex items-center justify-between px-4 shrink-0">
      {/* Left - Brand */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-bold">🧬</span>
        </div>
        <span className="font-semibold text-foreground text-sm">Global Care Hospital</span>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
          <MessageSquare className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full"></span>
        </button>
        <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
          <Grid3X3 className="h-5 w-5" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-3 border-l cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-sm font-medium">DB</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-muted-foreground">ADMIN</p>
            <p className="text-sm font-medium text-foreground leading-tight">David Beckham</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
