import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { StaffMember } from '../types';
import { User, Plus, Minus, Briefcase, Clock, Calendar } from 'lucide-react';

const MOCK_STAFF: StaffMember[] = [
    { id: 'ST-01', name: 'Ahmed Khan', role: 'Pump Attendant', baseSalary: 25000, currentAdvances: 2000, attendance: 24, overtimeHours: 10, status: 'Active' },
    { id: 'ST-02', name: 'Sarah Ali', role: 'Cashier', baseSalary: 30000, currentAdvances: 0, attendance: 26, overtimeHours: 0, status: 'Active' },
    { id: 'ST-03', name: 'Mike Ross', role: 'Supervisor', baseSalary: 45000, currentAdvances: 5000, attendance: 25, overtimeHours: 20, status: 'Active' },
];

export const Staff: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const calculateNetSalary = (staff: StaffMember) => {
      const perDay = staff.baseSalary / 30;
      const otRate = (staff.baseSalary / 30) / 8 * 1.5;
      const gross = (perDay * staff.attendance) + (otRate * staff.overtimeHours);
      return gross - staff.currentAdvances;
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
          <div>
              <h1 className="text-2xl font-black text-slate-900">HR & Payroll</h1>
              <p className="text-slate-500 text-sm">Manage staff attendance and salaries.</p>
          </div>
          <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 flex items-center gap-2 transition-transform hover:-translate-y-0.5">
              <Plus size={18} /> Add Employee
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee List */}
          <GlassCard className="lg:col-span-2" title="Employee Directory">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_STAFF.map(staff => (
                      <div 
                        key={staff.id} 
                        onClick={() => setSelectedStaff(staff)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden group ${
                            selectedStaff?.id === staff.id 
                            ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                            : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md'
                        }`}
                      >
                          <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${selectedStaff?.id === staff.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                      {staff.name.substring(0,2)}
                                  </div>
                                  <div>
                                      <h4 className="text-slate-900 font-bold text-lg">{staff.name}</h4>
                                      <p className="text-xs text-slate-500 font-medium">{staff.role}</p>
                                  </div>
                              </div>
                              <span className="px-2 py-1 rounded-lg text-[10px] bg-emerald-100 text-emerald-700 font-bold uppercase border border-emerald-200">{staff.status}</span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3 text-xs">
                              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                                  <p className="text-slate-400 font-bold uppercase text-[10px]">Base Pay</p>
                                  <p className="text-slate-900 font-mono font-bold">Rs.{staff.baseSalary.toLocaleString()}</p>
                              </div>
                              <div className="p-2 bg-rose-50 rounded-lg border border-rose-100">
                                  <p className="text-rose-400 font-bold uppercase text-[10px]">Advance</p>
                                  <p className="text-rose-700 font-mono font-bold">Rs.{staff.currentAdvances.toLocaleString()}</p>
                              </div>
                              <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                                  <p className="text-emerald-400 font-bold uppercase text-[10px]">Est. Net</p>
                                  <p className="text-emerald-700 font-mono font-black">Rs.{calculateNetSalary(staff).toFixed(0)}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </GlassCard>

          {/* Action Panel */}
          <div className="space-y-6">
              <GlassCard title={selectedStaff ? `Manage: ${selectedStaff.name}` : 'Select Employee'}>
                  {selectedStaff ? (
                      <div className="space-y-4">
                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                              <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                                  <Calendar size={16} /> Attendance
                              </div>
                              <div className="flex items-center gap-3">
                                  <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-600"><Minus size={14} /></button>
                                  <span className="text-slate-900 font-mono font-bold w-6 text-center">{selectedStaff.attendance}</span>
                                  <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 shadow-sm"><Plus size={14} /></button>
                              </div>
                          </div>

                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                              <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                                  <Clock size={16} /> Overtime (Hrs)
                              </div>
                              <div className="flex items-center gap-3">
                                  <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-600"><Minus size={14} /></button>
                                  <span className="text-slate-900 font-mono font-bold w-6 text-center">{selectedStaff.overtimeHours}</span>
                                  <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 shadow-sm"><Plus size={14} /></button>
                              </div>
                          </div>

                          <div className="pt-6 border-t border-slate-100">
                              <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Quick Actions</h4>
                              <div className="space-y-2">
                                   <button className="w-full py-3 bg-white border border-rose-200 text-rose-600 font-bold text-sm rounded-xl hover:bg-rose-50 transition-colors flex justify-center items-center gap-2">
                                       Give Advance Salary
                                   </button>
                                   <button className="w-full py-3 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                                       Update Profile
                                   </button>
                              </div>
                          </div>
                      </div>
                  ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                              <User size={32} className="opacity-50" />
                          </div>
                          <p className="text-sm font-medium">Select a staff member to view details</p>
                      </div>
                  )}
              </GlassCard>
          </div>
      </div>
    </div>
  );
};