import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Customer, VehicleLog } from '../types';
import { Phone, Truck, CreditCard, MoreHorizontal, X, FileText, Calendar, Droplet, Search, Filter, AlertCircle, User, ArrowDownLeft, Check, FolderOpen } from 'lucide-react';

const mockLogs: VehicleLog[] = []; // Cleared mock data

const allCustomers: Customer[] = [
    { id: '1', name: 'Daewoo Express', vehicleNo: 'Multiple (5)', contact: '0300 1234567', creditLimit: 500000, currentDebt: 0, status: 'Active', loyaltyPoints: 1250, tier: 'Platinum' },
    { id: '2', name: 'Ali Transport', vehicleNo: 'LEA-1234', contact: '0321 8877665', creditLimit: 50000, currentDebt: 0, status: 'Active', loyaltyPoints: 340, tier: 'Silver' },
    { id: '3', name: 'LWMC (Waste Mgmt)', vehicleNo: 'GT-091', contact: '042 33221100', creditLimit: 200000, currentDebt: 0, status: 'Blocked', loyaltyPoints: 890, tier: 'Gold' },
    { id: '4', name: 'Bismillah Construction', vehicleNo: 'ICT-9988', contact: '0333 4455667', creditLimit: 150000, currentDebt: 0, status: 'Active', loyaltyPoints: 600, tier: 'Gold' },
];

export const Customers: React.FC = () => {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const filteredCustomers = allCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contact.includes(searchTerm)
    );

    return (
        <div className="space-y-6 pb-20 relative">
             <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-white rounded-2xl p-5 shadow-premium border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase mb-1">Total Receivables</p>
                        <h3 className="text-2xl font-black text-rose-600">Rs. 0</h3>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
                        <CreditCard size={24} />
                    </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-5 shadow-premium border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase mb-1">Active Accounts</p>
                        <h3 className="text-2xl font-black text-emerald-600">4 <span className="text-sm text-slate-400 font-medium">Clients</span></h3>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                        <User size={24} />
                    </div>
                </div>
             </div>

             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="w-full md:w-1/2 lg:w-1/3 relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                     <input 
                         type="text" 
                         placeholder="Search fleet, vehicle no, or name..." 
                         className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                     />
                 </div>
                 <div className="flex gap-3">
                    <button 
                        className="px-5 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 flex items-center gap-2 hover:bg-emerald-700"
                        onClick={() => setShowPaymentModal(true)}
                    >
                        <ArrowDownLeft size={18} /> Receive Payment
                    </button>
                    <button className="px-5 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 shadow-sm flex items-center gap-2">
                        <Filter size={18} /> Filter Status
                    </button>
                 </div>
             </div>

            <GlassCard title="Customer Directory" noPadding className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="p-5 font-bold">Customer Details</th>
                                <th className="p-5 font-bold">Contact</th>
                                <th className="p-5 font-bold">Credit Utilization</th>
                                <th className="p-5 font-bold text-right">Outstanding</th>
                                <th className="p-5 font-bold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => {
                                    const usagePercent = (customer.currentDebt / customer.creditLimit) * 100;
                                    return (
                                        <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-sm border border-indigo-200">
                                                        {customer.name.substring(0, 2)}
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-900 font-bold">{customer.name}</p>
                                                        <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5 font-medium">
                                                            <Truck size={12} /> {customer.vehicleNo}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                                    <Phone size={14} /> {customer.contact}
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="w-full max-w-[160px]">
                                                    <div className="flex justify-between text-xs mb-1.5">
                                                        <span className={usagePercent > 90 ? 'text-rose-600 font-bold' : 'text-slate-500 font-medium'}>
                                                            {usagePercent.toFixed(0)}% Used
                                                        </span>
                                                        <span className="text-slate-400 font-bold">Limit: {customer.creditLimit/1000}k</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full transition-all ${usagePercent > 90 ? 'bg-rose-500' : 'bg-indigo-500'}`} 
                                                            style={{ width: `${usagePercent}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5 text-right">
                                                <p className="font-mono font-black text-slate-900">Rs. {customer.currentDebt.toLocaleString()}</p>
                                            </td>
                                            <td className="p-5 text-center">
                                                <button 
                                                    onClick={() => setSelectedCustomer(customer)}
                                                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                                                >
                                                    <MoreHorizontal size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center">
                                        <p className="text-slate-500">No customers found matching your search.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            {/* Customer Detail Drawer/Modal */}
            {selectedCustomer && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setSelectedCustomer(null)}></div>
                    <div className="relative w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                         <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
                             <div>
                                 <h2 className="text-2xl font-black text-slate-900">{selectedCustomer.name}</h2>
                                 <div className="flex gap-2 mt-2">
                                     <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 uppercase tracking-wider">{selectedCustomer.vehicleNo}</span>
                                     <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-bold uppercase tracking-wider">{selectedCustomer.tier} Tier</span>
                                 </div>
                             </div>
                             <button onClick={() => setSelectedCustomer(null)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20}/></button>
                         </div>

                         <div className="p-6 bg-slate-900 text-white">
                             <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Current Outstanding</p>
                             <p className="text-4xl font-black font-mono">Rs. {selectedCustomer.currentDebt.toLocaleString()}</p>
                             <div className="mt-4 flex gap-3">
                                 <button className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-900/20">
                                     Receive Payment
                                 </button>
                                 <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors">
                                     Statement
                                 </button>
                             </div>
                         </div>

                         <div className="flex-1 overflow-y-auto p-6">
                             <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                 <FileText size={18} className="text-slate-400"/> Transaction History
                             </h3>
                             
                             <div className="space-y-4">
                                {mockLogs.length > 0 ? (
                                    mockLogs.map(log => (
                                        <div key={log.id} className="flex justify-between items-center p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                                            <div className="flex gap-3">
                                                <div className="p-2 bg-slate-100 rounded-lg text-slate-500 h-fit">
                                                    {log.product.includes('Petrol') ? <Droplet size={18}/> : <Truck size={18}/>}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm">{log.product}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{log.date} • {log.vehicleNo}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-mono font-bold text-slate-900">Rs.{log.amount.toLocaleString()}</p>
                                                <p className="text-xs text-slate-500">{log.quantity} L</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 opacity-50">
                                        <FolderOpen size={48} className="mx-auto text-slate-300 mb-2"/>
                                        <p className="text-sm font-bold text-slate-500">No recent transactions</p>
                                    </div>
                                )}
                             </div>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};