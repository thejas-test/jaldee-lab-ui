import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, X, User, Calendar, FileText, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { patients, labTests, testPackages } from '@/data/mockData';
import { toast } from 'sonner';

const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [selectedTests, setSelectedTests] = useState<typeof labTests>([]);
  const [testSearch, setTestSearch] = useState('');
  const [patientSearch, setPatientSearch] = useState('');
  const [showPatientSearch, setShowPatientSearch] = useState(false);
  const [notes, setNotes] = useState('');
  const [referringDoctor, setReferringDoctor] = useState('Dr. Anil Gupta');
  const [technician, setTechnician] = useState('John Smith');
  const [discount, setDiscount] = useState(0);

  const filteredTests = labTests.filter((t) =>
    t.name.toLowerCase().includes(testSearch.toLowerCase()) ||
    t.code.toLowerCase().includes(testSearch.toLowerCase())
  );

  const totalAmount = selectedTests.reduce((sum, t) => sum + t.price, 0);
  const taxAmount = totalAmount * 0.05;
  const netAmount = totalAmount + taxAmount - discount;

  const addTest = (test: typeof labTests[0]) => {
    if (!selectedTests.find((t) => t.id === test.id)) {
      setSelectedTests([...selectedTests, test]);
    }
    setTestSearch('');
  };

  const removeTest = (testId: string) => {
    setSelectedTests(selectedTests.filter((t) => t.id !== testId));
  };

  const handleConfirmOrder = () => {
    toast.success('Order created successfully!', { description: 'Order ID: ORD-2024-007' });
    navigate('/orders');
  };

  return (
    <div className="space-y-4">
      <div className="page-header">
        <div>
          <h1 className="page-title">Create Order</h1>
          <p className="page-subtitle">Create a new lab order</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Order details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Patient Details */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Patient Details
            </h3>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search patient by name, phone, or UHID..."
                value={patientSearch}
                onChange={(e) => { setPatientSearch(e.target.value); setShowPatientSearch(true); }}
                onFocus={() => setShowPatientSearch(true)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {showPatientSearch && patientSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
                  {patients.filter((p) => p.name.toLowerCase().includes(patientSearch.toLowerCase()) || p.uhid.includes(patientSearch)).map((p) => (
                    <button
                      key={p.id}
                      className="w-full text-left px-4 py-2 hover:bg-muted text-sm"
                      onClick={() => { setSelectedPatient(p); setShowPatientSearch(false); setPatientSearch(''); }}
                    >
                      <span className="font-medium">{p.name}</span>
                      <span className="text-muted-foreground ml-2">({p.uhid})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedPatient && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-muted/50 rounded-lg">
                <div><p className="text-xs text-muted-foreground">Name</p><p className="text-sm font-medium">{selectedPatient.name}</p></div>
                <div><p className="text-xs text-muted-foreground">UHID</p><p className="text-sm font-medium">{selectedPatient.uhid}</p></div>
                <div><p className="text-xs text-muted-foreground">Age / Gender</p><p className="text-sm font-medium">{selectedPatient.age} / {selectedPatient.gender}</p></div>
                <div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium">{selectedPatient.phone}</p></div>
              </div>
            )}
          </div>

          {/* Doctor & Technician */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-primary" />
              Referral & Assignment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Referring Doctor</label>
                <input
                  type="text"
                  value={referringDoctor}
                  onChange={(e) => setReferringDoctor(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Assign Technician</label>
                <select
                  value={technician}
                  onChange={(e) => setTechnician(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option>John Smith</option>
                  <option>Sarah Johnson</option>
                  <option>Mike Wilson</option>
                  <option>Emily Davis</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Notes / Instructions
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions..."
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Test Selection */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Add Tests</h3>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tests by name or code..."
                value={testSearch}
                onChange={(e) => setTestSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {testSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
                  {filteredTests.map((t) => (
                    <button
                      key={t.id}
                      className="w-full text-left px-4 py-2 hover:bg-muted text-sm flex justify-between"
                      onClick={() => addTest(t)}
                    >
                      <span><span className="font-medium">{t.name}</span> <span className="text-muted-foreground">({t.code})</span></span>
                      <span className="text-muted-foreground">₹{t.price}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected tests */}
            {selectedTests.length > 0 && (
              <div className="space-y-2">
                {selectedTests.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.department} · {t.specimen}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">₹{t.price}</span>
                      <button onClick={() => removeTest(t.id)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Financial Summary */}
        <div className="space-y-4">
          <div className="content-card p-4 sticky top-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Order Summary</h3>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tests ({selectedTests.length})</span>
                <span className="font-medium">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (5%)</span>
                <span className="font-medium">₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-muted-foreground">Discount</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-20 text-right px-2 py-1 text-sm border rounded bg-card"
                />
              </div>
              <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                <span>Net Amount</span>
                <span className="text-primary">₹{netAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full" onClick={handleConfirmOrder} disabled={selectedTests.length === 0}>
                Confirm Order
              </Button>
              <Button variant="outline" className="w-full" onClick={() => toast.info('Invoice generated')}>
                Generate Invoice
              </Button>
            </div>
          </div>

          {/* Billing date */}
          <div className="content-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Billing Date
            </h3>
            <input
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 text-sm rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
