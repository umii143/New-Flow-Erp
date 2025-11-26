import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Fuel, DollarSign, Wallet, User, Activity, 
  FileText, Calendar, CheckCircle, Users, ArrowRight, ShieldAlert, 
  Lock, AlertTriangle, Gauge, Banknote, ShieldCheck, Zap, Droplet,
  MoreHorizontal
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { AppView, SecurityAlert } from '../types';

interface DashboardProps {
    onNavigate: (view: AppView) => void;
}

// --- Mock Data ---
const HOURLY_SALES = [
  { time: '6AM', volume: 1200, amount: 324000 },
  { time: '9AM', volume: 3500, amount: 945000 },
  { time: '12PM', volume: 4800, amount: 1296000 },
  { time: '3PM', volume: 4200, amount: 1134000 },
  { time: '6PM', volume: 5500, amount: 1485000 },
  { time: '9PM', volume: 3100, amount: 837000 },
  { time: '12AM', volume: 800, amount: 216000 },
];

const SECURITY_LOGS: SecurityAlert[] = [
    { id: '1', type: 'THEFT', severity: 'CRITICAL', message: 'Nozzle 4 Flow Mismatch (>5%)', timestamp: '10:42 AM', location: 'Pump 2' },
    { id: '2', type: 'FRAUD', severity: 'HIGH', message: 'Suspicious High Volume Sale (2:15 AM)', timestamp: '02:15 AM', location: 'Pump 1' },
    { id: '3', type: 'LEAK', severity: 'MEDIUM', message: 'Tank 2 Sudden Dip Drop', timestamp: '04:30 AM', location: 'HSD Tank' },
];

