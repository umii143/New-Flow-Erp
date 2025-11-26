import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Droplet, Users, Truck, Wallet, Settings as SettingsIcon, Menu, X, 
  Zap, FileText, Activity, UserCog, LogOut, ChevronRight, Bell, Clock, AlertTriangle, Container
} from 'lucide-react';
import { Dashboard } from './views/Dashboard';
import { FuelSales } from './views/FuelSales';
import { LubeSales } from './views/LubeSales';
import { Customers } from './views/Customers';
import { Stock } from './views/Stock';
import { Expenses } from './views/Expenses';
import { Analytics } from './views/Analytics';
import { Settings } from './views/Settings';
import { Reports } from './views/Reports';
import { DailyClosing } from './views/DailyClosing';
import { Staff } from './views/Staff';
import { Suppliers } from './views/Suppliers';
import { AppView, MenuItem } from './types';

const menuItems: MenuItem[] = [
  { id: AppView.DASHBOARD, label: 'Overview', icon: <LayoutDashboard size={20} /> },
  { id: AppView.FUEL_SALES, label: 'Fuel POS', icon: <Droplet size={20} /> },
  { id: AppView.DAILY_CLOSING, label: 'Shift Closing', icon: <Activity size={20} /> },
  { id: AppView.STOCK, label: 'Inventory', icon: <Truck size={20} /> },
  { id: AppView.SUPPLIERS, label: 'Procurement', icon: <Container size={20} /> },
  { id: AppView.CUSTOMERS, label: 'Customers', icon: <Users size={20} /> },
  { id: AppView.LUBE_SALES, label: 'Lube Store', icon: <Zap size={20} /> },
  { id: AppView.EXPENSES, label: 'Expenses', icon: <Wallet size={20} /> },
  { id: AppView.STAFF, label: 'HR & Staff', icon: <UserCog size={20} /> },
  { id: AppView.REPORTS, label: 'Reports', icon: <FileText size={20} /> },
  { id: AppView.SETTINGS, label: 'Settings', icon: <SettingsIcon size={20} /> },
];

