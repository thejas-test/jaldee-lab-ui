import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { labTests, type LabTest, type TestComponent } from '@/data/mockData';
import { toast } from 'sonner';

const emptyTest: LabTest = {
  id: '', code: '', name: '', abbreviation: '', department: '', category: '', subCategory: '',
  specimen: '', containerType: '', shelfLife: '', collectionInstruction: '',
  price: 0, mrp: 0, tax: 5, hsnCode: '', clinicalDescription: '', labels: [],
  components: [], status: 'Active',
};

const CreateEditTest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const existing = id ? labTests.find((t) => t.id === id) : null;
  const [test, setTest] = useState<LabTest>(existing || { ...emptyTest, id: `T${Date.now()}` });
  const [activeTab, setActiveTab] = useState<'details' | 'specimen' | 'pricing' | 'components'>('details');

  const updateField = (field: keyof LabTest, value: any) => {
    setTest({ ...test, [field]: value });
  };

  const handleSave = () => {
    toast.success(id ? 'Test updated successfully' : 'Test created successfully');
    navigate('/tests');
  };

  const addComponent = () => {
    const newComp: TestComponent = {
      id: `C${Date.now()}`, name: '', type: 'Numeric', unit: '', showInReport: true,
    };
    setTest({ ...test, components: [...test.components, newComp] });
  };

  const updateComponent = (idx: number, field: keyof TestComponent, value: any) => {
    const updated = [...test.components];
    (updated[idx] as any)[field] = value;
    setTest({ ...test, components: updated });
  };

  const removeComponent = (idx: number) => {
    setTest({ ...test, components: test.components.filter((_, i) => i !== idx) });
  };

  const tabs = [
    { key: 'details', label: 'Test Details' },
    { key: 'specimen', label: 'Specimen & Processing' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'components', label: 'Result Components' },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/tests')} className="p-2 hover:bg-muted rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="page-title">{id ? 'Edit Test' : 'Create Test'}</h1>
        </div>
        <Button onClick={handleSave}><Save className="h-4 w-4" /> Save Test</Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'details' && (
        <div className="content-card p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="text-xs text-muted-foreground block mb-1">Test Name *</label>
              <input value={test.name} onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Abbreviation</label>
              <input value={test.abbreviation} onChange={(e) => updateField('abbreviation', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Test Code *</label>
              <input value={test.code} onChange={(e) => updateField('code', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="text-xs text-muted-foreground block mb-1">Department</label>
              <select value={test.department} onChange={(e) => updateField('department', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary">
                <option>Hematology</option><option>Biochemistry</option><option>Immunology</option><option>Clinical Pathology</option><option>Microbiology</option>
              </select></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Category</label>
              <select value={test.category} onChange={(e) => updateField('category', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary">
                <option>Routine</option><option>Special</option><option>Super Special</option>
              </select></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Sub Category</label>
              <input value={test.subCategory} onChange={(e) => updateField('subCategory', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          </div>
          <div><label className="text-xs text-muted-foreground block mb-1">Clinical Description</label>
            <textarea value={test.clinicalDescription} onChange={(e) => updateField('clinicalDescription', e.target.value)}
              rows={3} className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary resize-none" /></div>
          <div><label className="text-xs text-muted-foreground block mb-1">Labels</label>
            <input value={test.labels.join(', ')} onChange={(e) => updateField('labels', e.target.value.split(',').map(s => s.trim()))}
              placeholder="Comma-separated labels" className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        </div>
      )}

      {activeTab === 'specimen' && (
        <div className="content-card p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="text-xs text-muted-foreground block mb-1">Specimen Type</label>
              <select value={test.specimen} onChange={(e) => updateField('specimen', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary">
                <option>Whole Blood</option><option>Serum</option><option>Plasma</option><option>Urine</option><option>Stool</option><option>CSF</option>
              </select></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Container Type</label>
              <input value={test.containerType} onChange={(e) => updateField('containerType', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Shelf Life</label>
              <input value={test.shelfLife} onChange={(e) => updateField('shelfLife', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          </div>
          <div><label className="text-xs text-muted-foreground block mb-1">Collection Instructions</label>
            <textarea value={test.collectionInstruction} onChange={(e) => updateField('collectionInstruction', e.target.value)}
              rows={3} className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary resize-none" /></div>
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="content-card p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div><label className="text-xs text-muted-foreground block mb-1">Price (₹)</label>
              <input type="number" value={test.price} onChange={(e) => updateField('price', Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="text-xs text-muted-foreground block mb-1">MRP (₹)</label>
              <input type="number" value={test.mrp} onChange={(e) => updateField('mrp', Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Tax (%)</label>
              <input type="number" value={test.tax} onChange={(e) => updateField('tax', Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="text-xs text-muted-foreground block mb-1">HSN Code</label>
              <input value={test.hsnCode} onChange={(e) => updateField('hsnCode', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          </div>
        </div>
      )}

      {activeTab === 'components' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{test.components.length} components</p>
            <Button variant="outline" size="sm" onClick={addComponent}><Plus className="h-4 w-4" /> Add Component</Button>
          </div>

          {test.components.map((comp, idx) => (
            <div key={comp.id} className="content-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Component {idx + 1}</h4>
                <button onClick={() => removeComponent(idx)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div><label className="text-xs text-muted-foreground block mb-1">Name</label>
                  <input value={comp.name} onChange={(e) => updateComponent(idx, 'name', e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div><label className="text-xs text-muted-foreground block mb-1">Type</label>
                  <select value={comp.type} onChange={(e) => updateComponent(idx, 'type', e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Numeric</option><option>Dropdown</option><option>Formula</option><option>File</option>
                  </select></div>
                <div><label className="text-xs text-muted-foreground block mb-1">Unit</label>
                  <input value={comp.unit || ''} onChange={(e) => updateComponent(idx, 'unit', e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={comp.showInReport} onChange={(e) => updateComponent(idx, 'showInReport', e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary" />
                    Show in Report
                  </label>
                </div>
              </div>

              {/* Type-specific fields */}
              {comp.type === 'Numeric' && (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  <div><label className="text-xs text-muted-foreground block mb-1">Normal Min</label>
                    <input type="number" value={comp.normalMin ?? ''} onChange={(e) => updateComponent(idx, 'normalMin', Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-sm border rounded bg-card" /></div>
                  <div><label className="text-xs text-muted-foreground block mb-1">Normal Max</label>
                    <input type="number" value={comp.normalMax ?? ''} onChange={(e) => updateComponent(idx, 'normalMax', Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-sm border rounded bg-card" /></div>
                  <div><label className="text-xs text-muted-foreground block mb-1">Low Min</label>
                    <input type="number" value={comp.lowMin ?? ''} onChange={(e) => updateComponent(idx, 'lowMin', Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-sm border rounded bg-card" /></div>
                  <div><label className="text-xs text-muted-foreground block mb-1">Low Max</label>
                    <input type="number" value={comp.lowMax ?? ''} onChange={(e) => updateComponent(idx, 'lowMax', Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-sm border rounded bg-card" /></div>
                  <div><label className="text-xs text-muted-foreground block mb-1">High Min</label>
                    <input type="number" value={comp.highMin ?? ''} onChange={(e) => updateComponent(idx, 'highMin', Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-sm border rounded bg-card" /></div>
                  <div><label className="text-xs text-muted-foreground block mb-1">High Max</label>
                    <input type="number" value={comp.highMax ?? ''} onChange={(e) => updateComponent(idx, 'highMax', Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-sm border rounded bg-card" /></div>
                </div>
              )}

              {comp.type === 'Dropdown' && (
                <div><label className="text-xs text-muted-foreground block mb-1">Options (comma-separated)</label>
                  <input value={comp.options?.join(', ') || ''} onChange={(e) => updateComponent(idx, 'options', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
              )}

              {comp.type === 'Formula' && (
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Formula Expression</label>
                  <input value={comp.formula || ''} onChange={(e) => updateComponent(idx, 'formula', e.target.value)}
                    placeholder="e.g., Triglycerides / 5"
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary font-mono" />
                  <p className="text-xs text-muted-foreground mt-1">Available: {test.components.filter(c => c.type === 'Numeric').map(c => c.name).join(', ') || 'No numeric components yet'}</p>
                </div>
              )}

              {comp.type === 'File' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><label className="text-xs text-muted-foreground block mb-1">Allowed File Types</label>
                    <input value={comp.allowedFileTypes?.join(', ') || 'jpg, png, pdf'} onChange={(e) => updateComponent(idx, 'allowedFileTypes', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                  <div><label className="text-xs text-muted-foreground block mb-1">Max File Size (MB)</label>
                    <input type="number" value={comp.maxFileSize || 5} onChange={(e) => updateComponent(idx, 'maxFileSize', Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border rounded-lg bg-card focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateEditTest;
