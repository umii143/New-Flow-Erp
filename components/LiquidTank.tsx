import React from 'react';
import { TankStatus } from '../types';

interface LiquidTankProps {
  tank: TankStatus;
}

export const LiquidTank: React.FC<LiquidTankProps> = ({ tank }) => {
  const percentage = (tank.currentLevel / tank.capacity) * 100;
  
  const getColors = (type: string) => {
    switch(type) {
      case 'Petrol': return {
        liquid: 'from-cyan-400 to-cyan-600',
        text: 'text-cyan-700'
      };
      case 'Diesel': return {
        liquid: 'from-amber-400 to-amber-600',
        text: 'text-amber-700'
      };
      case 'Hi-Octane': return {
        liquid: 'from-fuchsia-400 to-fuchsia-600',
        text: 'text-fuchsia-700'
      };
      default: return {
        liquid: 'from-slate-400 to-slate-600',
        text: 'text-slate-700'
      };
    }
  };

  const colors = getColors(tank.fuelType);

  return (
    <div className="relative h-72 w-full rounded-2xl bg-slate-100 overflow-hidden shadow-inner border border-slate-200 group transition-all duration-500 hover:shadow-lg">
        
        {/* Measurement Scale */}
        <div className="absolute right-0 top-0 bottom-0 w-12 flex flex-col justify-between py-6 pr-2 z-20 pointer-events-none">
            {[100, 75, 50, 25, 0].map(mark => (
                <div key={mark} className="flex items-center justify-end gap-1">
                    <span className="text-[9px] font-mono text-slate-400">{mark}%</span>
                    <div className="w-2 h-[1px] bg-slate-300"></div>
                </div>
            ))}
        </div>

        {/* Liquid Container */}
        <div className="absolute inset-0 z-10">
            {/* The Liquid */}
            <div 
                className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ease-in-out bg-gradient-to-t ${colors.liquid} opacity-90`}
                style={{ height: `${percentage}%`, boxShadow: '0 -5px 15px rgba(0,0,0,0.1)' }}
            >
                {/* Surface Line */}
                <div className="absolute top-0 w-full h-1 bg-white/50"></div>
                
                {/* Animated Waves */}
                <div className="wave-container opacity-50 mix-blend-overlay"></div>
                <div className="wave-container opacity-30 mix-blend-overlay" style={{ animationDelay: '-3s', bottom: '-5px' }}></div>
            </div>

             {/* Water Level Indicator */}
            {tank.waterLevel > 0 && (
                 <div 
                    className="absolute bottom-0 left-0 w-full bg-blue-600/90 z-20 border-t border-blue-400"
                    style={{ height: `${Math.max(tank.waterLevel * 2, 6)}px` }}
                 ></div>
            )}
        </div>

        {/* Info Overlay */}
        <div className="absolute top-6 left-6 z-40">
            <h4 className="text-2xl font-black text-slate-800 tracking-tight uppercase">{tank.fuelType}</h4>
            <div className="flex flex-col mt-1">
                <span className={`text-sm font-mono font-bold tracking-wider ${colors.text}`}>
                    {tank.currentLevel.toLocaleString()} <span className="text-xs text-slate-500">L</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Cap: {tank.capacity / 1000}k</span>
            </div>
        </div>

        {/* Status Badge */}
        <div className={`
            absolute top-6 right-6 z-40 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border
            ${tank.status === 'Critical' ? 'bg-white/80 text-rose-600 border-rose-100 animate-pulse' : 
              tank.status === 'Low' ? 'bg-white/80 text-amber-600 border-amber-100' : 
              'bg-white/80 text-emerald-600 border-emerald-100'}
        `}>
            {tank.status}
        </div>
    </div>
  );
};