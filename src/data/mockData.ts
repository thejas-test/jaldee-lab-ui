// Mock data for LIMS application

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  uhid: string;
}

export interface Order {
  id: string;
  orderId: string;
  patient: Patient;
  tests: TestItem[];
  status: OrderStatus;
  priority: 'Normal' | 'Urgent' | 'STAT';
  createdAt: string;
  createdBy: string;
  referringDoctor: string;
  notes: string;
  totalAmount: number;
  discount: number;
  netAmount: number;
  paidAmount: number;
  sampleId?: string;
  collectedAt?: string;
  collectedBy?: string;
}

export type OrderStatus = 'Order Confirmed' | 'Sample Collected' | 'In Processing' | 'Result Entered' | 'Validated' | 'Report Published';

export interface TestItem {
  id: string;
  testId: string;
  testName: string;
  testCode: string;
  department: string;
  category: string;
  specimen: string;
  status: string;
  price: number;
  results?: TestResult[];
}

export interface TestResult {
  componentName: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag: 'Normal' | 'High' | 'Low' | 'Critical' | '';
}

export interface LabTest {
  id: string;
  code: string;
  name: string;
  abbreviation: string;
  department: string;
  category: string;
  subCategory: string;
  specimen: string;
  containerType: string;
  shelfLife: string;
  collectionInstruction: string;
  price: number;
  mrp: number;
  tax: number;
  hsnCode: string;
  clinicalDescription: string;
  labels: string[];
  components: TestComponent[];
  status: 'Active' | 'Inactive';
}

export interface TestComponent {
  id: string;
  name: string;
  type: 'Numeric' | 'Dropdown' | 'Formula' | 'File';
  unit?: string;
  rangeType?: string;
  normalMin?: number;
  normalMax?: number;
  lowMin?: number;
  lowMax?: number;
  highMin?: number;
  highMax?: number;
  criticalMin?: number;
  criticalMax?: number;
  options?: string[];
  formula?: string;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  showInReport: boolean;
  ageVariants?: { ageFrom: number; ageTo: number; min: number; max: number }[];
  genderVariants?: { gender: string; min: number; max: number }[];
}

export interface TestPackage {
  id: string;
  name: string;
  code: string;
  tests: { testId: string; testName: string; testCode: string }[];
  price: number;
  mrp: number;
  tax: number;
  finalPrice: number;
  status: 'Active' | 'Inactive';
}

export interface Technician {
  id: string;
  name: string;
  completed: number;
  pending: number;
}

export const patients: Patient[] = [
  { id: 'P001', name: 'Rajesh Kumar', age: 45, gender: 'Male', phone: '+91 98765 43210', email: 'rajesh@email.com', uhid: 'UH-2024-001' },
  { id: 'P002', name: 'Priya Sharma', age: 32, gender: 'Female', phone: '+91 87654 32109', email: 'priya@email.com', uhid: 'UH-2024-002' },
  { id: 'P003', name: 'Amit Patel', age: 58, gender: 'Male', phone: '+91 76543 21098', email: 'amit@email.com', uhid: 'UH-2024-003' },
  { id: 'P004', name: 'Sunita Reddy', age: 41, gender: 'Female', phone: '+91 65432 10987', email: 'sunita@email.com', uhid: 'UH-2024-004' },
  { id: 'P005', name: 'Mohammed Ali', age: 52, gender: 'Male', phone: '+91 54321 09876', email: 'ali@email.com', uhid: 'UH-2024-005' },
  { id: 'P006', name: 'Ananya Nair', age: 28, gender: 'Female', phone: '+91 43210 98765', email: 'ananya@email.com', uhid: 'UH-2024-006' },
];

