import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Supplier, PurchaseOrder } from '../types';
import { Container, Plus, Filter, Search, FileText, TrendingDown, TrendingUp, Truck, Check, AlertTriangle, User, Calendar, Droplet, ArrowRight, DollarSign, X, Calculator } from 'lucide-react';

const MOCK_SUPPLIERS: Supplier[] = [
    { id: '1', name: 'Shell Pakistan', type: 'OMC', contactPerson: 'Asad Shah', phone: '021-111-222-333', balance: 0, email: 'orders@shell.com.pk' },
    { id: '2', name: 'Hascol Petroleum', type: 'OMC', contactPerson: 'Manager Sales', phone: '042-35712345', balance: 1500000, email: 'sales@hascol.com' },
    { id: '3', name: 'Ali Lube Distributors', type: 'Lube Vendor', contactPerson: 'Ali Raza', phone: '0300-1234567', balance: 45000, email: 'ali.dist@gmail.com' },
];

const MOCK_ORDERS: PurchaseOrder[] = [
    { id: 'PO-9021', supplierId: '1', supplierName: 'Shell Pakistan', date: '2023-10-01', product: 'Petrol', invoiceQty: 20000, receivedQty: 19950, shortage: 50, shortageAmount: 13275, rate: 265.50, totalAmount: 5310000, status: 'Received' },
    { id: 'PO-9025', supplierId: '1', supplierName: 'Shell Pakistan', date: '2023-10-04', product: 'Diesel', invoiceQty: 30000, receivedQty: 29910, shortage: 90, shortageAmount: 25200, rate: 280.00, totalAmount: 8400000, status: 'Received' },
];

