import React from 'react';

export interface SaleRecord {
  id: string;
  date: string;
  fuelType: 'Petrol' | 'Diesel' | 'Hi-Octane' | 'Lube' | 'Premium' | 'E85';
  quantity: number;
  rate: number;
  amount: number;
  paymentMethod: 'Cash' | 'Card' | 'Fleet Card' | 'Mobile App';
  customerName?: string;
  nozzleId?: string;
  status?: 'Completed' | 'Pending' | 'Failed';
}

export interface TankStatus {
  id: string;
  fuelType: 'Petrol' | 'Diesel' | 'Hi-Octane' | 'Premium' | 'E85';
  capacity: number;
  currentLevel: number;
  waterLevel: number; // For ATG water detection
  ullage: number; // Empty space available
  temperature: number;
  density: number; // Added for precision
  lastDelivery: string;
  status: 'Normal' | 'Low' | 'Critical' | 'Leak Detected';
}

export interface Pump {
  id: number;
  status: 'IDLE' | 'FUELING' | 'PAYMENT' | 'OFFLINE' | 'ERROR' | 'LOCKED';
  currentNozzle?: 'Petrol' | 'Diesel' | 'Premium';
  currentVolume: number;
  currentAmount: number;
  vehicleNo?: string;
  customerName?: string;
  flowRate?: number;
}

export interface Nozzle {
  id: string;
  name: string;
  product: 'Petrol' | 'Diesel' | 'Hi-Octane';
  openingReading: number; // Previous closing
  currentReading: number; // To be entered
  price: number;
  test?: number; // Added optional test property
}

export interface VehicleLog {
    id: string;
    date: string;
    vehicleNo: string;
    product: string;
    quantity: number;
    amount: number;
    type: 'Credit' | 'Cash';
}

export interface Customer {
  id: string;
  name: string;
  vehicleNo: string;
  contact: string;
  creditLimit: number;
  currentDebt: number;
  status: 'Active' | 'Blocked' | 'Warning';
  loyaltyPoints: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
  logs?: VehicleLog[];
}

export interface LubeProduct {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  image?: string;
  sku: string;
}

export interface Expense {
  id: string; // Changed from number to string for consistency
  title: string;
  category: string;
  amount: number;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  requestedBy: string;
}

export interface StaffMember {
    id: string;
    name: string;
    role: string;
    baseSalary: number;
    currentAdvances: number; // Money taken in advance
    attendance: number; // Days present
    overtimeHours: number;
    status: 'Active' | 'On Leave';
    image?: string;
}

export interface Supplier {
  id: string;
  name: string;
  type: 'OMC' | 'Lube Vendor' | 'General';
  contactPerson: string;
  phone: string;
  balance: number;
  email?: string;
  taxId?: string;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  date: string;
  product: 'Petrol' | 'Diesel' | 'Lube';
  invoiceQty: number; // What they billed
  receivedQty: number; // What was measured (Dip)
  shortage: number; // The loss in Liters
  shortageAmount: number; // The loss in Currency
  rate: number;
  totalAmount: number;
  status: 'Draft' | 'Received' | 'Paid';
}

export interface BankDeposit {
    id: string;
    bankName: string;
    accountNumber: string;
    amount: number;
    date: string;
    slipImage?: string; // URL or base64
    status: 'Verified' | 'Pending';
}

export interface SecurityAlert {
    id: string;
    type: 'THEFT' | 'LEAK' | 'FRAUD' | 'SYSTEM' | 'SHORTAGE';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    message: string;
    timestamp: string;
    location?: string;
    isResolved?: boolean;
}

export interface DashboardWidget {
    id: string;
    title: string;
    type: 'CHART' | 'STAT' | 'LIST' | 'ACTION';
    size: 'SMALL' | 'MEDIUM' | 'LARGE';
    visible: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  FUEL_SALES = 'FUEL_SALES',
  LUBE_SALES = 'LUBE_SALES',
  CUSTOMERS = 'CUSTOMERS',
  REPORTS = 'REPORTS',
  STOCK = 'STOCK',
  EXPENSES = 'EXPENSES',
  SETTINGS = 'SETTINGS',
  ANALYTICS = 'ANALYTICS',
  DAILY_CLOSING = 'DAILY_CLOSING',
  STAFF = 'STAFF',
  SUPPLIERS = 'SUPPLIERS'
}