// src/components/HistoricalComparisonChart.jsx
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'; // Removed LabelList for less clutter
import { historicalAirdrops as baseHistoricalAirdrops, airdropStats } from '../data/historicalAirdrops';
import { formatCurrency } from '../utils/formatters';
import { Info } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Get the full data object for this bar
    return (
      <div className="bg-gray-700 p-3 rounded shadow-lg border border-gray-600 text-sm">
        <p className="font-semibold text-white">{`#${data.rank} ${label}`}</p>
        <p className="text-blue-300">{`Value: ${formatCurrency(data.valueRaw)}`}</p>
        {/* Add date here if available in data */}
        {data.date && <p className="text-xs text-gray-400">{`Date: ${data.date}`}</p>}
      </div>
    );
  }
  return null;
};

// Custom tick for X Axis to add rank and handle long names
const renderCustomAxisTick = ({ x, y, payload, data }) => {
    // Find the corresponding data point to get the rank
    const dataPoint = data.find(d => d.name === payload.value); // Find in the passed data
    const rank = dataPoint ? dataPoint.rank : '';
    // Truncate long names if necessary for display
    const displayName = payload.value.length > 20 ? payload.value.substring(0, 18) + '...' : payload.value;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill={dataPoint?.isCurrent ? '#facc15' : '#9ca3af'} transform="rotate(-45)" fontSize={9} fontWeight={dataPoint?.isCurrent ? 'bold' : 'normal'}>
          {`${rank}. ${displayName}`} {/* Combine rank and potentially truncated name */}
        </text>
      </g>
    );
};

// Add currentAirdropValue prop
const HistoricalComparisonChart = ({ currentAirdropValue }) => {

  // Use useMemo to recalculate chart data only when currentAirdropValue changes
  const chartData = useMemo(() => {
    // Create data for the current projection
    const currentAirdropData = {
      rank: '??', // Rank will be determined after sorting
      name: 'Current Projection',
      valueRaw: currentAirdropValue,
      valueBln: currentAirdropValue / 1e9,
      isCurrent: true, // Flag to identify this bar
      // date: 'N/A' // Optional: could add date if needed
    };

    // Combine historical data with current projection
    let combinedData = [...baseHistoricalAirdrops];
    if (currentAirdropValue > 0) { // Only add if value is positive
        combinedData.push(currentAirdropData);
    }

    // Sort combined data by value in descending order
    combinedData.sort((a, b) => b.valueRaw - a.valueRaw);

    // Re-assign ranks based on the new sorted order
    combinedData = combinedData.map((item, index) => ({
      ...item,
      rank: item.isCurrent ? '??' : index + 1, // Keep ?? for current or assign rank
    }));

    return combinedData;
  }, [currentAirdropValue]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Historical Airdrops vs. Current Projection</h2>
      {/* Increased height significantly for 50 bars */}
      <div className="h-[600px] w-full bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mb-6 overflow-x-auto relative"> {/* Added relative positioning */}
        {/* Provide a minWidth if content overflows horizontally */}
         <ResponsiveContainer width="100%" height="100%" minWidth={1400}> {/* Increased minWidth */}
           <BarChart
             data={chartData}
             margin={{ top: 5, right: 10, left: 55, bottom: 85 }} // Increased bottom margin & left margin for Y axis labels
             barCategoryGap="25%" // Adjust gap between bars if needed
             >
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" /> {/* gray-600 */}
              <XAxis
                  dataKey="name"
                  // Pass chartData to the tick renderer
                  tick={(props) => renderCustomAxisTick({ ...props, data: chartData })}
                  interval={0} // Show all labels
                  height={85} // Increased height significantly for angled labels + rank
                  axisLine={{ stroke: '#4b5563' }}
                  tickLine={{ stroke: '#4b5563' }}
               />
              <YAxis
                  tickFormatter={(value) => `$${value.toFixed(1)}B`} // Format with 1 decimal place
                  tick={{ fontSize: 10, fill: '#9ca3af' }} // gray-400
                  axisLine={{ stroke: '#4b5563' }}
                  tickLine={{ stroke: '#4b5563' }}
                  width={55} // Explicit width for YAxis labels
                  />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(75, 85, 99, 0.4)' }} // gray-500 fill, slightly more opaque
                wrapperStyle={{ zIndex: 100 }} // Ensure tooltip is above chart elements
                />
              <Bar dataKey="valueBln" name="Value (Billion USD)" radius={[3, 3, 0, 0]}>
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isCurrent ? '#facc15' : '#3b82f6'} />
                ))}
              </Bar>
           </BarChart>
         </ResponsiveContainer>
      </div>

       {/* Insights Dashboard - Remains the same */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:border-gray-600 transition-colors">
             <div className="flex items-center text-gray-400 mb-2">
                 <Info size={16} className="mr-2 flex-shrink-0" />
                 <h4 className="text-sm font-semibold uppercase">Peak Timing</h4>
             </div>
             <p className="text-xs text-gray-300">{airdropStats.peakTiming}</p>
          </div>
           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:border-gray-600 transition-colors">
             <div className="flex items-center text-gray-400 mb-2">
                 <Info size={16} className="mr-2 flex-shrink-0" />
                 <h4 className="text-sm font-semibold uppercase">Allocation Size</h4>
             </div>
             <p className="text-xs text-gray-300">{airdropStats.allocationRange}</p>
          </div>
           <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:border-gray-600 transition-colors">
             <div className="flex items-center text-gray-400 mb-2">
                 <Info size={16} className="mr-2 flex-shrink-0" />
                 <h4 className="text-sm font-semibold uppercase">Total Value</h4>
             </div>
             <p className="text-xs text-gray-300">{airdropStats.totalValueDistributed}</p>
          </div>
       </div>
    </div>
  );
};

export default HistoricalComparisonChart;