import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { Expense } from '../types';
import { FileText, CheckCircle, Clock, XCircle, PieChart, Wallet, TrendingUp, AlertCircle } from 'lucide-react';

const expenses: Expense[] = []; // Cleared mock data

export const Expenses: React.FC = () => {
    return (
        <div className="space-y-6 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Hero Card */}
                <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden flex flex-col justify-between h-64">
                    <div className="relative z-10">
                         <div className="flex justify-between items-start">
                             <div>
                                 <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-1">Total Expenses (Oct)</p>
                                 <h3 className="text-4xl font-black tracking-tight">Rs. 0</h3>
                             </div>
                             <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                 <Wallet size={24} />
                             </div>
                         </div>
                         <div className="mt-6 inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/20">
                             <TrendingUp size={14} className="text-indigo-200" />
                             <span className="text-xs font-bold">No change vs Last Month</span>
                         </div>
                    </div>
                    {/* Decorative Circles */}
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute top-12 -left-12 w-32 h-32 bg-indigo-500 rounded-full blur-2xl"></div>
                </div>
                
                {/* Expense List */}
                <GlassCard className="lg:col-span-2 min-h-[256px]" title="Recent Requests">
                    {expenses.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-slate-500 text-xs uppercase font-bold border-b border-slate-100">
                                        <th className="pb-4 pl-2">Description</th>
                                        <th className="pb-4">Category</th>
                                        <th className="pb-4">Date</th>
                                        <th className="pb-4 text-right">Amount</th>
                                        <th className="pb-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {expenses.map((expense) => (
                                        <tr key={expense.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors group">
                                            <td className="py-4 pl-2">
                                                <p className="font-bold text-slate-900">{expense.title}</p>
                                                <p className="text-xs text-slate-400 mt-0.5">By: {expense.requestedBy}</p>
                                            </td>
                                            <td className="py-4">
                                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">{expense.category}</span>
                                            </td>
                                            <td className="py-4 text-slate-500 font-medium">{expense.date}</td>
                                            <td className="py-4 text-right text-slate-900 font-black font-mono">Rs. {expense.amount.toLocaleString()}</td>
                                            <td className="py-4">
                                                <div className="flex justify-center">
                                                    {expense.status === 'Approved' && <span className="flex items-center gap-1 text-emerald-700 text-xs font-bold bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200"><CheckCircle size={12} /> Approved</span>}
                                                    {expense.status === 'Pending' && <span className="flex items-center gap-1 text-amber-700 text-xs font-bold bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200"><Clock size={12} /> Pending</span>}
                                                    {expense.status === 'Rejected' && <span className="flex items-center gap-1 text-rose-700 text-xs font-bold bg-rose-100 px-2.5 py-1 rounded-full border border-rose-200"><XCircle size={12} /> Rejected</span>}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-48 text-center opacity-60">
                            <AlertCircle size={32} className="text-slate-400 mb-2" />
                            <p className="text-slate-600 font-bold text-sm">No expenses recorded yet</p>
                            <p className="text-slate-400 text-xs">Create a new claim to see it here.</p>
                        </div>
                    )}
                </GlassCard>
            </div>
        </div>
    );
};