import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Eye, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/StatusBadge';
import { labTests } from '@/data/mockData';

const TestsList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const departments = ['All', ...new Set(labTests.map((t) => t.department))];

  const filtered = labTests.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.code.toLowerCase().includes(search.toLowerCase());
    const matchDept = departmentFilter === 'All' || t.department === departmentFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="space-y-4">
      <div className="page-header">
        <div>
          <h1 className="page-title">Tests</h1>
          <p className="page-subtitle">{labTests.length} tests configured</p>
        </div>
        <Button onClick={() => navigate('/tests/create')}>
          <Plus className="h-4 w-4" /> Create Test
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div className="content-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="text-left px-4 py-3">Code</th>
                <th className="text-left px-4 py-3">Test Name</th>
                <th className="text-left px-4 py-3">Department</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Specimen</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-center px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((test) => (
                <tr key={test.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-primary">{test.code}</td>
                  <td className="px-4 py-3 text-sm font-medium">{test.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{test.department}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{test.category}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{test.specimen}</td>
                  <td className="px-4 py-3 text-sm font-medium">₹{test.price}</td>
                  <td className="px-4 py-3"><StatusBadge status={test.status} /></td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => navigate(`/tests/${test.id}/edit`)} className="p-1 hover:bg-muted rounded">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button onClick={() => navigate(`/tests/${test.id}/edit`)} className="p-1 hover:bg-muted rounded">
                        <Eye className="h-4 w-4 text-muted-foreground" />
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

export default TestsList;
