import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import { 
  Calendar, Download, FileText, Droplet, Users, DollarSign, Wallet, Truck, Briefcase, ShoppingBag, ShieldAlert,
  ChevronRight, Filter, Printer, Banknote, AlertCircle, Calculator, UserCheck, TrendingUp, BadgeAlert, Zap
} from 'lucide-react';

// --- Data & Config ---
type ReportTab = 'SALES' | 'CUSTOMERS' | 'LOANS' | 'EXPENSES' | 'PROFIT' | 'STOCK' | 'SHIFT' | 'SUPPLIER' | 'CASH' | 'INSIGHTS';

const tabs: { id: ReportTab; label: string; icon: React.ReactNode }[] = [
  { id: 'SALES', label: 'Sales & Audits', icon: <Droplet size={18} /> },
  { id: 'SHIFT', label: 'Shift & Staff', icon: <Briefcase size={18} /> },
  { id: 'EXPENSES', label: 'Expenses & Payroll', icon: <Wallet size={18} /> },
  { id: 'CUSTOMERS', label: 'Customers & Fleet', icon: <Users size={18} /> },
  { id: 'LOANS', label: 'Recovery & Debt', icon: <DollarSign size={18} /> },
  { id: 'PROFIT', label: 'P&L Statement', icon: <BarChart size={18} /> },
  { id: 'STOCK', label: 'Inventory Logs', icon: <Truck size={18} /> },
  { id: 'INSIGHTS', label: 'AI Executive Insights', icon: <Zap size={18} /> },
];

