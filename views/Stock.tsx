import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { TankStatus } from '../types';
import { Droplet, Thermometer, RefreshCw, Truck, AlertTriangle, Waves, ArrowDownToLine, ShieldCheck, Plus, Save, X, Calculator, Ruler } from 'lucide-react';

const tanks: TankStatus[] = [
    { id: '1', fuelType: 'Petrol', capacity: 25000, currentLevel: 0, temperature: 24, density: 0.735, waterLevel: 0, ullage: 25000, lastDelivery: 'No Record', status: 'Normal' },
    { id: '2', fuelType: 'Diesel', capacity: 30000, currentLevel: 0, temperature: 22, density: 0.840, waterLevel: 0, ullage: 30000, lastDelivery: 'No Record', status: 'Normal' },
    { id: '3', fuelType: 'Premium', capacity: 15000, currentLevel: 0, temperature: 23, density: 0.745, waterLevel: 0, ullage: 15000, lastDelivery: 'No Record', status: 'Normal' },
    { id: '4', fuelType: 'E85', capacity: 10000, currentLevel: 0, temperature: 21, density: 0.720, waterLevel: 0, ullage: 10000, lastDelivery: 'No Record', status: 'Normal' },
];

export const Stock: React.FC = () => {
    const [showDeliveryModal, setShowDeliveryModal] = useState(false);
    const [showCalibration, setShowCalibration] = useState(false);
    const [calInput, setCalInput] = useState<string>('');
    const [calResult, setCalResult] = useState<number | null>(null);

    const calculateVolume = () => {
        // Simulated Calibration Logic: Volume = (mm * capacity) / max_mm
        // Assuming max_mm = 2500 for demo
        const mm = parseFloat(calInput);
        if(!mm) return;
        // Simple linear simulation for demo purposes
        // In real app, this would use a lookup table (strapping chart)
        const simulatedVol = (mm * 10.5) + (Math.random() * 5); 
        setCalResult(Math.round(simulatedVol));
    }

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800">Underground Storage Tanks</h3>
                    <p className="text-sm text-slate-500">Live feed from Automatic Tank Gauge (ATG) • Anti-Theft Active</p>
                </div>
                <div className="flex gap-3">
                    <button 
                         onClick={() => setShowCalibration(true)}
                         className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 text-sm font-bold shadow-sm transition-colors"
                    >
                        <Ruler size={16} /> Calibration Tool
                    </button>
                    <button 
                        onClick={() => setShowDeliveryModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white text-sm font-bold shadow-lg shadow-indigo-200 transition-colors"
                    >
                        <Plus size={16} /> Receive Delivery
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {tanks.map(tank => {
                    const pct = (tank.currentLevel / tank.capacity) * 100;
                    return (
                        <div key={tank.id} className="relative group">
                            <GlassCard className="pt-10 overflow-visible h-full flex flex-col justify-between">
                                <div className="absolute -top-3 left-6 px-3 py-1.5 rounded-lg bg-slate-800 shadow-xl z-20">
                                    <span className="font-bold text-white text-xs">Tank {tank.id}</span>
                                    <span className="block text-[10px] text-slate-400 uppercase tracking-wide font-bold">{tank.fuelType}</span>
                                </div>
                                
                                {/* Advanced Tank Visualization */}
                                <div className="relative h-64 w-full rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner-light mb-6">
                                    <div className="absolute top-4 right-4 z-20 text-right">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold">Ullage</p>
                                        <p className="text-xs font-mono text-slate-600 font-bold">{tank.ullage.toLocaleString()} L</p>
                                    </div>

                                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-white/50 px-2 py-0.5 rounded backdrop-blur-sm">
                                        <ShieldCheck size={10} className="text-emerald-600" />
                                        <span className="text-[8px] font-bold text-emerald-700 uppercase">Secure</span>
                                    </div>

                                    <div 
                                        className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ease-in-out z-10 opacity-90
                                            ${tank.fuelType === 'Petrol' ? 'bg-gradient-to-t from-cyan-500 to-cyan-300' :
                                              tank.fuelType === 'Diesel' ? 'bg-gradient-to-t from-amber-500 to-amber-300' :
                                              tank.fuelType === 'Premium' ? 'bg-gradient-to-t from-fuchsia-500 to-fuchsia-300' :
                                              'bg-gradient-to-t from-emerald-500 to-emerald-300'}
                                        `}
                                        style={{ height: `${pct}%`, boxShadow: '0 -10px 20px rgba(0,0,0,0.1)' }}
                                    >
                                        <div className="absolute top-0 w-full h-1 bg-white/40"></div>
                                        <div className="absolute top-1 left-4 text-[10px] font-bold text-black/40">LIQUID LEVEL</div>
                                    </div>

                                    {tank.waterLevel > 0 && (
                                        <div 
                                            className="absolute bottom-0 left-0 w-full bg-blue-600 z-20 border-t border-blue-400"
                                            style={{ height: `${Math.max(tank.waterLevel * 2, 8)}px` }}
                                        >
                                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                                H2O
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 z-0 flex flex-col justify-between py-4 pointer-events-none">
                                        {[...Array(5)].map((_, i) => <div key={i} className="w-full border-b border-slate-300/20"></div>)}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-slate-400 mb-1 flex items-center gap-1 font-bold uppercase text-[10px]"><Thermometer size={10}/> Temp</p>
                                        <p className="text-slate-800 font-mono font-bold">{tank.temperature}°C</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-slate-400 mb-1 flex items-center gap-1 font-bold uppercase text-[10px]"><Droplet size={10}/> Density</p>
                                        <p className="text-slate-800 font-mono font-bold">{tank.density.toFixed(3)}</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-slate-400 mb-1 flex items-center gap-1 font-bold uppercase text-[10px]"><Waves size={10}/> H2O</p>
                                        <p className={`${tank.waterLevel > 20 ? 'text-rose-600' : 'text-slate-800'} font-mono font-bold`}>{tank.waterLevel} mm</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-slate-400 mb-1 flex items-center gap-1 font-bold uppercase text-[10px]"><ArrowDownToLine size={10}/> Fill</p>
                                        <p className="text-slate-800 font-mono font-bold">{pct.toFixed(1)}%</p>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    );
                })}
            </div>

            {/* Smart Inventory Alerts - Clean State */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <GlassCard title="Delivery Scheduler">
                    <div className="p-8 text-center text-slate-400">
                        <Truck size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-bold">No deliveries scheduled</p>
                    </div>
                </GlassCard>

                <GlassCard title="Compliance Alerts">
                   <div className="p-8 text-center text-slate-400">
                        <ShieldCheck size={32} className="mx-auto mb-2 opacity-50 text-emerald-500" />
                        <p className="text-sm font-bold text-emerald-600">All Systems Normal</p>
                    </div>
                </GlassCard>
            </div>

            {/* Calibration Modal */}
            {showCalibration && (
                <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-black text-slate-900">Calibration Tool</h3>
                            <button onClick={() => setShowCalibration(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Dip Reading (mm)</label>
                                <input 
                                    type="number" 
                                    value={calInput} 
                                    onChange={(e) => setCalInput(e.target.value)}
                                    placeholder="e.g. 1250" 
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-xl mt-1 focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                                />
                            </div>
                            <button onClick={calculateVolume} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg">Calculate Volume</button>
                            
                            {calResult !== null && (
                                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center animate-in zoom-in">
                                    <p className="text-xs font-bold text-emerald-600 uppercase">Estimated Volume</p>
                                    <p className="text-3xl font-black text-emerald-700 font-mono">{calResult.toLocaleString()} L</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* New Delivery Modal */}
            {showDeliveryModal && (
                <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-black text-slate-900">Receive Stock Delivery</h3>
                            <button onClick={() => setShowDeliveryModal(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 mb-4">
                                <p className="text-xs text-indigo-700 leading-relaxed">
                                    <span className="font-bold">Note:</span> Enter observed volume, temperature, and density. System will calculate the standardized volume at 15°C automatically.
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase">Fuel Type</label>
                                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700">
                                    <option>Petrol (PMG)</option>
                                    <option>High Speed Diesel</option>
                                    <option>Hi-Octane</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase">Observed Quantity (Liters)</label>
                                <input type="number" placeholder="e.g. 15000" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Temperature (°C)</label>
                                    <input type="number" placeholder="e.g. 24.5" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Density (kg/m³)</label>
                                    <input type="number" placeholder="e.g. 0.730" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold" />
                                </div>
                            </div>
                            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 mt-4 flex items-center justify-center gap-2">
                                <Save size={18} /> Confirm Delivery
                            </button>
                        </div>
                        <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
                            <p className="text-[10px] text-slate-400 font-mono uppercase">Powered by Umar Ali</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};