export default function App() {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

  // Clock Logic
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
        setIsMobile(true);
      } else {
        setIsSidebarOpen(true);
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
        clearInterval(timer);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long' });
  };

  // Mock Notifications with Security Alerts
  const notifications = [
      { id: 1, title: 'System Ready', msg: 'All systems operational.', type: 'info', time: 'Just now' },
  ];

  const renderContent = () => {
    switch (activeView) {
      case AppView.DASHBOARD: 
        return <Dashboard onNavigate={(view) => setActiveView(view)} />;
      case AppView.DAILY_CLOSING: return <DailyClosing />;
      case AppView.FUEL_SALES: return <FuelSales />;
      case AppView.LUBE_SALES: return <LubeSales />;
      case AppView.CUSTOMERS: return <Customers />;
      case AppView.STOCK: return <Stock />;
      case AppView.SUPPLIERS: return <Suppliers />;
      case AppView.EXPENSES: return <Expenses />;
      case AppView.ANALYTICS: return <Analytics />;
      case AppView.SETTINGS: return <Settings />;
      case AppView.REPORTS: return <Reports />;
      case AppView.STAFF: return <Staff />;
      default: return <Dashboard onNavigate={(view) => setActiveView(view)} />;
    }
  };

  return (
    <div className="h-[100dvh] bg-[#F1F5F9] font-sans text-slate-900 flex flex-col lg:flex-row overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Mobile Header */}
      <div className="lg:hidden flex-none z-40 bg-white shadow-sm p-4 flex items-center justify-between border-b border-slate-200 relative">
          <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                  <Activity size={18} className="text-white" />
              </div>
              <span className="font-bold text-slate-900 tracking-tight">FuelFlow</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
      </div>

      {/* Mobile Backdrop */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 z-[90] bg-slate-900/20 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* White Premium Sidebar - Z-Index 100 ensures it is ALWAYS on top of search bars */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-[100] w-72 bg-white border-r border-slate-200 shadow-2xl lg:shadow-none transition-transform duration-300 ease-out flex flex-col h-full
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-24 lg:hover:w-72 group'}
          ${isMobile ? 'top-0' : ''}
        `}
      >
        {/* Logo Area */}
        <div className="h-24 flex-none flex items-center px-6 border-b border-slate-50 relative">
            {isMobile && (
                <button onClick={() => setIsSidebarOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400">
                    <X size={20} />
                </button>
            )}
            <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap">
                <div className="min-w-[44px] w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 text-white transform transition-transform hover:scale-105">
                    <Activity size={24} />
                </div>
                <div className={`transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:group-hover:opacity-100'}`}>
                    <h1 className="font-bold text-xl text-slate-900 tracking-tight">FuelFlow</h1>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enterprise v5.0</p>
                </div>
            </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
                <button
                key={item.id}
                onClick={() => {
                    setActiveView(item.id);
                    if(isMobile) setIsSidebarOpen(false);
                }}
                className={`
                    w-full flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 relative group/item overflow-hidden whitespace-nowrap
                    ${isActive ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                `}
                >
                <div className={`
                    min-w-[24px] flex items-center justify-center transition-colors duration-300
                    ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover/item:text-slate-600'}
                `}>
                    {item.icon}
                </div>
                
                <span className={`font-semibold text-sm transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:group-hover:opacity-100'}`}>
                    {item.label}
                </span>
                
                {isActive && isSidebarOpen && (
                    <ChevronRight size={16} className="ml-auto text-indigo-500" />
                )}
                </button>
            );
          })}
        </nav>

        {/* Footer Profile */}
        <div className="flex-none p-4 border-t border-slate-100 bg-slate-50/50">
            <div className={`flex items-center gap-3 overflow-hidden whitespace-nowrap transition-all ${isSidebarOpen ? '' : 'justify-center'}`}>
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-md">
                        SA
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className={`transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:group-hover:opacity-100'}`}>
                    <p className="text-sm font-bold text-slate-800">Station Admin</p>
                    <button className="text-[11px] text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-1 mt-0.5 transition-colors">
                        <LogOut size={10} /> Sign Out
                    </button>
                </div>
            </div>
            {isSidebarOpen && (
                <div className="mt-4 text-center">
                    <p className="text-[9px] text-slate-300 font-medium font-mono tracking-widest uppercase">Designed or Powered by</p>
                    <p className="text-[10px] text-indigo-400 font-bold font-mono uppercase tracking-wider">Umar Ali</p>
                </div>
            )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative p-4 lg:p-8 pb-24 lg:pb-12 scroll-smooth">
          {/* Top Bar for Desktop */}
          <header className="hidden lg:flex justify-between items-center mb-8 sticky top-0 z-40 bg-[#F1F5F9]/95 backdrop-blur-md py-2 transition-all border-b border-transparent">
              <div>
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                   {menuItems.find(i => i.id === activeView)?.label || 'Dashboard'}
                 </h2>
                 <p className="text-sm text-slate-500 mt-1 font-medium">System operational • All systems normal</p>
              </div>
              
              <div className="flex items-center gap-4">
                  
                  {/* Clock Widget */}
                  <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                      <div className="text-right">
                          <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">{formatDate(currentTime)}</p>
                          <p className="text-sm font-black text-indigo-600 font-mono leading-none">{formatTime(currentTime)}</p>
                      </div>
                      <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                          <Clock size={18} />
                      </div>
                  </div>

                  <div className="h-8 w-px bg-slate-200 mx-2"></div>

                  {/* Notifications */}
                  <div className="relative">
                      <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition-all group"
                      >
                          <Bell className="text-slate-400 group-hover:text-indigo-600 transition-colors" size={20} />
                          {notifications.length > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-white animate-pulse"></span>}
                      </button>

                      {showNotifications && (
                          <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fade-in origin-top-right">
                              <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                  <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
                                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">{notifications.length} New</span>
                              </div>
                              <div className="max-h-64 overflow-y-auto">
                                  {notifications.map(n => (
                                      <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                                          <div className={`mt-1 p-1.5 rounded-full h-fit ${n.type === 'critical' ? 'bg-rose-100 text-rose-600' : n.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-sky-100 text-sky-600'}`}>
                                              {n.type === 'critical' ? <AlertTriangle size={14} /> : <Zap size={14} />}
                                          </div>
                                          <div>
                                              <p className="text-xs font-bold text-slate-800">{n.title}</p>
                                              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.msg}</p>
                                              <p className="text-[10px] text-slate-400 mt-2 font-medium">{n.time}</p>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                              <div className="p-2 text-center bg-slate-50 border-t border-slate-100">
                                  <button className="text-[10px] font-bold text-indigo-600 uppercase hover:text-indigo-700">Mark all read</button>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </header>

          <div className="max-w-7xl mx-auto min-h-full animate-fade-in">
             {renderContent()}
          </div>
      </main>
    </div>
  );
}