const mockSales = [
  { date: 'Oct 01', petrol: 4200, diesel: 3100, testLiters: 10 },
  { date: 'Oct 02', petrol: 3800, diesel: 3400, testLiters: 0 },
  { date: 'Oct 03', petrol: 4500, diesel: 3200, testLiters: 5 },
  { date: 'Oct 04', petrol: 4100, diesel: 3800, testLiters: 0 },
  { date: 'Oct 05', petrol: 3900, diesel: 4000, testLiters: 20 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ReportTab>('SALES');
  const [dateRange, setDateRange] = useState('This Month');

  // --- Helper Component for KPIs ---
  const ReportKPI = ({ label, value, sub, colorClass, icon: Icon }: any) => (
      <div className={`p-4 rounded-xl border ${colorClass} bg-white shadow-sm`}>
          <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${colorClass.replace('border', 'bg').replace('200', '50')}`}>
                  <Icon size={16} className={colorClass.replace('border-', 'text-').replace('-200', '-600')} />
              </div>
              <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{value}</h3>
          {sub && <p className="text-[10px] font-medium text-slate-400 mt-1">{sub}</p>}
      </div>
  );

  // --- Render Functions ---
  const renderSalesReports = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ReportKPI label="Net Volume" value="142,500 L" sub="Excl. Test Liters" colorClass="border-indigo-200" icon={Droplet} />
        <ReportKPI label="Total Revenue" value="Rs. 41.2M" colorClass="border-emerald-200" icon={DollarSign} />
        <ReportKPI label="Test Liters" value="45 L" sub="-Rs. 12,600 Cost" colorClass="border-rose-200" icon={Calculator} />
        <ReportKPI label="Discounts" value="Rs. 12,500" colorClass="border-amber-200" icon={Banknote} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard title="Sales vs Test Liters" className="lg:col-span-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <ComposedChart data={mockSales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="petrol" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={2} />
                <Area yAxisId="left" type="monotone" dataKey="diesel" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="testLiters" stroke="#f43f5e" strokeWidth={2} dot={{r:4}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard title="Audit Log">
            <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-xl border border-rose-100">
                    <div className="p-2 bg-white rounded-full text-rose-500 shadow-sm"><Calculator size={16}/></div>
                    <div>
                        <p className="text-sm font-bold text-slate-800">Pump Calibration</p>
                        <p className="text-xs text-slate-500">45L Dispensed for testing</p>
                    </div>
                    <span className="ml-auto text-rose-600 font-bold text-sm">-45 L</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="p-2 bg-white rounded-full text-amber-500 shadow-sm"><Banknote size={16}/></div>
                    <div>
                        <p className="text-sm font-bold text-slate-800">Promo Discounts</p>
                        <p className="text-xs text-slate-500">Loyalty program waivers</p>
                    </div>
                    <span className="ml-auto text-amber-600 font-bold text-sm">Rs. 12k</span>
                </div>
            </div>
        </GlassCard>
      </div>

      <GlassCard title="Detailed Ledger" noPadding className="overflow-hidden">
          <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold border-b border-slate-200">
                  <tr>
                      <th className="p-4">Date</th>
                      <th className="p-4">Product</th>
                      <th className="p-4 text-right">Meter Sale</th>
                      <th className="p-4 text-right text-rose-500">Test/Audit</th>
                      <th className="p-4 text-right">Net Sale</th>
                      <th className="p-4 text-right font-black text-slate-900">Cash Value</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                  {[1,2,3,4].map(i => (
                      <tr key={i} className="hover:bg-slate-50">
                          <td className="p-4 text-slate-600">Oct 0{i}, 2023</td>
                          <td className="p-4"><span className="text-xs font-bold px-2 py-1 rounded bg-indigo-50 text-indigo-600">Petrol</span></td>
                          <td className="p-4 text-right text-slate-600 font-mono">1,000 L</td>
                          <td className="p-4 text-right text-rose-500 font-mono font-bold">- 5 L</td>
                          <td className="p-4 text-right text-slate-900 font-mono font-bold">995 L</td>
                          <td className="p-4 text-right text-emerald-600 font-mono font-black">Rs. 278,600</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </GlassCard>
    </div>
  );

  const renderInsights = () => (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 flex items-start gap-6">
                  <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner">
                      <Zap size={40} className="text-yellow-300" fill="currentColor" />
                  </div>
                  <div>
                      <h2 className="text-3xl font-black tracking-tight">AI Executive Summary</h2>
                      <p className="text-indigo-100 text-lg mt-1 max-w-2xl">Based on your sales velocity, you will need to restock <span className="font-bold text-white">Diesel</span> within 28 hours. Efficiency on Night Shift has dropped by 5%.</p>
                      <button className="mt-6 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-colors">
                          View Full Analysis
                      </button>
                  </div>
              </div>
              {/* Decorative BG */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard>
                  <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><TrendingUp size={20}/></div>
                      <h3 className="font-bold text-slate-900">Diesel Demand</h3>
                  </div>
                  <p className="text-slate-500 text-sm mb-3">Projected increase of <span className="text-emerald-600 font-bold">+15%</span> this weekend due to harvest season traffic.</p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[75%]"></div>
                  </div>
              </GlassCard>
              <GlassCard>
                  <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><BadgeAlert size={20}/></div>
                      <h3 className="font-bold text-slate-900">Fraud Detection</h3>
                  </div>
                  <p className="text-slate-500 text-sm mb-3">Vehicle <span className="font-mono font-bold text-slate-700">LEA-123</span> refueled twice in 30 mins. System flagged as potential meter manipulation.</p>
                  <button className="text-xs font-bold text-amber-600 uppercase hover:underline">Review Camera Log</button>
              </GlassCard>
              <GlassCard>
                  <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Users size={20}/></div>
                      <h3 className="font-bold text-slate-900">Staff Alert</h3>
                  </div>
                  <p className="text-slate-500 text-sm mb-3">Cash shortage frequency is highest during <span className="font-bold text-slate-700">Night Shift</span> (Mike Ross).</p>
                  <button className="text-xs font-bold text-rose-600 uppercase hover:underline">View Shift Report</button>
              </GlassCard>
          </div>
      </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen pb-20">
        <div className="w-full lg:w-64 flex-shrink-0 space-y-2">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 border ${
                        activeTab === tab.id 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                        : 'bg-white text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                    {tab.icon}
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>

        <div className="flex-1 space-y-6">
            <GlassCard className="flex justify-between items-center p-4">
                <h2 className="text-xl font-black text-slate-900">{tabs.find(t => t.id === activeTab)?.label}</h2>
                <div className="flex gap-2">
                    {['Day', 'Week', 'Month'].map(r => (
                        <button key={r} onClick={() => setDateRange(r)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${dateRange === r ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>{r}</button>
                    ))}
                    <div className="w-px h-8 bg-slate-200 mx-2"></div>
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"><Printer size={18} /></button>
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"><Download size={18} /></button>
                </div>
            </GlassCard>
            {activeTab === 'SALES' && renderSalesReports()}
            {activeTab === 'INSIGHTS' && renderInsights()}
            {/* Other tabs would follow similar pattern */}
        </div>
    </div>
  );
};