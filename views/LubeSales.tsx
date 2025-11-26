import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { LubeProduct } from '../types';
import { ShoppingCart, Package, AlertTriangle, Briefcase, Search, Filter, ArrowUpRight } from 'lucide-react';

const products: LubeProduct[] = [
    { id: '1', name: 'Shell Helix Ultra 5W-40', category: 'Engine Oil', stock: 145, price: 8500.00, sku: 'OIL-SYN-5W40' },
    { id: '2', name: 'Shell Rimula R4', category: 'Diesel Oil', stock: 32, price: 6200.00, sku: 'OIL-RIM-R4' },
    { id: '3', name: 'Brake Fluid DOT 4', category: 'Fluids', stock: 56, price: 850.00, sku: 'FLD-BRK-DOT4' },
    { id: '4', name: 'Coolant 1L', category: 'Coolant', stock: 89, price: 1200.00, sku: 'CLT-1L' },
    { id: '5', name: 'MP Grease Tub', category: 'Grease', stock: 200, price: 450.00, sku: 'GRS-MP' },
    { id: '6', name: 'Car Wash Token', category: 'Services', stock: 999, price: 1500.00, sku: 'SRV-WASH' },
];

export const LubeSales: React.FC = () => {
  return (
    <div className="space-y-6 pb-20">
        {/* Header emphasizing Separate Business Unit */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform rotate-12 scale-150">
                <Briefcase size={140} />
            </div>
            <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-inner">
                        <Briefcase size={28} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-white">Lube & Services</h2>
                        <p className="text-orange-100 font-medium">Independent Profit Center</p>
                    </div>
                </div>
                <div className="text-right bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
                    <p className="text-orange-100 text-xs uppercase font-bold tracking-wider">Today's Net Profit</p>
                    <p className="text-3xl font-black text-white">Rs. 45,000</p>
                </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-premium flex items-center gap-4">
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                    <ShoppingCart size={24} />
                </div>
                <div>
                    <p className="text-slate-500 text-xs font-bold uppercase">Daily Revenue</p>
                    <h3 className="text-2xl font-black text-slate-900">Rs. 124k</h3>
                </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-premium flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                    <Package size={24} />
                </div>
                <div>
                    <p className="text-slate-500 text-xs font-bold uppercase">Units Sold</p>
                    <h3 className="text-2xl font-black text-slate-900">45 <span className="text-sm font-medium text-slate-400">Items</span></h3>
                </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-premium flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                    <AlertTriangle size={24} />
                </div>
                <div>
                    <p className="text-slate-500 text-xs font-bold uppercase">Low Stock</p>
                    <h3 className="text-2xl font-black text-slate-900">3 <span className="text-sm font-medium text-slate-400">Alerts</span></h3>
                </div>
            </div>
        </div>

        {/* Actions & Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Package className="text-indigo-600" size={20}/> Retail Inventory
            </h3>
            <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search product or SKU..." 
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm font-medium"
                    />
                </div>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm shadow-sm hover:bg-slate-50 flex items-center gap-2">
                    <Filter size={16} /> Filter
                </button>
            </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <GlassCard key={product.id} hoverEffect className="group border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                            {product.category}
                        </span>
                        {product.stock < 10 && (
                            <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-[10px] font-bold border border-amber-100">
                                <AlertTriangle size={10} /> LOW STOCK
                            </span>
                        )}
                    </div>
                    
                    <div className="mb-4 relative">
                        <div className="h-32 w-full rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-indigo-50/50 transition-colors duration-300">
                             <Package size={48} className="text-slate-300 group-hover:text-indigo-300 transition-colors" />
                        </div>
                        <h4 className="text-lg font-black text-slate-800 leading-tight">{product.name}</h4>
                        <p className="text-slate-400 text-xs font-mono mt-1">SKU: {product.sku}</p>
                    </div>

                    <div className="flex justify-between items-end border-t border-slate-100 pt-4 mt-auto">
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Unit Price</p>
                            <p className="text-xl font-black text-indigo-600">Rs. {product.price.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-[10px] text-slate-400 font-bold uppercase">In Stock</p>
                             <p className={`text-sm font-bold ${product.stock < 10 ? 'text-amber-600' : 'text-slate-700'}`}>
                                 {product.stock}
                             </p>
                        </div>
                    </div>

                    <button className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl transition-all duration-200 text-sm font-bold shadow-lg shadow-slate-200 hover:shadow-indigo-200 flex items-center justify-center gap-2">
                        <ShoppingCart size={16} /> Quick Sell
                    </button>
                </GlassCard>
            ))}
        </div>
    </div>
  );
};