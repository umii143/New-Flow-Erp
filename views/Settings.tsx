import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Save, User, Lock, Shield, Building, Settings2, MapPin, Phone, ChevronRight, Globe } from 'lucide-react';

export const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'config' | 'security'>('profile');

    const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
        <button 
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3 px-6 py-4 w-full text-left transition-all border-l-4 ${
                activeTab === id 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
        >
            <Icon size={18} />
            <span className="font-bold text-sm">{label}</span>
            {activeTab === id && <ChevronRight size={14} className="ml-auto" />}
        </button>
    );

    const InputField = ({ label, icon: Icon, defaultValue, type = "text" }: any) => (
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
            <div className="relative group">
                {Icon && <Icon className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />}
                <input 
                    type={type} 
                    defaultValue={defaultValue} 
                    className={`w-full bg-slate-50 border border-slate-200 rounded-xl ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 text-slate-900 font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder-slate-400`} 
                />
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto pb-20">
             <div className="flex flex-col md:flex-row gap-8">
                 {/* Sidebar Navigation */}
                 <div className="w-full md:w-64 flex-shrink-0">
                     <GlassCard className="p-0 overflow-hidden sticky top-24" noPadding>
                         <div className="p-6 border-b border-slate-100">
                             <h2 className="text-lg font-black text-slate-900">Settings</h2>
                             <p className="text-xs text-slate-500 font-medium mt-1">Station Configuration</p>
                         </div>
                         <div className="py-2">
                             <TabButton id="profile" label="Station Profile" icon={Building} />
                             <TabButton id="config" label="Preferences" icon={Settings2} />
                             <TabButton id="security" label="Access Control" icon={Shield} />
                         </div>
                     </GlassCard>
                 </div>

                 {/* Main Content */}
                 <div className="flex-1 space-y-6">
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <GlassCard title="Station Identity">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="Station Name" defaultValue="Shell Downtown" />
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">OMC (Brand)</label>
                                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:border-indigo-500 outline-none appearance-none">
                                            <option>Shell Pakistan</option>
                                            <option>PSO (Pakistan State Oil)</option>
                                            <option>Total Parco</option>
                                            <option>Attock Petroleum</option>
                                        </select>
                                    </div>
                                    <InputField label="Owner Name" icon={User} defaultValue="Muhammad Ali" />
                                    <InputField label="Phone Number" icon={Phone} defaultValue="+92 300 1234567" />
                                </div>
                            </GlassCard>

                            <GlassCard title="Location Data">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <InputField label="City" icon={Building} defaultValue="Lahore" />
                                     <InputField label="Full Address" icon={MapPin} defaultValue="Plot 45, Main G.T Road, Near DHA Phase 5" />
                                </div>
                            </GlassCard>
                        </div>
                    )}

                    {activeTab === 'config' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <GlassCard title="Regional Settings">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Currency</label>
                                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium outline-none">
                                            <option>PKR (Rs.)</option>
                                            <option>USD ($)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Language</label>
                                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium outline-none">
                                            <option>English (UK)</option>
                                            <option>Urdu (Pakistan)</option>
                                        </select>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <GlassCard title="Security Protocols">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-white text-indigo-600 rounded-lg shadow-sm border border-slate-200"><Lock size={20} /></div>
                                            <div>
                                                <h4 className="text-slate-900 font-bold text-sm">Manager Password</h4>
                                                <p className="text-xs text-slate-500">Last changed 30 days ago</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 shadow-sm">Change</button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-white text-emerald-600 rounded-lg shadow-sm border border-slate-200"><Shield size={20} /></div>
                                            <div>
                                                <h4 className="text-slate-900 font-bold text-sm">Two-Factor Auth</h4>
                                                <p className="text-xs text-slate-500">Secure shift closing with OTP</p>
                                            </div>
                                        </div>
                                        <div className="w-11 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                                            <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <button className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all font-bold text-sm shadow-lg shadow-indigo-200 hover:-translate-y-0.5">
                            <Save size={16} /> Save Changes
                        </button>
                    </div>
                 </div>
             </div>
        </div>
    );
};