export const labTests: LabTest[] = [
  {
    id: 'T001', code: 'CBC', name: 'Complete Blood Count', abbreviation: 'CBC',
    department: 'Hematology', category: 'Routine', subCategory: 'Blood',
    specimen: 'Whole Blood', containerType: 'EDTA Tube', shelfLife: '24 hours',
    collectionInstruction: 'No fasting required', price: 350, mrp: 400, tax: 5, hsnCode: '998931',
    clinicalDescription: 'Complete blood count measures red blood cells, white blood cells, and platelets.',
    labels: ['Routine', 'Hematology'],
    components: [
      { id: 'C001', name: 'Hemoglobin', type: 'Numeric', unit: 'g/dL', rangeType: 'Standard', normalMin: 12, normalMax: 17.5, lowMin: 7, lowMax: 11.9, highMin: 17.6, highMax: 20, showInReport: true },
      { id: 'C002', name: 'WBC Count', type: 'Numeric', unit: 'cells/μL', rangeType: 'Standard', normalMin: 4000, normalMax: 11000, lowMin: 1000, lowMax: 3999, highMin: 11001, highMax: 30000, showInReport: true },
      { id: 'C003', name: 'Platelet Count', type: 'Numeric', unit: 'cells/μL', rangeType: 'Standard', normalMin: 150000, normalMax: 400000, lowMin: 50000, lowMax: 149999, highMin: 400001, highMax: 600000, showInReport: true },
      { id: 'C004', name: 'RBC Count', type: 'Numeric', unit: 'million/μL', rangeType: 'Standard', normalMin: 4.5, normalMax: 5.5, lowMin: 3, lowMax: 4.4, highMin: 5.6, highMax: 7, showInReport: true },
      { id: 'C005', name: 'Hematocrit', type: 'Numeric', unit: '%', rangeType: 'Standard', normalMin: 36, normalMax: 54, lowMin: 20, lowMax: 35.9, highMin: 54.1, highMax: 65, showInReport: true },
    ],
    status: 'Active',
  },
  {
    id: 'T002', code: 'FBS', name: 'Fasting Blood Sugar', abbreviation: 'FBS',
    department: 'Biochemistry', category: 'Routine', subCategory: 'Blood Sugar',
    specimen: 'Serum', containerType: 'Plain Tube', shelfLife: '48 hours',
    collectionInstruction: '8-12 hours fasting required', price: 120, mrp: 150, tax: 5, hsnCode: '998931',
    clinicalDescription: 'Measures blood glucose levels after fasting.',
    labels: ['Routine', 'Diabetes'],
    components: [
      { id: 'C006', name: 'Fasting Glucose', type: 'Numeric', unit: 'mg/dL', rangeType: 'Standard', normalMin: 70, normalMax: 100, lowMin: 40, lowMax: 69, highMin: 101, highMax: 126, criticalMin: 0, criticalMax: 39, showInReport: true },
    ],
    status: 'Active',
  },
  {
    id: 'T003', code: 'HBA1C', name: 'Glycated Hemoglobin', abbreviation: 'HbA1c',
    department: 'Biochemistry', category: 'Special', subCategory: 'Diabetes',
    specimen: 'Whole Blood', containerType: 'EDTA Tube', shelfLife: '72 hours',
    collectionInstruction: 'No fasting required', price: 550, mrp: 650, tax: 5, hsnCode: '998931',
    clinicalDescription: 'Measures average blood sugar over past 2-3 months.',
    labels: ['Special', 'Diabetes'],
    components: [
      { id: 'C007', name: 'HbA1c', type: 'Numeric', unit: '%', rangeType: 'Standard', normalMin: 4, normalMax: 5.6, lowMin: 0, lowMax: 3.9, highMin: 5.7, highMax: 6.4, criticalMin: 6.5, criticalMax: 15, showInReport: true },
    ],
    status: 'Active',
  },
  {
    id: 'T004', code: 'LFT', name: 'Liver Function Test', abbreviation: 'LFT',
    department: 'Biochemistry', category: 'Routine', subCategory: 'Liver',
    specimen: 'Serum', containerType: 'Plain Tube', shelfLife: '48 hours',
    collectionInstruction: 'No fasting required', price: 650, mrp: 750, tax: 5, hsnCode: '998931',
    clinicalDescription: 'Panel of tests to assess liver function.',
    labels: ['Routine', 'Liver'],
    components: [
      { id: 'C008', name: 'Total Bilirubin', type: 'Numeric', unit: 'mg/dL', rangeType: 'Standard', normalMin: 0.1, normalMax: 1.2, lowMin: 0, lowMax: 0.09, highMin: 1.3, highMax: 5, showInReport: true },
      { id: 'C009', name: 'SGOT (AST)', type: 'Numeric', unit: 'U/L', rangeType: 'Standard', normalMin: 5, normalMax: 40, lowMin: 0, lowMax: 4, highMin: 41, highMax: 200, showInReport: true },
      { id: 'C010', name: 'SGPT (ALT)', type: 'Numeric', unit: 'U/L', rangeType: 'Standard', normalMin: 7, normalMax: 56, lowMin: 0, lowMax: 6, highMin: 57, highMax: 200, showInReport: true },
      { id: 'C011', name: 'Alkaline Phosphatase', type: 'Numeric', unit: 'U/L', rangeType: 'Standard', normalMin: 44, normalMax: 147, lowMin: 0, lowMax: 43, highMin: 148, highMax: 500, showInReport: true },
      { id: 'C012', name: 'Total Protein', type: 'Numeric', unit: 'g/dL', rangeType: 'Standard', normalMin: 6, normalMax: 8.3, lowMin: 3, lowMax: 5.9, highMin: 8.4, highMax: 12, showInReport: true },
      { id: 'C013', name: 'Albumin', type: 'Numeric', unit: 'g/dL', rangeType: 'Standard', normalMin: 3.5, normalMax: 5.5, lowMin: 1, lowMax: 3.4, highMin: 5.6, highMax: 8, showInReport: true },
    ],
    status: 'Active',
  },
  {
    id: 'T005', code: 'TSH', name: 'Thyroid Stimulating Hormone', abbreviation: 'TSH',
    department: 'Immunology', category: 'Special', subCategory: 'Thyroid',
    specimen: 'Serum', containerType: 'Plain Tube', shelfLife: '72 hours',
    collectionInstruction: 'No fasting required. Morning sample preferred.', price: 350, mrp: 450, tax: 5, hsnCode: '998931',
    clinicalDescription: 'Measures TSH levels to evaluate thyroid function.',
    labels: ['Special', 'Thyroid'],
    components: [
      { id: 'C014', name: 'TSH', type: 'Numeric', unit: 'mIU/L', rangeType: 'Standard', normalMin: 0.4, normalMax: 4.0, lowMin: 0.01, lowMax: 0.39, highMin: 4.1, highMax: 10, criticalMin: 10.1, criticalMax: 100, showInReport: true },
    ],
    status: 'Active',
  },
  {
    id: 'T006', code: 'LIPID', name: 'Lipid Profile', abbreviation: 'Lipid',
    department: 'Biochemistry', category: 'Routine', subCategory: 'Cardiac',
    specimen: 'Serum', containerType: 'Plain Tube', shelfLife: '48 hours',
    collectionInstruction: '12 hours fasting required', price: 450, mrp: 550, tax: 5, hsnCode: '998931',
    clinicalDescription: 'Comprehensive lipid panel to assess cardiovascular risk.',
    labels: ['Routine', 'Cardiac'],
    components: [
      { id: 'C015', name: 'Total Cholesterol', type: 'Numeric', unit: 'mg/dL', rangeType: 'Standard', normalMin: 0, normalMax: 200, highMin: 201, highMax: 300, showInReport: true },
      { id: 'C016', name: 'Triglycerides', type: 'Numeric', unit: 'mg/dL', rangeType: 'Standard', normalMin: 0, normalMax: 150, highMin: 151, highMax: 500, showInReport: true },
      { id: 'C017', name: 'HDL Cholesterol', type: 'Numeric', unit: 'mg/dL', rangeType: 'Standard', normalMin: 40, normalMax: 60, lowMin: 0, lowMax: 39, highMin: 61, highMax: 100, showInReport: true },
      { id: 'C018', name: 'LDL Cholesterol', type: 'Numeric', unit: 'mg/dL', rangeType: 'Standard', normalMin: 0, normalMax: 100, highMin: 101, highMax: 300, showInReport: true },
      { id: 'C019', name: 'VLDL Cholesterol', type: 'Formula', unit: 'mg/dL', formula: 'Triglycerides / 5', showInReport: true },
      { id: 'C020', name: 'TC/HDL Ratio', type: 'Formula', unit: '', formula: 'Total Cholesterol / HDL Cholesterol', normalMin: 0, normalMax: 4.5, showInReport: true },
    ],
    status: 'Active',
  },
  {
    id: 'T007', code: 'KFT', name: 'Kidney Function Test', abbreviation: 'KFT',
    department: 'Biochemistry', category: 'Routine', subCategory: 'Kidney',
    specimen: 'Serum', containerType: 'Plain Tube', shelfLife: '48 hours',
    collectionInstruction: 'No fasting required', price: 500, mrp: 600, tax: 5, hsnCode: '998931',
    clinicalDescription: 'Panel of tests to assess kidney function.',
    labels: ['Routine', 'Kidney'],
    components: [
      { id: 'C021', name: 'Blood Urea', type: 'Numeric', unit: 'mg/dL', rangeType: 'Standard', normalMin: 7, normalMax: 20, showInReport: true },
      { id: 'C022', name: 'Creatinine', type: 'Numeric', unit: 'mg/dL', rangeType: 'Standard', normalMin: 0.6, normalMax: 1.2, showInReport: true },
      { id: 'C023', name: 'Uric Acid', type: 'Numeric', unit: 'mg/dL', rangeType: 'Standard', normalMin: 3.5, normalMax: 7.2, showInReport: true },
    ],
    status: 'Active',
  },
  {
    id: 'T008', code: 'UA', name: 'Urine Analysis', abbreviation: 'UA',
    department: 'Clinical Pathology', category: 'Routine', subCategory: 'Urine',
    specimen: 'Urine', containerType: 'Urine Container', shelfLife: '2 hours',
    collectionInstruction: 'Midstream clean-catch sample', price: 200, mrp: 250, tax: 5, hsnCode: '998931',
    clinicalDescription: 'Routine urine examination.',
    labels: ['Routine', 'Urine'],
    components: [
      { id: 'C024', name: 'Color', type: 'Dropdown', options: ['Pale Yellow', 'Yellow', 'Dark Yellow', 'Amber', 'Red', 'Brown'], showInReport: true },
      { id: 'C025', name: 'Appearance', type: 'Dropdown', options: ['Clear', 'Slightly Turbid', 'Turbid', 'Cloudy'], showInReport: true },
      { id: 'C026', name: 'pH', type: 'Numeric', unit: '', normalMin: 4.5, normalMax: 8, showInReport: true },
      { id: 'C027', name: 'Specific Gravity', type: 'Numeric', unit: '', normalMin: 1.005, normalMax: 1.030, showInReport: true },
    ],
    status: 'Active',
  },
];

