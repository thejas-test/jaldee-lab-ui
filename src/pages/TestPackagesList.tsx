import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/StatusBadge';
import { testPackages } from '@/data/mockData';

const TestPackagesList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = testPackages.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="page-header">
        <div>
          <h1 className="page-title">Test Packages</h1>
          <p className="page-subtitle">{testPackages.length} packages</p>
        </div>
        <Button onClick={() => navigate('/test-packages/create')}>
          <Plus className="h-4 w-4" /> Create Package
        </Button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search packages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="content-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="text-left px-4 py-3">Code</th>
                <th className="text-left px-4 py-3">Package Name</th>
                <th className="text-left px-4 py-3">Tests</th>
                <th className="text-left px-4 py-3">MRP</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3">Final Price</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-center px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-primary">{pkg.code}</td>
                  <td className="px-4 py-3 text-sm font-medium">{pkg.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {pkg.tests.map((t) => (
                        <span key={t.testId} className="text-xs bg-muted px-2 py-0.5 rounded">{t.testCode}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground line-through">₹{pkg.mrp}</td>
                  <td className="px-4 py-3 text-sm font-medium">₹{pkg.price}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">₹{pkg.finalPrice}</td>
                  <td className="px-4 py-3"><StatusBadge status={pkg.status} /></td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => navigate(`/test-packages/${pkg.id}/edit`)} className="p-1 hover:bg-muted rounded">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
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

export default TestPackagesList;
