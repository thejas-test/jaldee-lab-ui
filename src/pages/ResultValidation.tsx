import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Shield, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/StatusBadge';
import { orders } from '@/data/mockData';
import { toast } from 'sonner';

const ResultValidation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === id);
  const [validationNotes, setValidationNotes] = useState('');
  const [checklist, setChecklist] = useState({
    sampleIntegrity: false,
    qcPassed: false,
    resultsReviewed: false,
    abnormalsVerified: false,
    clinicalCorrelation: false,
  });

  if (!order) return <div className="p-6">Order not found</div>;

  const allChecked = Object.values(checklist).every(Boolean);

  const handleApprove = () => {
    toast.success('Results validated and approved');
    navigate(`/orders/${id}`);
  };

  const handleReject = () => {
    toast.error('Results rejected and returned for re-entry');
    navigate(`/orders/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/orders/${id}`)} className="p-2 hover:bg-muted rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="page-title">Result Validation - {order.orderId}</h1>
          <p className="page-subtitle">{order.patient.name} · {order.patient.uhid}</p>
        </div>
      </div>

      {/* Patient & Order Info */}
      <div className="content-card p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div><span className="text-muted-foreground">Patient:</span> <span className="font-medium">{order.patient.name}</span></div>
          <div><span className="text-muted-foreground">Age/Gender:</span> <span className="font-medium">{order.patient.age} / {order.patient.gender}</span></div>
          <div><span className="text-muted-foreground">Referring Dr:</span> <span className="font-medium">{order.referringDoctor}</span></div>
          <div><span className="text-muted-foreground">Sample:</span> <span className="font-medium">{order.sampleId || 'N/A'}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Results table */}
        <div className="lg:col-span-2 space-y-4">
          {order.tests.map((test) => (
            <div key={test.id} className="content-card overflow-hidden">
              <div className="px-4 py-3 border-b bg-muted/30">
                <h3 className="text-sm font-semibold">{test.testName} ({test.testCode})</h3>
              </div>
              {test.results && test.results.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="table-header">
                      <th className="text-left px-4 py-2">Component</th>
                      <th className="text-left px-4 py-2">Value</th>
                      <th className="text-left px-4 py-2">Unit</th>
                      <th className="text-left px-4 py-2">Reference</th>
                      <th className="text-left px-4 py-2">Flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {test.results.map((result, idx) => (
                      <tr key={idx} className={`border-b last:border-0 ${result.flag === 'High' || result.flag === 'Low' || result.flag === 'Critical' ? 'bg-destructive/5' : ''}`}>
                        <td className="px-4 py-2 text-sm font-medium">{result.componentName}</td>
                        <td className={`px-4 py-2 text-sm font-medium ${result.flag === 'High' || result.flag === 'Critical' ? 'text-destructive' : result.flag === 'Low' ? 'text-info' : ''}`}>
                          {result.value}
                        </td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">{result.unit}</td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">{result.referenceRange}</td>
                        <td className="px-4 py-2">
                          {result.flag && (
                            <span className={`text-xs font-medium flex items-center gap-1 ${
                              result.flag === 'Normal' ? 'text-success' :
                              result.flag === 'High' ? 'text-destructive' :
                              result.flag === 'Low' ? 'text-info' :
                              result.flag === 'Critical' ? 'text-destructive' : ''
                            }`}>
                              {(result.flag === 'High' || result.flag === 'Critical') && <AlertTriangle className="h-3 w-3" />}
                              {result.flag}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">No results entered yet</div>
              )}
            </div>
          ))}

          {/* Validation Notes */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold mb-2">Validation Notes</h3>
            <textarea
              value={validationNotes}
              onChange={(e) => setValidationNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              placeholder="Add validation notes or comments..."
            />
          </div>
        </div>

        {/* Right: Checklist & Actions */}
        <div className="space-y-4">
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              QC / Validation Checklist
            </h3>
            <div className="space-y-3">
              {[
                { key: 'sampleIntegrity', label: 'Sample integrity verified' },
                { key: 'qcPassed', label: 'QC controls within range' },
                { key: 'resultsReviewed', label: 'All results reviewed' },
                { key: 'abnormalsVerified', label: 'Abnormal values verified' },
                { key: 'clinicalCorrelation', label: 'Clinical correlation done' },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist[item.key as keyof typeof checklist]}
                    onChange={(e) => setChecklist({ ...checklist, [item.key]: e.target.checked })}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Digital Signature */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <PenLine className="h-4 w-4 text-primary" />
              Digital Signature
            </h3>
            <div className="h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-sm text-muted-foreground">
              Click to sign
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full" onClick={handleApprove} disabled={!allChecked}>
              <CheckCircle className="h-4 w-4" /> Approve Results
            </Button>
            <Button variant="destructive" className="w-full" onClick={handleReject}>
              <XCircle className="h-4 w-4" /> Reject & Return
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultValidation;