export const testPackages: TestPackage[] = [
  {
    id: 'PKG001', name: 'Basic Health Checkup', code: 'BHC',
    tests: [
      { testId: 'T001', testName: 'Complete Blood Count', testCode: 'CBC' },
      { testId: 'T002', testName: 'Fasting Blood Sugar', testCode: 'FBS' },
      { testId: 'T008', testName: 'Urine Analysis', testCode: 'UA' },
    ],
    price: 670, mrp: 800, tax: 5, finalPrice: 703.5, status: 'Active',
  },
  {
    id: 'PKG002', name: 'Comprehensive Health Package', code: 'CHP',
    tests: [
      { testId: 'T001', testName: 'Complete Blood Count', testCode: 'CBC' },
      { testId: 'T002', testName: 'Fasting Blood Sugar', testCode: 'FBS' },
      { testId: 'T004', testName: 'Liver Function Test', testCode: 'LFT' },
      { testId: 'T005', testName: 'Thyroid Stimulating Hormone', testCode: 'TSH' },
      { testId: 'T006', testName: 'Lipid Profile', testCode: 'LIPID' },
      { testId: 'T007', testName: 'Kidney Function Test', testCode: 'KFT' },
    ],
    price: 2400, mrp: 3000, tax: 5, finalPrice: 2520, status: 'Active',
  },
  {
    id: 'PKG003', name: 'Diabetes Care Package', code: 'DCP',
    tests: [
      { testId: 'T002', testName: 'Fasting Blood Sugar', testCode: 'FBS' },
      { testId: 'T003', testName: 'Glycated Hemoglobin', testCode: 'HBA1C' },
      { testId: 'T007', testName: 'Kidney Function Test', testCode: 'KFT' },
    ],
    price: 1170, mrp: 1400, tax: 5, finalPrice: 1228.5, status: 'Active',
  },
  {
    id: 'PKG004', name: 'Cardiac Risk Panel', code: 'CRP',
    tests: [
      { testId: 'T006', testName: 'Lipid Profile', testCode: 'LIPID' },
      { testId: 'T002', testName: 'Fasting Blood Sugar', testCode: 'FBS' },
    ],
    price: 570, mrp: 700, tax: 5, finalPrice: 598.5, status: 'Active',
  },
];