export const Suppliers: React.FC = () => {
    const [view, setView] = useState<'LIST' | 'NEW_ORDER'>('LIST');
    const [orders, setOrders] = useState<PurchaseOrder[]>(MOCK_ORDERS);
    const [newOrder, setNewOrder] = useState<Partial<PurchaseOrder>>({
        date: new Date().toISOString().split('T')[0],
        status: 'Draft',
        shortage: 0
    });

    const calculateShortage = (inv: number, recv: number) => {
        return Math.max(0, inv - recv);
    };

    const handleSaveOrder = () => {
        if(!newOrder.supplierId || !newOrder.invoiceQty || !newOrder.receivedQty || !newOrder.rate) return;
        const short = calculateShortage(Number(newOrder.invoiceQty), Number(newOrder.receivedQty));
        const total = Number(newOrder.invoiceQty) * Number(newOrder.rate);
        const shortAmt = short * Number(newOrder.rate);
        
        const supplier = MOCK_SUPPLIERS.find(s => s.id === newOrder.supplierId);
        
        const order: PurchaseOrder = {
            id: `PO-${Math.floor(Math.random() * 10000)}`,
            supplierId: newOrder.supplierId,
            supplierName: supplier?.name || 'Unknown',
            date: newOrder.date || '',
            product: newOrder.product || 'Petrol',
            invoiceQty: Number(newOrder.invoiceQty),
            receivedQty: Number(newOrder.receivedQty),
            shortage: short,
            shortageAmount: shortAmt,
            rate: Number(newOrder.rate),
            totalAmount: total,
            status: 'Received'
        };
        
        setOrders([order, ...orders]);
        setView('LIST');
        setNewOrder({});
    };

    return (
        <div className="space-y-6 pb-20">
            {view === 'LIST' ? (
                <>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900">Procurement & Suppliers</h1>
                            <p className="text-slate-500 text-sm">Manage OMC orders, Bowsers, and Shortage Tracking.</p>
                        </div>
                        <button 
                            onClick={() => setView('NEW_ORDER')}
                            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center gap-2 hover:bg-indigo-700 transition-all hover:-translate-y-0.5"
                        >
                            <Plus size={18} /> New Purchase Order
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Container size={24}/></div>
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase">Active Orders</p>
                                <h3 className="text-2xl font-black text-slate-900">{orders.length}</h3>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><TrendingDown size={24}/></div>
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase">Total Shortage Loss</p>
                                <h3 className="text-2xl font-black text-rose-600">
                                    Rs. {orders.reduce((acc, o) => acc + (o.shortageAmount || 0), 0).toLocaleString()} 
                                </h3>
                                <p className="text-xs text-rose-400 font-bold">{orders.reduce((acc, o) => acc + o.shortage, 0)} Liters Lost</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><DollarSign size={24}/></div>
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase">Payables</p>
                                <h3 className="text-2xl font-black text-slate-900">Rs. 1.5M</h3>
                            </div>
                        </div>
                    </div>

                    <GlassCard title="Recent Purchase Orders" noPadding>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-200">
                                    <tr>
                                        <th className="p-4">PO Details</th>
                                        <th className="p-4">Product</th>
                                        <th className="p-4 text-right">Invoice Qty</th>
                                        <th className="p-4 text-right">Recv. Qty</th>
                                        <th className="p-4 text-right text-rose-600">Shortage</th>
                                        <th className="p-4 text-right">Amount</th>
                                        <th className="p-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4">
                                                <p className="font-bold text-slate-900">{order.supplierName}</p>
                                                <p className="text-xs text-slate-400 font-mono mt-0.5">{order.id} • {order.date}</p>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase border ${
                                                    order.product === 'Petrol' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                                    order.product === 'Diesel' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                    'bg-slate-50 text-slate-600 border-slate-100'
                                                }`}>
                                                    {order.product}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right font-mono text-slate-600">{order.invoiceQty.toLocaleString()}</td>
                                            <td className="p-4 text-right font-mono text-slate-900 font-bold">{order.receivedQty.toLocaleString()}</td>
                                            <td className="p-4 text-right font-mono text-rose-600 font-bold">
                                                {order.shortage > 0 ? (
                                                    <div>
                                                        <span>-{order.shortage} L</span>
                                                        <p className="text-[10px] text-rose-400">Rs. {order.shortageAmount?.toLocaleString()}</p>
                                                    </div>
                                                ) : '0'}
                                            </td>
                                            <td className="p-4 text-right font-mono font-black text-slate-900">
                                                {(order.totalAmount / 1000000).toFixed(2)}M
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold border border-emerald-200 flex items-center justify-center gap-1 w-fit mx-auto">
                                                    <Check size={10} strokeWidth={3} /> {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                </>
            ) : (
                <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-4 mb-6">
                        <button onClick={() => setView('LIST')} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={24}/></button>
                        <h2 className="text-2xl font-black text-slate-900">New Purchase Order</h2>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                        <div className="p-8 space-y-6">
                            {/* Supplier & Date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Supplier</label>
                                    <select 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                                        onChange={(e) => setNewOrder({...newOrder, supplierId: e.target.value})}
                                    >
                                        <option value="">Select Supplier...</option>
                                        {MOCK_SUPPLIERS.map(s => <option key={s.id} value={s.id}>{s.name} ({s.type})</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Delivery Date</label>
                                    <div className="relative">
                                        <input 
                                            type="date" 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            defaultValue={newOrder.date}
                                            onChange={(e) => setNewOrder({...newOrder, date: e.target.value})}
                                        />
                                        <Calendar className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" size={18}/>
                                    </div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product</label>
                                    <div className="flex gap-2">
                                        {['Petrol', 'Diesel', 'Lube'].map(p => (
                                            <button 
                                                key={p}
                                                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${
                                                    newOrder.product === p 
                                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                                                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                                                }`}
                                                onClick={() => setNewOrder({...newOrder, product: p as any})}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice Quantity (L)</label>
                                        <input 
                                            type="number" 
                                            placeholder="e.g. 20000"
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-mono font-bold text-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            onChange={(e) => setNewOrder({...newOrder, invoiceQty: Number(e.target.value)})}
                                        />
                                     </div>
                                     <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Received Quantity (Dip)</label>
                                        <input 
                                            type="number" 
                                            placeholder="e.g. 19950"
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-mono font-bold text-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            onChange={(e) => setNewOrder({...newOrder, receivedQty: Number(e.target.value)})}
                                        />
                                     </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rate per Liter</label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            placeholder="0.00"
                                            className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 font-mono font-bold text-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            onChange={(e) => setNewOrder({...newOrder, rate: Number(e.target.value)})}
                                        />
                                        <span className="absolute left-4 top-3.5 text-slate-400 font-bold">Rs.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Calculation Summary */}
                            {(newOrder.invoiceQty && newOrder.receivedQty) ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className={`p-4 rounded-xl border ${newOrder.invoiceQty > newOrder.receivedQty ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
                                        <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-60">Shortage / Gain</p>
                                        <div className="flex items-center gap-2">
                                            {newOrder.invoiceQty > newOrder.receivedQty ? <TrendingDown className="text-rose-600"/> : <TrendingUp className="text-emerald-600"/>}
                                            <span className={`text-xl font-black font-mono ${newOrder.invoiceQty > newOrder.receivedQty ? 'text-rose-600' : 'text-emerald-600'}`}>
                                                {Math.abs(newOrder.invoiceQty - newOrder.receivedQty)} L
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold mt-1 text-slate-500">
                                            Impact: Rs. {(Math.abs(newOrder.invoiceQty - newOrder.receivedQty) * (newOrder.rate || 0)).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl border bg-slate-50 border-slate-100">
                                        <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-60">Total Payable</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-black font-mono text-slate-900">
                                                Rs. {((newOrder.invoiceQty || 0) * (newOrder.rate || 0)).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            <button 
                                onClick={handleSaveOrder}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                            >
                                <Check size={20} /> Create Purchase Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};