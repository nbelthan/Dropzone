// src/components/ValueEstimationDashboard.jsx
import React from 'react';
import { ArrowDown, Target, Percent, TrendingUp, BarChartHorizontalBig } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const ValueEstimationDashboard = ({ estimatedValue, minValue, maxValue, userShare, totalAirdropValue, fdv, airdropPercentage }) => {

  // Basic check for valid numbers, display placeholder if not
  const displayValue = (value) => (isNaN(value) || value === Infinity) ? 'N/A' : formatCurrency(value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {/* Estimated Value Card */}
      <div className="bg-gradient-to-br from-blue-700/80 to-blue-900/70 p-4 rounded-lg shadow-lg border border-blue-600/80 lg:col-span-1">
        <div className="flex items-center text-blue-200 mb-2">
          <Target size={18} className="mr-2" />
          <h3 className="text-sm font-semibold uppercase tracking-wide">Estimated Value</h3>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-white mb-1">{displayValue(estimatedValue)}</p>
        <div className="flex justify-between text-xs text-blue-300">
          <span>
             <ArrowDown size={12} className="inline mr-1"/>
             Min: {displayValue(minValue)}
           </span>
           <span>
              <TrendingUp size={12} className="inline mr-1"/>
              Max: {displayValue(maxValue)}
           </span>
        </div>
         <p className="text-xs text-blue-400 mt-2 italic">Range: +/- 50% of estimate</p>
      </div>

       {/* User Share Card */}
       <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 lg:col-span-1">
         <div className="flex items-center text-teal-400 mb-2">
             <Percent size={18} className="mr-2" />
             <h3 className="text-sm font-semibold uppercase tracking-wide">Your Calculated Share</h3>
         </div>
         <p className="text-2xl md:text-3xl font-bold text-white">{(userShare * 100).toFixed(6)}%</p>
         <p className="text-xs text-gray-500 mt-2">Based on weighted activities.</p>
       </div>

        {/* Total Airdrop Value Card */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 lg:col-span-1">
             <div className="flex items-center text-indigo-400 mb-2">
                 <BarChartHorizontalBig size={18} className="mr-2" />
                 <h3 className="text-sm font-semibold uppercase tracking-wide">Total Airdrop Value</h3>
             </div>
             <p className="text-2xl md:text-3xl font-bold text-white">{displayValue(totalAirdropValue)}</p>
             <p className="text-xs text-gray-500 mt-2">({airdropPercentage.toFixed(1)}% of {formatCurrency(fdv, 0)} FDV)</p>
        </div>

    </div>
  );
};

export default ValueEstimationDashboard;