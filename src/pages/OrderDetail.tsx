import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, Edit, Barcode, Clock, User, Stethoscope, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/StatusBadge';
import OrderTimeline from '@/components/shared/OrderTimeline';
import { orders, type OrderStatus } from '@/data/mockData';
import { toast } from 'sonner';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === id);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.status || 'Order Confirmed');

  if (!order) {
    return <div className="p-6">Order not found</div>;
  }

  const handleAdvanceStatus = () => {
    const flow: OrderStatus[] = ['Order Confirmed', 'Sample Collected', 'In Processing', 'Result Entered', 'Validated', 'Report Published'];
    const idx = flow.indexOf(currentStatus);
    if (idx < flow.length - 1) {
      setCurrentStatus(flow[idx + 1]);
      toast.success(`Status updated to: ${flow[idx + 1]}`);
    }
  };

  const getActionButton = () => {
    switch (currentStatus) {
      case 'Order Confirmed': return <Button onClick={handleAdvanceStatus}>Collect Sample</Button>;
      case 'Sample Collected': return <Button onClick={() => navigate(`/orders/${id}/result-entry`)}>Enter Results</Button>;
      case 'In Processing': return <Button onClick={() => navigate(`/orders/${id}/result-entry`)}>Enter Results</Button>;
      case 'Result Entered': return <Button onClick={() => navigate(`/orders/${id}/validate`)}>Validate Results</Button>;
      case 'Validated': return <Button onClick={() => navigate(`/orders/${id}/report`)}>Preview Report</Button>;
      case 'Report Published': return <Button variant="outline" onClick={() => toast.info('Report downloaded')}>Download Report</Button>;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/orders')} className="p-2 hover:bg-muted rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="page-title">{order.orderId}</h1>
            <StatusBadge status={currentStatus} size="md" />
            <StatusBadge status={order.priority} />
          </div>
          <p className="page-subtitle">Created {order.createdAt} by {order.createdBy}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Printer className="h-4 w-4" /></Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button>
          {getActionButton()}
        </div>
      </div>

      {/* Notes banner */}
      {order.notes && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 flex items-start gap-2">
          <FileText className="h-4 w-4 text-warning shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">{order.notes}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Order info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Patient Summary */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Patient Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div><p className="text-xs text-muted-foreground">Patient Name</p><p className="text-sm font-medium">{order.patient.name}</p></div>
              <div><p className="text-xs text-muted-foreground">UHID</p><p className="text-sm font-medium">{order.patient.uhid}</p></div>
              <div><p className="text-xs text-muted-foreground">Age / Gender</p><p className="text-sm font-medium">{order.patient.age} / {order.patient.gender}</p></div>
              <div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium">{order.patient.phone}</p></div>
            </div>
          </div>

          {/* Sample Info */}
          {order.sampleId && (
            <div className="content-card p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Barcode className="h-4 w-4 text-primary" />
                Sample Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div><p className="text-xs text-muted-foreground">Sample ID</p><p className="text-sm font-medium">{order.sampleId}</p></div>
                <div><p className="text-xs text-muted-foreground">Collected At</p><p className="text-sm font-medium">{order.collectedAt}</p></div>
                <div><p className="text-xs text-muted-foreground">Collected By</p><p className="text-sm font-medium">{order.collectedBy}</p></div>
                <div><p className="text-xs text-muted-foreground">Barcode</p><div className="flex items-center gap-1"><Barcode className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-mono">{order.sampleId}</span></div></div>
              </div>
            </div>
          )}

          {/* Referring Doctor */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-primary" />
              Referring Doctor
            </h3>
            <p className="text-sm font-medium">{order.referringDoctor}</p>
          </div>

          {/* Tests */}
          <div className="content-card overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-foreground">Tests ({order.tests.length})</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="text-left px-4 py-2">Test</th>
                  <th className="text-left px-4 py-2">Code</th>
                  <th className="text-left px-4 py-2">Department</th>
                  <th className="text-left px-4 py-2">Specimen</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-right px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.tests.map((test) => (
                  <tr key={test.id} className="border-b last:border-0">
                    <td className="px-4 py-3 text-sm font-medium">{test.testName}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{test.testCode}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{test.department}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{test.specimen}</td>
                    <td className="px-4 py-3"><StatusBadge status={test.status} /></td>
                    <td className="px-4 py-3 text-sm text-right font-medium">₹{test.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Summary */}
          <div className="content-card p-4">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total</span><span>₹{order.totalAmount}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Discount</span><span>-₹{order.discount}</span></div>
                <div className="border-t pt-2 flex justify-between text-sm font-semibold"><span>Net Amount</span><span className="text-primary">₹{order.netAmount}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Paid</span><span className="text-success">₹{order.paidAmount}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="space-y-4">
          <div className="content-card p-4 sticky top-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Order Log
            </h3>
            <OrderTimeline currentStatus={currentStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
