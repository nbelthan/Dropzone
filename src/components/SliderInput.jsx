// src/components/SliderInput.jsx
import React from 'react';
import { HelpCircle } from 'lucide-react';

const SliderInput = ({ label, value, min, max, step, onChange, unit = '', tooltipText, formatDisplayValue = (v) => v }) => {
  const handleChange = (event) => {
    onChange(parseFloat(event.target.value));
  };

//   const getBackgroundSize = () => { // Basic track fill - might need more CSS for cross-browser
//     const percentage = ((value - min) * 100) / (max - min);
//     return { background: `linear-gradient(to right, #3b82f6 ${percentage}%, #4b5563 ${percentage}%)` }; // blue-500, gray-600
//   };

  return (
    <div className="mb-4 last:mb-0">
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
        {tooltipText && (
          <span className="ml-1.5 inline-block group relative align-middle">
            <HelpCircle size={14} className="text-gray-500 cursor-help stroke-current" />
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg border border-gray-600">
              {tooltipText}
            </span>
          </span>
        )}
      </label>
      <div className="flex items-center space-x-3">
         <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg accent-brand-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            // style={getBackgroundSize()} // Apply the style for track fill
        />
        <span className="text-sm font-semibold text-gray-100 w-28 text-right tabular-nums shrink-0">
            {formatDisplayValue(value)}{unit ? `${unit}` : ''} {/* Avoid adding empty unit */}
        </span>
      </div>
    </div>
  );
};

export default SliderInput;