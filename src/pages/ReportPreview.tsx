import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, Share2, Send, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { orders } from '@/data/mockData';
import { toast } from 'sonner';

const reportLayouts = [
  { id: 'standard', name: 'Standard Report', description: 'Default lab report layout' },
  { id: 'compact', name: 'Compact Report', description: 'Minimalist single page' },
  { id: 'detailed', name: 'Detailed Report', description: 'With interpretation & charts' },
  { id: 'letterhead', name: 'Letterhead Report', description: 'With hospital letterhead' },
];

const ReportPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === id);
  const [selectedLayout, setSelectedLayout] = useState('standard');
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState(order?.patient.email || '');
  const [recipientPhone, setRecipientPhone] = useState(order?.patient.phone || '');

  if (!order) return <div className="p-6">Order not found</div>;

  const handlePublish = () => {
    toast.success('Report published successfully!');
    navigate(`/orders/${id}`);
  };

  if (showLayoutPicker) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowLayoutPicker(false)} className="p-2 hover:bg-muted rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="page-title">Select Report Layout</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportLayouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => { setSelectedLayout(layout.id); setShowLayoutPicker(false); }}
              className={`content-card p-4 text-left transition-all ${
                selectedLayout === layout.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
              }`}
            >
              <div className="h-32 bg-muted rounded-lg mb-3 flex items-center justify-center">
                <Layout className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold">{layout.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{layout.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/orders/${id}`)} className="p-2 hover:bg-muted rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="page-title">Report Preview - {order.orderId}</h1>
          <p className="page-subtitle">{order.patient.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info('Printing...')}><Printer className="h-4 w-4" /></Button>
          <Button variant="outline" size="sm" onClick={() => toast.info('Report shared')}><Share2 className="h-4 w-4" /></Button>
          <Button variant="outline" size="sm" onClick={() => toast.info('Downloaded')}><Download className="h-4 w-4" /></Button>
          <Button onClick={handlePublish}><Send className="h-4 w-4" /> Publish Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Preview */}
        <div className="lg:col-span-2">
          <div className="content-card p-8">
            {/* Mock Report */}
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Header */}
              <div className="text-center border-b pb-4">
                <h2 className="text-lg font-bold text-foreground">Global Care Hospital</h2>
                <p className="text-xs text-muted-foreground">Thrissur, Kerala | Ph: +91 487 2000000</p>
                <p className="text-sm font-semibold mt-2 text-primary">LABORATORY REPORT</p>
              </div>

              {/* Patient details */}
              <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                <div className="space-y-1">
                  <p><span className="text-muted-foreground">Patient:</span> <span className="font-medium">{order.patient.name}</span></p>
                  <p><span className="text-muted-foreground">Age/Gender:</span> <span className="font-medium">{order.patient.age} / {order.patient.gender}</span></p>
                  <p><span className="text-muted-foreground">UHID:</span> <span className="font-medium">{order.patient.uhid}</span></p>
                </div>
                <div className="space-y-1">
                  <p><span className="text-muted-foreground">Order ID:</span> <span className="font-medium">{order.orderId}</span></p>
                  <p><span className="text-muted-foreground">Date:</span> <span className="font-medium">{order.createdAt}</span></p>
                  <p><span className="text-muted-foreground">Ref. Doctor:</span> <span className="font-medium">{order.referringDoctor}</span></p>
                </div>
              </div>

              {/* Results */}
              {order.tests.map((test) => (
                <div key={test.id}>
                  <h3 className="text-sm font-semibold mb-2 text-foreground">{test.testName}</h3>
                  {test.results && test.results.length > 0 ? (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-1 font-medium text-muted-foreground">Parameter</th>
                          <th className="text-left py-1 font-medium text-muted-foreground">Result</th>
                          <th className="text-left py-1 font-medium text-muted-foreground">Unit</th>
                          <th className="text-left py-1 font-medium text-muted-foreground">Reference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {test.results.map((r, idx) => (
                          <tr key={idx} className="border-b last:border-0">
                            <td className="py-1.5">{r.componentName}</td>
                            <td className={`py-1.5 font-medium ${r.flag === 'High' || r.flag === 'Critical' ? 'text-destructive' : r.flag === 'Low' ? 'text-info' : ''}`}>
                              {r.value} {r.flag && r.flag !== 'Normal' && r.flag !== '' ? `(${r.flag})` : ''}
                            </td>
                            <td className="py-1.5 text-muted-foreground">{r.unit}</td>
                            <td className="py-1.5 text-muted-foreground">{r.referenceRange}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-sm text-muted-foreground">Results pending</p>
                  )}
                </div>
              ))}

              {/* Footer */}
              <div className="border-t pt-4 mt-8">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Verified by</p>
                    <p className="font-medium mt-4">___________________</p>
                    <p className="text-xs text-muted-foreground">Pathologist</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Authorized by</p>
                    <p className="font-medium mt-4">___________________</p>
                    <p className="text-xs text-muted-foreground">Lab Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="space-y-4">
          {/* Layout selection */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold mb-3">Report Layout</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {reportLayouts.find((l) => l.id === selectedLayout)?.name}
            </p>
            <Button variant="outline" size="sm" onClick={() => setShowLayoutPicker(true)}>
              <Layout className="h-4 w-4" /> Change Layout
            </Button>
          </div>

          {/* Recipients */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold mb-3">Recipient Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Phone (WhatsApp)</label>
                <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;
