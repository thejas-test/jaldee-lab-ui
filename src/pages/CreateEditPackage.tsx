import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { testPackages, labTests, type TestPackage } from '@/data/mockData';
import { toast } from 'sonner';

const emptyPackage: TestPackage = {
  id: '', name: '', code: '', tests: [], price: 0, mrp: 0, tax: 5, finalPrice: 0, status: 'Active',
};

const CreateEditPackage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const existing = id ? testPackages.find((p) => p.id === id) : null;
  const [pkg, setPkg] = useState<TestPackage>(existing || { ...emptyPackage, id: `PKG${Date.now()}` });
  const [testSearch, setTestSearch] = useState('');

  const filteredTests = labTests.filter((t) =>
    (t.name.toLowerCase().includes(testSearch.toLowerCase()) || t.code.toLowerCase().includes(testSearch.toLowerCase())) &&
    !pkg.tests.find((pt) => pt.testId === t.id)
  );

  const addTest = (test: typeof labTests[0]) => {
    const updated = {
      ...pkg,
      tests: [...pkg.tests, { testId: test.id, testName: test.name, testCode: test.code }],
    };
    const totalPrice = updated.tests.reduce((sum, t) => {
      const found = labTests.find((lt) => lt.id === t.testId);
      return sum + (found?.price || 0);
    }, 0);
    updated.price = totalPrice;
    updated.mrp = Math.round(totalPrice * 1.2);
    updated.finalPrice = totalPrice + totalPrice * (pkg.tax / 100);
    setPkg(updated);
    setTestSearch('');
  };

  const removeTest = (testId: string) => {
    const updated = { ...pkg, tests: pkg.tests.filter((t) => t.testId !== testId) };
    const totalPrice = updated.tests.reduce((sum, t) => {
      const found = labTests.find((lt) => lt.id === t.testId);
      return sum + (found?.price || 0);
    }, 0);
    updated.price = totalPrice;
    updated.mrp = Math.round(totalPrice * 1.2);
    updated.finalPrice = totalPrice + totalPrice * (pkg.tax / 100);
    setPkg(updated);
  };

  const handleSave = () => {
    toast.success(id ? 'Package updated' : 'Package created');
    navigate('/test-packages');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/test-packages')} className="p-2 hover:bg-muted rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="page-title">{id ? 'Edit Package' : 'Create Package'}</h1>
        </div>
        <Button onClick={handleSave}><Save className="h-4 w-4" /> Save Package</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="content-card p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-xs text-muted-foreground block mb-1">Package Name *</label>
                <input value={pkg.name} onChange={(e) => setPkg({ ...pkg, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
              <div><label className="text-xs text-muted-foreground block mb-1">Package Code *</label>
                <input value={pkg.code} onChange={(e) => setPkg({ ...pkg, code: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            </div>
          </div>

          {/* Add tests */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold mb-3">Included Tests</h3>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search and add tests..."
                value={testSearch}
                onChange={(e) => setTestSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {testSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
                  {filteredTests.map((t) => (
                    <button key={t.id} className="w-full text-left px-4 py-2 hover:bg-muted text-sm flex justify-between" onClick={() => addTest(t)}>
                      <span>{t.name} ({t.code})</span>
                      <span className="text-muted-foreground">₹{t.price}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {pkg.tests.length > 0 ? (
              <div className="space-y-2">
                {pkg.tests.map((t) => {
                  const testDef = labTests.find((lt) => lt.id === t.testId);
                  return (
                    <div key={t.testId} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{t.testName}</p>
                        <p className="text-xs text-muted-foreground">{t.testCode} · {testDef?.department}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">₹{testDef?.price}</span>
                        <button onClick={() => removeTest(t.testId)} className="text-muted-foreground hover:text-destructive">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No tests added yet</p>
            )}
          </div>
        </div>

        {/* Pricing summary */}
        <div className="content-card p-4 h-fit sticky top-6">
          <h3 className="text-sm font-semibold mb-4">Pricing</h3>
          <div className="space-y-3">
            <div><label className="text-xs text-muted-foreground block mb-1">Price (₹)</label>
              <input type="number" value={pkg.price} onChange={(e) => setPkg({ ...pkg, price: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="text-xs text-muted-foreground block mb-1">MRP (₹)</label>
              <input type="number" value={pkg.mrp} onChange={(e) => setPkg({ ...pkg, mrp: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Tax (%)</label>
              <input type="number" value={pkg.tax} onChange={(e) => setPkg({ ...pkg, tax: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-sm font-semibold">
                <span>Final Price</span>
                <span className="text-primary">₹{pkg.finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditPackage;
