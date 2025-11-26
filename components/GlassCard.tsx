import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  title?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  noPadding?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false,
  onClick,
  title,
  action,
  icon,
  noPadding = false
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white
        rounded-2xl
        shadow-premium
        border border-slate-100
        relative
        overflow-hidden
        transition-all duration-300
        ${hoverEffect ? 'hover:shadow-premium-hover hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Header */}
      {(title || action || icon) && (
        <div className="flex justify-between items-center p-6 border-b border-slate-50">
          <div className="flex items-center gap-3">
             {icon && (
               <div className="p-2 rounded-lg bg-slate-50 text-slate-600">
                 {icon}
               </div>
             )}
             {title && (
                <div>
                   <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-none">
                     {title}
                   </h3>
                </div>
             )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}

      {/* Content */}
      <div className={`${noPadding ? '' : 'p-6'}`}>
        {children}
      </div>
    </div>
  );
};