export const orders: Order[] = [
  {
    id: '1', orderId: 'ORD-2024-001', patient: patients[0],
    tests: [
      { id: 'OT1', testId: 'T001', testName: 'Complete Blood Count', testCode: 'CBC', department: 'Hematology', category: 'Routine', specimen: 'Whole Blood', status: 'Completed', price: 350, results: [
        { componentName: 'Hemoglobin', value: '14.5', unit: 'g/dL', referenceRange: '12-17.5', flag: 'Normal' },
        { componentName: 'WBC Count', value: '8500', unit: 'cells/μL', referenceRange: '4000-11000', flag: 'Normal' },
        { componentName: 'Platelet Count', value: '250000', unit: 'cells/μL', referenceRange: '150000-400000', flag: 'Normal' },
        { componentName: 'RBC Count', value: '5.0', unit: 'million/μL', referenceRange: '4.5-5.5', flag: 'Normal' },
        { componentName: 'Hematocrit', value: '42', unit: '%', referenceRange: '36-54', flag: 'Normal' },
      ]},
      { id: 'OT2', testId: 'T002', testName: 'Fasting Blood Sugar', testCode: 'FBS', department: 'Biochemistry', category: 'Routine', specimen: 'Serum', status: 'Completed', price: 120, results: [
        { componentName: 'Fasting Glucose', value: '95', unit: 'mg/dL', referenceRange: '70-100', flag: 'Normal' },
      ]},
    ],
    status: 'Report Published', priority: 'Normal', createdAt: '2024-03-15 09:30 AM', createdBy: 'Dr. Meera Joshi',
    referringDoctor: 'Dr. Anil Gupta', notes: 'Annual health checkup', totalAmount: 470, discount: 0, netAmount: 470, paidAmount: 470,
    sampleId: 'SMP-2024-001', collectedAt: '2024-03-15 10:15 AM', collectedBy: 'John Smith',
  },
  {
    id: '2', orderId: 'ORD-2024-002', patient: patients[1],
    tests: [
      { id: 'OT3', testId: 'T005', testName: 'Thyroid Stimulating Hormone', testCode: 'TSH', department: 'Immunology', category: 'Special', specimen: 'Serum', status: 'Pending', price: 350 },
      { id: 'OT4', testId: 'T003', testName: 'Glycated Hemoglobin', testCode: 'HBA1C', department: 'Biochemistry', category: 'Special', specimen: 'Whole Blood', status: 'Pending', price: 550 },
    ],
    status: 'Order Confirmed', priority: 'Urgent', createdAt: '2024-03-15 10:00 AM', createdBy: 'Dr. Meera Joshi',
    referringDoctor: 'Dr. Suresh Menon', notes: 'Follow-up thyroid check. Patient on medication.', totalAmount: 900, discount: 50, netAmount: 850, paidAmount: 850,
  },
  {
    id: '3', orderId: 'ORD-2024-003', patient: patients[2],
    tests: [
      { id: 'OT5', testId: 'T006', testName: 'Lipid Profile', testCode: 'LIPID', department: 'Biochemistry', category: 'Routine', specimen: 'Serum', status: 'In Processing', price: 450, results: [
        { componentName: 'Total Cholesterol', value: '245', unit: 'mg/dL', referenceRange: '0-200', flag: 'High' },
        { componentName: 'Triglycerides', value: '180', unit: 'mg/dL', referenceRange: '0-150', flag: 'High' },
        { componentName: 'HDL Cholesterol', value: '35', unit: 'mg/dL', referenceRange: '40-60', flag: 'Low' },
        { componentName: 'LDL Cholesterol', value: '155', unit: 'mg/dL', referenceRange: '0-100', flag: 'High' },
        { componentName: 'VLDL Cholesterol', value: '36', unit: 'mg/dL', referenceRange: '', flag: '' },
        { componentName: 'TC/HDL Ratio', value: '7.0', unit: '', referenceRange: '0-4.5', flag: 'High' },
      ]},
    ],
    status: 'Result Entered', priority: 'Normal', createdAt: '2024-03-15 11:30 AM', createdBy: 'Lab Staff',
    referringDoctor: 'Dr. Kavitha Rao', notes: 'Cardiac risk assessment', totalAmount: 450, discount: 0, netAmount: 450, paidAmount: 450,
    sampleId: 'SMP-2024-003', collectedAt: '2024-03-15 12:00 PM', collectedBy: 'Sarah Johnson',
  },
  {
    id: '4', orderId: 'ORD-2024-004', patient: patients[3],
    tests: [
      { id: 'OT6', testId: 'T004', testName: 'Liver Function Test', testCode: 'LFT', department: 'Biochemistry', category: 'Routine', specimen: 'Serum', status: 'Validated', price: 650, results: [
        { componentName: 'Total Bilirubin', value: '0.8', unit: 'mg/dL', referenceRange: '0.1-1.2', flag: 'Normal' },
        { componentName: 'SGOT (AST)', value: '25', unit: 'U/L', referenceRange: '5-40', flag: 'Normal' },
        { componentName: 'SGPT (ALT)', value: '30', unit: 'U/L', referenceRange: '7-56', flag: 'Normal' },
        { componentName: 'Alkaline Phosphatase', value: '85', unit: 'U/L', referenceRange: '44-147', flag: 'Normal' },
        { componentName: 'Total Protein', value: '7.2', unit: 'g/dL', referenceRange: '6-8.3', flag: 'Normal' },
        { componentName: 'Albumin', value: '4.0', unit: 'g/dL', referenceRange: '3.5-5.5', flag: 'Normal' },
      ]},
    ],
    status: 'Validated', priority: 'Normal', createdAt: '2024-03-14 02:00 PM', createdBy: 'Dr. Meera Joshi',
    referringDoctor: 'Dr. Anil Gupta', notes: '', totalAmount: 650, discount: 0, netAmount: 650, paidAmount: 650,
    sampleId: 'SMP-2024-004', collectedAt: '2024-03-14 02:30 PM', collectedBy: 'Mike Wilson',
  },
  {
    id: '5', orderId: 'ORD-2024-005', patient: patients[4],
    tests: [
      { id: 'OT7', testId: 'T001', testName: 'Complete Blood Count', testCode: 'CBC', department: 'Hematology', category: 'Routine', specimen: 'Whole Blood', status: 'Sample Collected', price: 350 },
      { id: 'OT8', testId: 'T007', testName: 'Kidney Function Test', testCode: 'KFT', department: 'Biochemistry', category: 'Routine', specimen: 'Serum', status: 'Sample Collected', price: 500 },
    ],
    status: 'Sample Collected', priority: 'STAT', createdAt: '2024-03-15 08:00 AM', createdBy: 'Lab Staff',
    referringDoctor: 'Dr. Suresh Menon', notes: 'Emergency case. Priority processing required.', totalAmount: 850, discount: 0, netAmount: 850, paidAmount: 850,
    sampleId: 'SMP-2024-005', collectedAt: '2024-03-15 08:15 AM', collectedBy: 'John Smith',
  },
  {
    id: '6', orderId: 'ORD-2024-006', patient: patients[5],
    tests: [
      { id: 'OT9', testId: 'T008', testName: 'Urine Analysis', testCode: 'UA', department: 'Clinical Pathology', category: 'Routine', specimen: 'Urine', status: 'Pending', price: 200 },
    ],
    status: 'Order Confirmed', priority: 'Normal', createdAt: '2024-03-15 01:00 PM', createdBy: 'Lab Staff',
    referringDoctor: 'Dr. Kavitha Rao', notes: '', totalAmount: 200, discount: 0, netAmount: 200, paidAmount: 200,
  },
];

