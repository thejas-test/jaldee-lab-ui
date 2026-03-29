import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/StatusBadge';
import { orders, labTests } from '@/data/mockData';
import { toast } from 'sonner';

const ResultEntry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === id);

  const [results, setResults] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');
  const [interpretation, setInterpretation] = useState('');

  if (!order) return <div className="p-6">Order not found</div>;

  const handleResultChange = (key: string, value: string) => {
    setResults({ ...results, [key]: value });
  };

  const handleSave = () => {
    toast.success('Results saved successfully');
    navigate(`/orders/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/orders/${id}`)} className="p-2 hover:bg-muted rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="page-title">Result Entry - {order.orderId}</h1>
          <p className="page-subtitle">{order.patient.name} · {order.patient.uhid}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info('Draft saved')}>Save Draft</Button>
          <Button onClick={handleSave}><Save className="h-4 w-4" /> Submit Results</Button>
        </div>
      </div>

      {/* Sample metadata */}
      <div className="content-card p-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm">
          <div><span className="text-muted-foreground">Patient:</span> <span className="font-medium">{order.patient.name}</span></div>
          <div><span className="text-muted-foreground">Order:</span> <span className="font-medium">{order.orderId}</span></div>
          <div><span className="text-muted-foreground">Specimen:</span> <span className="font-medium">Serum</span></div>
          <div><span className="text-muted-foreground">Collected:</span> <span className="font-medium">{order.collectedAt || 'Pending'}</span></div>
          <div><span className="text-muted-foreground">Technician:</span> <span className="font-medium">{order.collectedBy || 'Unassigned'}</span></div>
          <div><span className="text-muted-foreground">Progress:</span> <span className="font-medium">0/{order.tests.length} tests</span></div>
        </div>
      </div>

      {/* Results for each test */}
      {order.tests.map((test) => {
        const testDef = labTests.find((t) => t.id === test.testId);
        if (!testDef) return null;

        return (
          <div key={test.id} className="content-card overflow-hidden">
            <div className="px-4 py-3 border-b bg-muted/30 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">{test.testName}</h3>
                <p className="text-xs text-muted-foreground">{test.testCode} · {test.department}</p>
              </div>
              <StatusBadge status={test.status} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left px-4 py-2">Component</th>
                    <th className="text-left px-4 py-2">Value</th>
                    <th className="text-left px-4 py-2">Unit</th>
                    <th className="text-left px-4 py-2">Reference Range</th>
                    <th className="text-left px-4 py-2">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {testDef.components.map((comp) => {
                    const existingResult = test.results?.find((r) => r.componentName === comp.name);
                    const key = `${test.id}-${comp.id}`;
                    const currentValue = results[key] || existingResult?.value || '';

                    let flag = '';
                    if (comp.type === 'Numeric' && currentValue) {
                      const numVal = parseFloat(currentValue);
                      if (comp.normalMin !== undefined && comp.normalMax !== undefined) {
                        if (numVal < comp.normalMin) flag = 'Low';
                        else if (numVal > comp.normalMax) flag = 'High';
                        else flag = 'Normal';
                      }
                    }

                    const refRange = comp.type === 'Numeric' && comp.normalMin !== undefined
                      ? `${comp.normalMin} - ${comp.normalMax}`
                      : comp.type === 'Formula' ? 'Calculated' : '-';

                    return (
                      <tr key={comp.id} className="border-b last:border-0">
                        <td className="px-4 py-2 text-sm font-medium">{comp.name}</td>
                        <td className="px-4 py-2">
                          {comp.type === 'Numeric' && (
                            <input
                              type="number"
                              value={currentValue}
                              onChange={(e) => handleResultChange(key, e.target.value)}
                              className="w-24 px-2 py-1 text-sm border rounded bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="Enter"
                            />
                          )}
                          {comp.type === 'Dropdown' && (
                            <select
                              value={currentValue}
                              onChange={(e) => handleResultChange(key, e.target.value)}
                              className="w-40 px-2 py-1 text-sm border rounded bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="">Select</option>
                              {comp.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          )}
                          {comp.type === 'Formula' && (
                            <span className="text-sm text-muted-foreground italic">{currentValue || 'Auto-calculated'}</span>
                          )}
                          {comp.type === 'File' && (
                            <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                              <Upload className="h-3 w-3" /> Upload File
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">{comp.unit || '-'}</td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">{refRange}</td>
                        <td className="px-4 py-2">
                          {flag && (
                            <span className={`text-xs font-medium ${
                              flag === 'Normal' ? 'text-success' :
                              flag === 'High' ? 'text-destructive' :
                              flag === 'Low' ? 'text-info' : ''
                            }`}>{flag}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {/* Notes & Interpretation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="content-card p-4">
          <h3 className="text-sm font-semibold mb-2">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            placeholder="Add notes..."
          />
        </div>
        <div className="content-card p-4">
          <h3 className="text-sm font-semibold mb-2">Interpretation / Narrative</h3>
          <textarea
            value={interpretation}
            onChange={(e) => setInterpretation(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            placeholder="Add clinical interpretation..."
          />
        </div>
      </div>
    </div>
  );
};

export default ResultEntry;
