import React, { useState } from 'react';
import { Nozzle, Customer } from '../types';
import { 
  Calculator, Save, Fuel, Gauge, Check, AlertTriangle, Calendar, Sun, Moon, Banknote, 
  ArrowRight, ArrowLeft, Plus, Trash2, User, Wallet, ShieldCheck, Coins, 
  HelpCircle, AlertOctagon, Share2
} from 'lucide-react';

// Customers for Dropdown (Essential for Credit logic)
const CUSTOMERS: Customer[] = [
    { id: '1', name: 'Daewoo Express', vehicleNo: 'Fleet', contact: '', creditLimit: 500000, currentDebt: 0, status: 'Active', loyaltyPoints: 0, tier: 'Platinum' },
    { id: '2', name: 'Ali Transport', vehicleNo: 'LEA-1234', contact: '', creditLimit: 50000, currentDebt: 0, status: 'Active', loyaltyPoints: 0, tier: 'Silver' },
    { id: '3', name: 'Bismillah Const.', vehicleNo: 'ICT-991', contact: '', creditLimit: 100000, currentDebt: 0, status: 'Active', loyaltyPoints: 0, tier: 'Gold' },
];

type WizardStep = 1 | 2 | 3 | 4;

export const DailyClosing: React.FC = () => {
  // --- State Management ---
  const [step, setStep] = useState<WizardStep>(1);
  const [shiftDate, setShiftDate] = useState(new Date().toISOString().split('T')[0]);
  const [shiftType, setShiftType] = useState<'Day' | 'Night'>('Day');
  const [attendantName, setAttendantName] = useState('Ahmed Khan');

  // Step 1: Nozzles (Initialized with Opening = Closing for Clean State)
  const [nozzles, setNozzles] = useState<Nozzle[]>([
    { id: '1', name: 'Pump 1 - PMG', product: 'Petrol', openingReading: 14500.0, currentReading: 14500.0, price: 280.00, test: 0 },
    { id: '2', name: 'Pump 2 - PMG', product: 'Petrol', openingReading: 22100.0, currentReading: 22100.0, price: 280.00, test: 0 },
    { id: '3', name: 'Pump 1 - HSD', product: 'Diesel', openingReading: 45600.0, currentReading: 45600.0, price: 295.00, test: 0 },
    { id: '4', name: 'Pump 2 - HSD', product: 'Diesel', openingReading: 38900.0, currentReading: 38900.0, price: 295.00, test: 0 },
  ]);

  // Step 2: Credits & Expenses (Clean Slate)
  const [credits, setCredits] = useState<{id: number, name: string, amount: number}[]>([]);
  const [expenses, setExpenses] = useState<{id: number, desc: string, amount: number}[]>([]);
  
  // Inputs for Step 2 lists
  const [newCredit, setNewCredit] = useState({ customerId: '', amount: '' });
  const [newExpense, setNewExpense] = useState({ desc: '', amount: '' });

  // Step 3: Cash & Drops (Clean Slate)
  const [safeDrops, setSafeDrops] = useState<{id: number, time: string, amount: number}[]>([]);
  const [newDrop, setNewDrop] = useState({ amount: '' });
  
  // New: Cash Entry Mode Toggle
  const [cashMode, setCashMode] = useState<'DENOMINATION' | 'MANUAL_TOTAL'>('DENOMINATION');
  const [manualCashTotal, setManualCashTotal] = useState<string>('');
  
  // Advanced Cash Tally State
  const [notes, setNotes] = useState<Record<string, number>>({
      '5000': 0, '1000': 0, '500': 0, '100': 0, '50': 0, '20': 0, '10': 0
  });

  // Shortage Recovery Option
  const [recoverFromSalary, setRecoverFromSalary] = useState(false);

  // --- Calculations ---

  // 1. Total Sales (Fixed strict typing)
  const totalSalesAmount = nozzles.reduce((acc: number, n: Nozzle) => {
      const sold = Math.max(0, n.currentReading - n.openingReading - (n.test || 0));
      return acc + (sold * n.price);
  }, 0);

  const totalLiters = nozzles.reduce((acc: number, n: Nozzle) => acc + Math.max(0, n.currentReading - n.openingReading - (n.test || 0)), 0);

  // 2. Deductions
  const totalCredit = credits.reduce((acc: number, c) => acc + c.amount, 0);
  const totalExpenses = expenses.reduce((acc: number, e) => acc + e.amount, 0);
  const totalDrops = safeDrops.reduce((acc: number, d) => acc + d.amount, 0);

  // 3. Cash Handling
  let cashInHand = 0;
  if (cashMode === 'MANUAL_TOTAL') {
      cashInHand = parseFloat(manualCashTotal) || 0;
  } else {
      cashInHand = Object.entries(notes).reduce((acc: number, [denom, count]) => acc + (parseInt(denom) * Number(count)), 0);
  }
  
  // 4. Final Reconciliation
  const expectedCash = totalSalesAmount - totalCredit - totalExpenses - totalDrops;
  const difference = cashInHand - expectedCash; // + Surplus, - Shortage

  // --- Handlers ---

  const handleNozzleChange = (id: string, field: 'currentReading' | 'test', value: string) => {
      const numVal = parseFloat(value) || 0;
      setNozzles(prev => prev.map(n => n.id === id ? { ...n, [field]: numVal } : n));
  };

  const addCredit = () => {
      if (!newCredit.customerId || !newCredit.amount) return;
      const cust = CUSTOMERS.find(c => c.id === newCredit.customerId);
      setCredits([...credits, { id: Date.now(), name: cust?.name || 'Unknown', amount: parseFloat(newCredit.amount) }]);
      setNewCredit({ customerId: '', amount: '' });
  };

  const addExpense = () => {
      if (!newExpense.desc || !newExpense.amount) return;
      setExpenses([...expenses, { id: Date.now(), desc: newExpense.desc, amount: parseFloat(newExpense.amount) }]);
      setNewExpense({ desc: '', amount: '' });
  };

  const addSafeDrop = () => {
      if (!newDrop.amount) return;
      setSafeDrops([...safeDrops, { 
          id: Date.now(), 
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
          amount: parseFloat(newDrop.amount) 
      }]);
      setNewDrop({ amount: '' });
  };

  const handleShareWhatsApp = () => {
      // Create detailed breakdown
      const breakdown = nozzles.map(n => {
        const sold = Math.max(0, n.currentReading - n.openingReading - (n.test || 0));
        return `${n.product}: ${sold.toFixed(1)}L`;
      }).join('%0A'); // %0A is newline for URL

      const message = `*⛽ Fuel Station Daily Report*
📅 *Date:* ${shiftDate}
👤 *Staff:* ${attendantName}
----------------------------
*💵 FINANCIAL SUMMARY*
*Total Sales:* Rs. ${totalSalesAmount.toLocaleString()}
*Expenses:* Rs. ${totalExpenses.toLocaleString()}
*Safe Drops:* Rs. ${totalDrops.toLocaleString()}
*Credit Given:* Rs. ${totalCredit.toLocaleString()}
----------------------------
*💰 CASH RECONCILIATION*
*Expected Cash:* Rs. ${expectedCash.toLocaleString()}
*Actual Cash:* Rs. ${cashInHand.toLocaleString()}
*${difference >= 0 ? '✅ Surplus' : '❌ Shortage'}: Rs. ${Math.abs(difference).toLocaleString()}*
----------------------------
*⛽ VOLUME SOLD*
${breakdown}
----------------------------
_Generated via FuelFlow ERP_`;

      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  // --- Render Steps ---

  const renderStep1_Readings = () => (
      <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start gap-3">
              <HelpCircle className="text-indigo-500 shrink-0 mt-0.5" size={18} />
              <div className="text-sm text-indigo-800">
                  <p className="font-bold">Pro Tip:</p>
                  <p>Opening readings are automatically pulled from the previous shift close. Only enter the <strong>Current Reading</strong> on the digital display.</p>
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nozzles.map(nozzle => {
                  const sold = nozzle.currentReading - nozzle.openingReading - (nozzle.test || 0);
                  const amount = sold * nozzle.price;
                  return (
                      <div key={nozzle.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                          <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg ${nozzle.product === 'Petrol' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                                      <Fuel size={20} />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-900">{nozzle.name}</h4>
                                      <p className="text-xs text-slate-500 font-mono">Open: {nozzle.openingReading}</p>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <p className="text-xs font-bold text-slate-400 uppercase">Price</p>
                                  <p className="font-mono font-bold text-slate-900">Rs.{nozzle.price}</p>
                              </div>
                          </div>

                          <div className="flex gap-4 items-end">
                              <div className="flex-1 space-y-1.5">
                                  <label className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider">Closing Reading</label>
                                  <div className="relative">
                                      <input 
                                          type="number" 
                                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-10 py-3 font-mono font-bold text-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                          defaultValue={nozzle.currentReading}
                                          onChange={(e) => handleNozzleChange(nozzle.id, 'currentReading', e.target.value)}
                                      />
                                      <Gauge className="absolute right-3 top-3.5 text-slate-400" size={18} />
                                  </div>
                              </div>
                              
                              <div className="w-24 space-y-1.5">
                                  <label className="text-[10px] font-bold uppercase text-rose-500 tracking-wider">Test (L)</label>
                                  <input 
                                      type="number" 
                                      className="w-full bg-rose-50 border border-rose-100 rounded-xl px-3 py-3 font-mono font-bold text-lg text-rose-600 focus:border-rose-400 outline-none"
                                      value={nozzle.test || ''}
                                      onChange={(e) => handleNozzleChange(nozzle.id, 'test', e.target.value)}
                                  />
                              </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-500">Sales: <span className="text-slate-900 font-mono text-sm">{sold.toFixed(1)} L</span></span>
                              <span className="text-lg font-black font-mono text-slate-900">Rs. {amount.toLocaleString()}</span>
                          </div>
                      </div>
                  );
              })}
          </div>
          <div className="flex justify-end p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="text-right">
                  <p className="text-xs font-bold text-indigo-600 uppercase">Total Sales Value</p>
                  <p className="text-3xl font-black text-indigo-900 font-mono">Rs. {totalSalesAmount.toLocaleString()}</p>
              </div>
          </div>
      </div>
  );

  const renderStep2_Deductions = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4 fade-in">
          {/* Credit Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><User size={20}/></div>
                  <h3 className="font-bold text-slate-900 text-lg">Credit / Udhaar</h3>
              </div>
              
              {/* Add Credit Form */}
              <div className="flex gap-2 mb-4">
                  <select 
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                      value={newCredit.customerId}
                      onChange={(e) => setNewCredit({...newCredit, customerId: e.target.value})}
                  >
                      <option value="">Select Customer...</option>
                      {CUSTOMERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <input 
                      type="number" 
                      placeholder="Amount" 
                      className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                      value={newCredit.amount}
                      onChange={(e) => setNewCredit({...newCredit, amount: e.target.value})}
                  />
                  <button onClick={addCredit} className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"><Plus size={20}/></button>
              </div>

              {/* Credit List */}
              <div className="flex-1 bg-slate-50 rounded-xl p-2 space-y-2 overflow-y-auto max-h-[300px]">
                  {credits.length === 0 && (
                       <div className="text-center py-10 opacity-50">
                           <User size={32} className="mx-auto mb-2 text-slate-400" />
                           <p className="text-xs font-bold text-slate-500">No credit sales recorded</p>
                       </div>
                  )}
                  {credits.map((c, idx) => (
                      <div key={c.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm animate-in fade-in slide-in-from-left-2">
                          <span className="text-sm font-bold text-slate-700">{c.name}</span>
                          <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-rose-600">Rs.{c.amount.toLocaleString()}</span>
                              <button onClick={() => setCredits(credits.filter(i => i.id !== c.id))} className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
                  <span className="font-bold text-slate-500">Total Credit</span>
                  <span className="font-black text-rose-600 text-xl">Rs. {totalCredit.toLocaleString()}</span>
              </div>
          </div>

          {/* Expenses Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Wallet size={20}/></div>
                  <h3 className="font-bold text-slate-900 text-lg">Daily Expenses</h3>
              </div>

               {/* Add Expense Form */}
               <div className="flex gap-2 mb-4">
                  <input 
                      type="text" 
                      placeholder="Description (e.g. Tea)" 
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                      value={newExpense.desc}
                      onChange={(e) => setNewExpense({...newExpense, desc: e.target.value})}
                  />
                  <input 
                      type="number" 
                      placeholder="Amount" 
                      className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  />
                  <button onClick={addExpense} className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"><Plus size={20}/></button>
              </div>

              {/* Expense List */}
              <div className="flex-1 bg-slate-50 rounded-xl p-2 space-y-2 overflow-y-auto max-h-[300px]">
                  {expenses.length === 0 && (
                       <div className="text-center py-10 opacity-50">
                           <Wallet size={32} className="mx-auto mb-2 text-slate-400" />
                           <p className="text-xs font-bold text-slate-500">No expenses recorded</p>
                       </div>
                  )}
                  {expenses.map((e, idx) => (
                      <div key={e.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm animate-in fade-in slide-in-from-left-2">
                          <span className="text-sm font-bold text-slate-700">{e.desc}</span>
                          <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-amber-600">Rs.{e.amount.toLocaleString()}</span>
                              <button onClick={() => setExpenses(expenses.filter(i => i.id !== e.id))} className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
                  <span className="font-bold text-slate-500">Total Expenses</span>
                  <span className="font-black text-amber-600 text-xl">Rs. {totalExpenses.toLocaleString()}</span>
              </div>
          </div>
      </div>
  );

  const renderStep3_Cash = () => (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-right-4 fade-in">
          {/* Safe Drops */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><ShieldCheck size={20}/></div>
                  <div>
                      <h3 className="font-bold text-slate-900 text-lg">Safe Drops</h3>
                      <p className="text-xs text-slate-500">Cash sent to office during shift</p>
                  </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                  <input 
                      type="number" 
                      placeholder="Amount Dropped" 
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                      value={newDrop.amount}
                      onChange={(e) => setNewDrop({...newDrop, amount: e.target.value})}
                  />
                  <button onClick={addSafeDrop} className="px-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold text-sm transition-colors">Add</button>
              </div>

              <div className="flex-1 bg-slate-50 rounded-xl p-2 space-y-2 overflow-y-auto">
                  {safeDrops.length === 0 && (
                      <div className="text-center py-10 opacity-50">
                           <ShieldCheck size={32} className="mx-auto mb-2 text-slate-400" />
                           <p className="text-xs font-bold text-slate-500">No safe drops recorded</p>
                       </div>
                  )}
                  {safeDrops.map((d) => (
                      <div key={d.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm animate-in fade-in slide-in-from-left-2">
                          <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">{d.time}</span>
                              <span className="text-sm font-bold text-slate-700">Drop</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-emerald-600">Rs.{d.amount.toLocaleString()}</span>
                              <button onClick={() => setSafeDrops(safeDrops.filter(i => i.id !== d.id))} className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
                  <span className="font-bold text-slate-500">Total Drops</span>
                  <span className="font-black text-emerald-600 text-xl">Rs. {totalDrops.toLocaleString()}</span>
              </div>
          </div>

          {/* Cash Calculation (Toggleable) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Banknote size={20}/></div>
                      <h3 className="font-bold text-slate-900 text-lg">Cash Tally</h3>
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex items-center bg-slate-100 rounded-lg p-1">
                      <button 
                        onClick={() => setCashMode('MANUAL_TOTAL')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-all ${cashMode === 'MANUAL_TOTAL' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                         <Calculator size={14} /> Easy Mode
                      </button>
                      <button 
                        onClick={() => setCashMode('DENOMINATION')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-all ${cashMode === 'DENOMINATION' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                         <Coins size={14} /> Note Counter
                      </button>
                  </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6 flex justify-between items-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                       <Banknote size={80} />
                   </div>
                   <div>
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Cash Counted</p>
                       <p className="text-4xl font-black font-mono text-indigo-900">Rs. {cashInHand.toLocaleString()}</p>
                   </div>
                   {cashMode === 'DENOMINATION' && (
                       <div className="text-right">
                           <p className="text-[10px] font-bold text-slate-400 uppercase">Notes Counted</p>
                           <p className="font-mono font-bold text-slate-600">
                               {Object.values(notes).reduce((a: number, b: number) => a + b, 0)} items
                           </p>
                       </div>
                   )}
              </div>

              {cashMode === 'MANUAL_TOTAL' ? (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                       <label className="text-sm font-bold text-slate-600">Enter Total Cash Counted</label>
                       <div className="relative">
                            <input 
                                type="number" 
                                placeholder="e.g. 150000" 
                                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-2xl font-mono font-black text-slate-900 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all pl-12"
                                value={manualCashTotal}
                                onChange={(e) => setManualCashTotal(e.target.value)}
                                autoFocus
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">Rs.</div>
                       </div>
                       <p className="text-xs text-slate-400 flex items-center gap-1"><AlertOctagon size={12}/> Use this mode only if you have already verified the cash manually.</p>
                  </div>
              ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-2">
                      {[5000, 1000, 500, 100, 50, 20, 10].map(denom => (
                          <div key={denom} className="bg-white p-3 rounded-xl border border-slate-200 relative group focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all hover:shadow-md">
                              <div className="flex justify-between items-start mb-2">
                                  <span className="text-xs font-bold text-slate-400 uppercase">Count</span>
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                                      denom >= 1000 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                                      denom >= 100 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                      'bg-slate-50 text-slate-500 border-slate-100'
                                  }`}>
                                      {denom}
                                  </span>
                              </div>
                              <div className="relative">
                                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">x</span>
                                  <input 
                                    type="number" 
                                    placeholder="0" 
                                    className="w-full bg-slate-50 rounded-lg border-none pl-6 pr-2 py-2 text-right font-mono text-xl text-slate-900 font-black focus:bg-white focus:ring-0"
                                    value={notes[denom.toString()] || ''}
                                    onChange={(e) => setNotes({...notes, [denom]: parseInt(e.target.value) || 0})}
                                    onFocus={(e) => e.target.select()}
                                  />
                              </div>
                              <div className="mt-2 pt-2 border-t border-slate-50 text-right">
                                  <p className="text-xs text-slate-400 font-mono font-bold group-focus-within:text-indigo-600 transition-colors">
                                      = {( (notes[denom.toString()] || 0) * denom ).toLocaleString()}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      </div>
  );

  const renderStep4_Final = () => (
      <div className="max-w-4xl mx-auto animate-in zoom-in-95 fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
              {/* Header */}
              <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                  <div>
                      <h2 className="text-3xl font-black uppercase tracking-tight">Shift Closing Report</h2>
                      <p className="text-indigo-200 font-medium mt-1">Verify all figures before final submission.</p>
                  </div>
                  <div className="text-right">
                      <p className="text-sm font-bold opacity-70">{new Date().toDateString()}</p>
                      <p className="text-xl font-bold">{attendantName}</p>
                  </div>
              </div>

              {/* Big Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-100">
                  <div className="p-8 text-center border-r border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Sales</p>
                      <p className="text-3xl font-black text-slate-900">Rs. {totalSalesAmount.toLocaleString()}</p>
                      <p className="text-xs font-bold text-indigo-600 mt-1 bg-indigo-50 inline-block px-2 py-0.5 rounded">{totalLiters.toFixed(0)} Liters</p>
                  </div>
                  <div className="p-8 text-center border-r border-slate-100 bg-slate-50/50">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Net Payable</p>
                      <p className="text-3xl font-black text-slate-900">Rs. {expectedCash.toLocaleString()}</p>
                      <div className="flex justify-center gap-2 mt-2 text-[10px] font-bold text-slate-500">
                          <span>Cr: {totalCredit/1000}k</span> • <span>Exp: {totalExpenses/1000}k</span> • <span>Drop: {totalDrops/1000}k</span>
                      </div>
                  </div>
                  <div className="p-8 text-center bg-emerald-50/30">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Cash Counted</p>
                      <p className="text-3xl font-black text-emerald-700">Rs. {cashInHand.toLocaleString()}</p>
                  </div>
              </div>

              {/* The Verdict */}
              <div className="p-8">
                  <div className={`rounded-2xl p-6 flex items-center justify-between border-2 transition-all ${
                      difference === 0 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : difference > 0 
                          ? 'bg-emerald-50 border-emerald-200' 
                          : 'bg-rose-50 border-rose-200'
                  }`}>
                      <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${difference >= 0 ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'}`}>
                              {difference >= 0 ? <Check size={32} strokeWidth={3} /> : <AlertTriangle size={32} strokeWidth={3} />}
                          </div>
                          <div>
                              <h3 className={`text-xl font-black uppercase ${difference >= 0 ? 'text-emerald-800' : 'text-rose-800'}`}>
                                  {difference === 0 ? 'Perfectly Balanced' : difference > 0 ? 'Cash Surplus' : 'Cash Shortage'}
                              </h3>
                              <p className={`font-medium ${difference >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                                  {difference === 0 
                                    ? 'Great job! All accounts match.' 
                                    : difference > 0 
                                      ? `You have Rs. ${difference.toLocaleString()} extra.` 
                                      : `You are short by Rs. ${Math.abs(difference).toLocaleString()}.`}
                              </p>
                          </div>
                      </div>
                      <div className={`text-4xl font-black font-mono ${difference >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {difference > 0 ? '+' : ''}{difference.toLocaleString()}
                      </div>
                  </div>

                  {difference < 0 && (
                      <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 p-6 bg-rose-50 rounded-2xl border border-rose-100">
                          <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2">
                              <AlertOctagon size={18} /> Shortage Recovery
                          </h4>
                          <div className="flex items-center gap-3">
                               <input 
                                id="recover" 
                                type="checkbox" 
                                className="w-5 h-5 rounded border-rose-300 text-rose-600 focus:ring-rose-500"
                                checked={recoverFromSalary}
                                onChange={(e) => setRecoverFromSalary(e.target.checked)}
                               />
                               <label htmlFor="recover" className="text-sm font-medium text-rose-700">
                                   Auto-deduct <strong>Rs. {Math.abs(difference).toLocaleString()}</strong> from {attendantName}'s next salary.
                               </label>
                          </div>
                          {!recoverFromSalary && (
                              <textarea 
                                className="w-full mt-4 p-4 border border-rose-200 rounded-xl bg-white focus:ring-2 focus:ring-rose-500/20 outline-none text-sm font-medium" 
                                placeholder="If not deducting, please explain the reason for shortage..."
                              ></textarea>
                          )}
                      </div>
                  )}
              </div>

              {/* Action Buttons */}
              <div className="p-8 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                  <button onClick={handleShareWhatsApp} className="flex items-center gap-2 text-emerald-600 font-bold hover:bg-emerald-50 px-4 py-2 rounded-xl transition-colors">
                      <Share2 size={18} /> Send to Owner (WhatsApp)
                  </button>
                  <button className="px-8 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-slate-300 hover:shadow-indigo-300 transition-all flex items-center gap-2">
                       <Save size={18} /> Submit & Close Shift
                  </button>
              </div>
          </div>
      </div>
  );

  // --- Main Wizard Container ---
  return (
    <div className="pb-24 relative max-w-7xl mx-auto">
      {/* Header & Header Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
         <div>
             <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
                <Calculator className="text-indigo-600" size={32}/> 
                Daily Closing Wizard
             </h1>
             <p className="text-slate-500 font-medium mt-1">Follow the steps to reconcile your shift.</p>
         </div>
         
         <div className="flex flex-wrap gap-3">
             <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-2">
                 <User size={16} className="text-slate-400"/>
                 <span className="font-bold text-slate-700 text-sm">{attendantName}</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                 <Calendar size={16} className="text-slate-400"/>
                 <span className="font-bold text-slate-700 text-sm">{shiftDate}</span>
             </div>
             <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
                 <button onClick={() => setShiftType('Day')} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${shiftType === 'Day' ? 'bg-amber-100 text-amber-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                     <Sun size={14} /> Day
                 </button>
                 <button onClick={() => setShiftType('Night')} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${shiftType === 'Night' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                     <Moon size={14} /> Night
                 </button>
             </div>
         </div>
      </div>

      {/* Progress Stepper */}
      <div className="mb-8">
          <div className="flex justify-between items-center relative z-10">
              {[
                  { id: 1, label: 'Meter Readings', icon: Fuel },
                  { id: 2, label: 'Credit & Expenses', icon: Wallet },
                  { id: 3, label: 'Cash & Drops', icon: Banknote },
                  { id: 4, label: 'Final Audit', icon: ShieldCheck },
              ].map((s, idx) => (
                  <div key={s.id} className={`flex flex-col items-center gap-2 transition-all duration-500 ${step >= s.id ? 'opacity-100' : 'opacity-40'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                          step === s.id ? 'bg-indigo-600 border-indigo-100 text-white scale-110 shadow-lg shadow-indigo-200' : 
                          step > s.id ? 'bg-emerald-500 border-emerald-100 text-white' : 
                          'bg-white border-slate-200 text-slate-300'
                      }`}>
                          {step > s.id ? <Check size={20} strokeWidth={3} /> : <s.icon size={20} />}
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wide ${step === s.id ? 'text-indigo-700' : step > s.id ? 'text-emerald-600' : 'text-slate-400'}`}>{s.label}</span>
                  </div>
              ))}
          </div>
          {/* Progress Bar Line */}
          <div className="absolute top-6 left-0 w-full h-1 bg-slate-200 -z-0 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
          </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
          {step === 1 && renderStep1_Readings()}
          {step === 2 && renderStep2_Deductions()}
          {step === 3 && renderStep3_Cash()}
          {step === 4 && renderStep4_Final()}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 lg:left-72 right-0 p-6 bg-white border-t border-slate-200 z-40 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => setStep(prev => Math.max(1, prev - 1) as WizardStep)}
            disabled={step === 1}
            className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
              <ArrowLeft size={20} /> Back
          </button>

          <div className="text-center hidden md:block">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Net Payable Estimate</p>
              <p className="text-xl font-black text-slate-900">Rs. {expectedCash.toLocaleString()}</p>
          </div>

          {step < 4 && (
              <button 
                onClick={() => setStep(prev => Math.min(4, prev + 1) as WizardStep)}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                  Next Step <ArrowRight size={20} />
              </button>
          )}
      </div>
    </div>
  );
};