export const technicians: Technician[] = [
  { id: 'TECH1', name: 'John Smith', completed: 45, pending: 3 },
  { id: 'TECH2', name: 'Sarah Johnson', completed: 38, pending: 5 },
  { id: 'TECH3', name: 'Mike Wilson', completed: 42, pending: 2 },
  { id: 'TECH4', name: 'Emily Davis', completed: 35, pending: 4 },
];

export const chartData = {
  mostOrderedTests: [
    { name: 'CBC', orders: 180 },
    { name: 'FBS', orders: 120 },
    { name: 'HBA1C', orders: 140 },
    { name: 'LFT', orders: 95 },
    { name: 'TSH', orders: 200 },
  ],
  orderVolume: [
    { day: 'Sun', orders: 25 },
    { day: 'Mon', orders: 45 },
    { day: 'Tue', orders: 65 },
    { day: 'Wed', orders: 78 },
    { day: 'Thu', orders: 90 },
    { day: 'Fri', orders: 120 },
    { day: 'Sat', orders: 55 },
  ],
};

export const machineIntegration = [
  { id: 'M001', name: 'Hematology Analyzer', model: 'M001', queue: 5, status: 'Online' as const },
  { id: 'M002', name: 'Chemistry Analyzer', model: 'M002', queue: 4, status: 'Online' as const },
  { id: 'M003', name: 'Immunoassay Analyzer', model: 'M003', queue: 3, status: 'Online' as const },
  { id: 'M004', name: 'Coagulation Analyzer', model: 'M004', queue: 0, status: 'Offline' as const },
];

export const orderStatusFlow: OrderStatus[] = [
  'Order Confirmed',
  'Sample Collected',
  'In Processing',
  'Result Entered',
  'Validated',
  'Report Published',
];
