import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { SaleRecord } from '../types';
import { Search, Filter, Download, Plus, X, Calculator, CreditCard, Banknote, User, ScanLine, Fuel, Printer, CheckCircle, FileX } from 'lucide-react';

export const FuelSales: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [showPos, setShowPos] = useState(false);
  const [sales, setSales] = useState<SaleRecord[]>([]); // Initialized Empty

  return (
    <div className="space-y-6 pb-20 relative">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search sales by Invoice, Fleet Card..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-600 font-bold rounded-xl border border-slate-200 shadow-sm transition-colors">
                <Filter size={18} />
                <span>Filter</span>
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-600 font-bold rounded-xl border border-slate-200 shadow-sm transition-colors">
                <Download size={18} />
                <span>Export</span>
            </button>
            <button 
                onClick={() => setShowPos(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
            >
                <Plus size={18} />
                <span>New Sale</span>
            </button>
        </div>
      </div>

      <GlassCard className="overflow-hidden min-h-[400px]" noPadding>
        <div className="overflow-x-auto h-full">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider">
                        <th className="p-5">Date & Time</th>
                        <th className="p-5">Invoice ID</th>
                        <th className="p-5">Nozzle</th>
                        <th className="p-5">Product</th>
                        <th className="p-5 text-right">Qty (L)</th>
                        <th className="p-5 text-right">Rate</th>
                        <th className="p-5 text-right">Total</th>
                        <th className="p-5">Payment</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {sales.length > 0 ? (
                        sales.map((sale) => (
                            <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 text-slate-600 font-medium text-sm">{sale.date}</td>
                                <td className="p-5 text-slate-500 font-mono text-sm">#{sale.id.padStart(6, '0')}</td>
                                <td className="p-5 text-slate-600 text-sm">{sale.nozzleId}</td>
                                <td className="p-5">
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase border ${
                                        sale.fuelType === 'Petrol' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                        sale.fuelType === 'Diesel' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                        'bg-slate-50 text-slate-600 border-slate-100'
                                    }`}>
                                        {sale.fuelType}
                                    </span>
                                </td>
                                <td className="p-5 text-slate-700 text-right font-mono font-bold">{sale.quantity.toFixed(2)}</td>
                                <td className="p-5 text-slate-500 text-right font-mono text-sm">Rs.{sale.rate.toFixed(0)}</td>
                                <td className="p-5 text-slate-900 text-right font-black font-mono">Rs.{sale.amount.toLocaleString()}</td>
                                <td className="p-5">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${
                                            sale.paymentMethod === 'Cash' ? 'bg-emerald-500' : 
                                            sale.paymentMethod === 'Card' ? 'bg-blue-500' : 
                                            sale.paymentMethod === 'Fleet Card' ? 'bg-purple-500' : 'bg-slate-500'
                                        }`}></span>
                                        <div className="flex flex-col">
                                            <span className="text-slate-700 text-xs font-bold">{sale.paymentMethod}</span>
                                            {sale.customerName && <span className="text-[10px] text-slate-400">{sale.customerName}</span>}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>
                                <div className="flex flex-col items-center justify-center h-96 text-center">
                                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                                        <FileX size={48} className="text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">No Transactions Yet</h3>
                                    <p className="text-slate-500 text-sm max-w-xs mt-2">
                                        No fuel sales have been recorded for this shift. Start a new sale using the POS.
                                    </p>
                                    <button 
                                        onClick={() => setShowPos(true)}
                                        className="mt-6 px-6 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-lg shadow-sm transition-colors"
                                    >
                                        Open POS Terminal
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </GlassCard>

      {/* POS Modal - Ceramic White Theme */}
      {showPos && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
              <div className="w-full max-w-6xl h-[85vh] bg-white rounded-3xl shadow-2xl flex overflow-hidden border border-slate-200">
                  
                  {/* Left Side: Product Selection */}
                  <div className="flex-1 p-6 bg-slate-50 flex flex-col border-r border-slate-200">
                      <div className="flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                              <Calculator className="text-indigo-600" /> Point of Sale
                          </h2>
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-2">
                               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE
                          </span>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-auto">
                          {['Petrol', 'Diesel', 'Hi-Octane', 'CNG', 'Shell Helix', 'AdBlue', 'Service', 'Air'].map((item) => (
                              <button key={item} className="h-24 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-2 group">
                                  <Fuel className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                  <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">{item}</span>
                              </button>
                          ))}
                      </div>

                      <div className="mt-6 grid grid-cols-4 gap-3">
                           {[1,2,3].map(n => <button key={n} className="col-span-1 h-16 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-2xl border border-slate-200 shadow-sm transition-colors">{n}</button>)}
                           <button className="col-span-1 h-16 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold border border-rose-200">CLR</button>
                           
                           {[4,5,6].map(n => <button key={n} className="col-span-1 h-16 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-2xl border border-slate-200 shadow-sm transition-colors">{n}</button>)}
                           <button className="col-span-1 h-16 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl shadow-lg shadow-indigo-200">ENT</button>
                           
                           {[7,8,9,0].map(n => <button key={n} className="col-span-1 h-16 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-2xl border border-slate-200 shadow-sm transition-colors">{n}</button>)}
                      </div>
                  </div>

                  {/* Right Side: Receipt & Action */}
                  <div className="w-96 bg-white p-8 flex flex-col relative z-10 shadow-[-10px_0_40px_rgba(0,0,0,0.03)]">
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-bold text-slate-800">Current Ticket</h3>
                          <button onClick={() => setShowPos(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"><X size={24} /></button>
                      </div>

                      <div className="flex-1 bg-slate-50/50 rounded-2xl p-4 mb-4 overflow-y-auto border border-slate-100 space-y-3 font-mono">
                           <div className="text-center text-slate-400 text-xs py-10">Ticket Empty</div>
                      </div>

                      <div className="space-y-4">
                          <div className="flex justify-between items-center">
                              <span className="text-slate-500 font-medium text-sm">Subtotal</span>
                              <span className="text-slate-900 font-bold">Rs.0.00</span>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                              <span className="text-lg font-bold text-slate-900">Total Pay</span>
                              <span className="text-3xl font-black text-indigo-600">Rs.0</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mt-4">
                              <button className="py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 transition-transform hover:-translate-y-1 flex flex-col items-center gap-1">
                                  <Banknote size={18} /> CASH
                              </button>
                              <button className="py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 transition-transform hover:-translate-y-1 flex flex-col items-center gap-1">
                                  <CreditCard size={18} /> CARD
                              </button>
                              <button className="py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-300 transition-transform hover:-translate-y-1 flex flex-col items-center gap-1">
                                  <User size={18} /> UDHAAR
                              </button>
                              <button className="py-4 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm shadow-sm transition-transform hover:-translate-y-1 flex flex-col items-center gap-1">
                                  <Printer size={18} /> PRINT
                              </button>
                          </div>
                          <div className="pt-4 text-center">
                              <p className="text-[9px] font-bold text-slate-300 uppercase tracking-wide">Powered by Umar Ali</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};