const CASH_FLOW = {
    opening: 150000,
    salesCash: 4250000,
    credit: 850000,
    expenses: 45000,
    drops: 3000000,
    currentInHand: 505000 // Opening + Sales - Credit - Expenses - Drops
};

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [greeting, setGreeting] = useState('Welcome Back');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
        
        {/* 1. Header & Quick Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{greeting}, Admin</h1>
                <p className="text-slate-500 font-medium mt-1">System Operational • <span className="text-emerald-600 font-bold">All Tanks Secure</span></p>
            </div>
            <div className="flex gap-3">
                <button 
                    onClick={() => onNavigate(AppView.REPORTS)}
                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                >
                    <FileText size={18} /> Daily Report
                </button>
                <button 
                    onClick={() => onNavigate(AppView.DAILY_CLOSING)}
                    className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-300 hover:bg-slate-800 flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                >
                    <Activity size={18} /> Shift Closing
                </button>
            </div>
        </div>

        {/* 2. Top Tier: Cash Command & Security */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* CASH FLOW COMMAND CENTER */}
            <div className="xl:col-span-2 bg-gradient-to-br from-slate-900 via-indigo-900 to-indigo-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[320px]">
                {/* Top Row */}
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-200 mb-2">
                            <div className="p-1.5 bg-white/10 rounded-lg">
                                <Wallet size={16} />
                            </div>
                            <span className="font-bold text-xs uppercase tracking-widest">Real-Time Cash Tracking</span>
                        </div>
                        <h2 className="text-5xl font-black tracking-tight drop-shadow-lg">Rs. {CASH_FLOW.currentInHand.toLocaleString()}</h2>
                        <p className="text-indigo-200 text-sm mt-1 font-medium">Estimated Cash in Drawer</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30 text-xs font-bold text-emerald-300 animate-pulse flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> LIVE
                        </div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <p className="text-[10px] text-indigo-200 font-bold uppercase mb-1 tracking-wider">Total Sales</p>
                        <p className="text-xl font-black text-white">{(CASH_FLOW.salesCash/1000000).toFixed(2)}M</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <p className="text-[10px] text-rose-300 font-bold uppercase mb-1 tracking-wider">Credit / Udhaar</p>
                        <p className="text-xl font-black text-white">{(CASH_FLOW.credit/1000).toFixed(0)}k</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <p className="text-[10px] text-amber-300 font-bold uppercase mb-1 tracking-wider">Expenses</p>
                        <p className="text-xl font-black text-white">{(CASH_FLOW.expenses/1000).toFixed(0)}k</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <p className="text-[10px] text-emerald-300 font-bold uppercase mb-1 tracking-wider">Bank Drops</p>
                        <p className="text-xl font-black text-white">{(CASH_FLOW.drops/1000000).toFixed(2)}M</p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500 rounded-full blur-[100px] opacity-30"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-purple-500 rounded-full blur-[80px] opacity-30"></div>
            </div>

            {/* ANTI-THEFT SECURITY MATRIX */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-premium flex flex-col h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50"></div>
                
                <div className="relative z-10 flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                             <ShieldCheck className="text-emerald-600" size={20}/> Security Matrix
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">AI Surveillance Active</p>
                    </div>
                    <div className="flex flex-col items-end">
                         <span className="text-xs font-bold text-slate-400 uppercase">Threat Level</span>
                         <span className="text-sm font-black text-emerald-600">LOW</span>
                    </div>
                </div>

                {/* Threat Visualizer */}
                <div className="flex items-center gap-1 mb-6">
                    {[1,2,3,4,5,6,7,8].map(i => (
                        <div key={i} className={`h-2 flex-1 rounded-full ${i < 3 ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
                    ))}
                    {[1,2,3].map(i => (
                        <div key={i} className="h-2 flex-1 rounded-full bg-slate-100"></div>
                    ))}
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                    {SECURITY_LOGS.map(log => (
                        <div key={log.id} className={`relative pl-4 py-3 pr-3 rounded-xl border transition-all hover:translate-x-1 ${
                            log.severity === 'CRITICAL' ? 'bg-rose-50/50 border-rose-100' :
                            log.severity === 'HIGH' ? 'bg-amber-50/50 border-amber-100' :
                            'bg-slate-50/50 border-slate-100'
                        }`}>
                            <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${
                                 log.severity === 'CRITICAL' ? 'bg-rose-500' :
                                 log.severity === 'HIGH' ? 'bg-amber-500' :
                                 'bg-slate-400'
                            }`}></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className={`text-xs font-bold ${
                                        log.severity === 'CRITICAL' ? 'text-rose-700' :
                                        log.severity === 'HIGH' ? 'text-amber-700' :
                                        'text-slate-700'
                                    }`}>{log.message}</p>
                                    <p className="text-[10px] text-slate-400 font-bold mt-1 flex items-center gap-1">
                                        <Lock size={8}/> {log.location} • {log.timestamp}
                                    </p>
                                </div>
                                {log.severity === 'CRITICAL' && <ShieldAlert size={14} className="text-rose-500" />}
                            </div>
                        </div>
                    ))}
                </div>
                
                <button 
                    onClick={() => onNavigate(AppView.SETTINGS)}
                    className="mt-4 w-full py-2 text-xs font-bold text-slate-500 uppercase hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors border border-dashed border-slate-200"
                >
                    View Full Security Audit
                </button>
            </div>
        </div>

        {/* 3. Sales & Volume Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard title="Sales Velocity" subTitle="Today's Trend" className="lg:col-span-2">
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={HOURLY_SALES}>
                            <defs>
                                <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                                itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                            />
                            <Area type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVol)" />
                        </AreaChart>
                    </ResponsiveContainer>
                 </div>
            </GlassCard>

            <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-premium">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shadow-sm">
                            <Fuel size={24} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Petrol Stock</p>
                            <h3 className="text-2xl font-black text-slate-900">12,450 L</h3>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                             <span>Current Level</span>
                             <span>65%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                        </div>
                        <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-2">
                            <TrendingUp size={10} /> Sufficient for 2 days
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-premium">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shadow-sm">
                            <Droplet size={24} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Diesel Stock</p>
                            <h3 className="text-2xl font-black text-slate-900">4,200 L</h3>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                             <span>Current Level</span>
                             <span>25%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full w-[25%] rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                        </div>
                        <p className="text-[10px] text-rose-500 font-bold flex items-center gap-1 mt-2">
                            <AlertTriangle size={10} /> Reorder Level Reached
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* 4. Quick Actions Grid (Android App Style) */}
        <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Zap className="text-indigo-600" size={20} /> Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                    onClick={() => onNavigate(AppView.FUEL_SALES)}
                    className="p-4 bg-white border border-slate-200 rounded-2xl hover:shadow-xl hover:border-indigo-200 transition-all text-left group active:scale-95"
                >
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform shadow-sm">
                        <Gauge size={24} />
                    </div>
                    <span className="font-bold text-slate-700 block text-sm">New Fuel Sale</span>
                    <span className="text-[10px] text-slate-400 font-medium">Open POS Terminal</span>
                </button>

                <button 
                    onClick={() => onNavigate(AppView.CUSTOMERS)}
                    className="p-4 bg-white border border-slate-200 rounded-2xl hover:shadow-xl hover:border-emerald-200 transition-all text-left group active:scale-95"
                >
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform shadow-sm">
                        <Banknote size={24} />
                    </div>
                    <span className="font-bold text-slate-700 block text-sm">Credit Recovery</span>
                    <span className="text-[10px] text-slate-400 font-medium">Log Customer Payment</span>
                </button>

                <button 
                    onClick={() => onNavigate(AppView.STOCK)}
                    className="p-4 bg-white border border-slate-200 rounded-2xl hover:shadow-xl hover:border-amber-200 transition-all text-left group active:scale-95"
                >
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-3 group-hover:scale-110 transition-transform shadow-sm">
                        <Droplet size={24} />
                    </div>
                    <span className="font-bold text-slate-700 block text-sm">Record Dip</span>
                    <span className="text-[10px] text-slate-400 font-medium">Update Tank Levels</span>
                </button>

                <button 
                    onClick={() => onNavigate(AppView.SETTINGS)}
                    className="p-4 bg-white border border-slate-200 rounded-2xl hover:shadow-xl hover:border-rose-200 transition-all text-left group active:scale-95"
                >
                    <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 mb-3 group-hover:scale-110 transition-transform shadow-sm">
                        <Lock size={24} />
                    </div>
                    <span className="font-bold text-slate-700 block text-sm">Security Audit</span>
                    <span className="text-[10px] text-slate-400 font-medium">Review System Logs</span>
                </button>
            </div>
        </div>
    </div>
  );
};