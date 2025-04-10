// src/components/TokenDistributionChart.jsx
import React, { useState } from 'react';
import Pie from '@visx/shape/lib/shapes/Pie';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { LegendOrdinal } from '@visx/legend';
import { defaultDistribution } from '../data/historicalAirdrops';

// Define colors directly or map from existing COLORS object if needed
const visxColors = {
    airdrop: '#3b82f6', // blue-500
    team: '#ef4444', // red-500
    investors: '#f97316', // orange-500
    treasury: '#eab308', // yellow-500
    ecosystem: '#10b981', // emerald-500
};

// Helper to access the value for the pie chart
const getValue = (d) => d.value;
const getName = (d) => d.name;

const TokenDistributionChart = ({ airdropPercentage }) => {
  const [activeArc, setActiveArc] = useState(null);

  // --- Data Preparation ---
  const otherAllocationTotal = defaultDistribution.team + defaultDistribution.investors + defaultDistribution.treasury + defaultDistribution.ecosystem;
  const otherTotalPercent = 100 - airdropPercentage;
  const scaleFactor = otherAllocationTotal > 0 ? otherTotalPercent / otherAllocationTotal : 0;

  const pieData = [
    { name: 'Airdrop', value: airdropPercentage, color: visxColors.airdrop },
    { name: 'Team', value: defaultDistribution.team * scaleFactor, color: visxColors.team },
    { name: 'Investors', value: defaultDistribution.investors * scaleFactor, color: visxColors.investors },
    { name: 'Treasury', value: defaultDistribution.treasury * scaleFactor, color: visxColors.treasury },
    { name: 'Ecosystem Dev', value: defaultDistribution.ecosystem * scaleFactor, color: visxColors.ecosystem },
  ].filter(d => d.value > 0.1); // Filter small values

  // --- Ordinal Color Scale --- 
  const getPieColor = scaleOrdinal({
    domain: pieData.map(getName),
    range: pieData.map(d => d.color),
  });

  // --- Layout Dimensions --- (Use fixed size for SVG, parent div controls responsive via class)
  const width = 300; // Example fixed width for SVG content
  const height = 250; // Example fixed height (including space for legend)
  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;
  const donutThickness = 50; // Controls the thickness of the donut
  const baseOuterRadius = radius * 0.9; // Base outer radius
  const innerRadius = baseOuterRadius - donutThickness;

  // --- Event Handlers (Simplified: only handle active arc state) --- 
  const handleMouseOver = (event, datum) => {
    setActiveArc(datum);
  };
  const handleMouseOut = () => {
    setActiveArc(null);
  };

  return (
    <div className="relative w-full min-h-[280px] flex flex-col items-center">
      <svg width={width} height={height}>
         {/* Optional: Add Drop Shadow Filter Definition */}
         <defs>
            <filter id="visxPieShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3" />
            </filter>
          </defs>
        <Group top={centerY} left={centerX}>
          <Pie
            data={pieData}
            pieValue={getValue}
            outerRadius={(arc) => { // Make Airdrop slice pop out
                 return arc.data.name === 'Airdrop' ? baseOuterRadius * 1.04 : baseOuterRadius;
            }}
            innerRadius={innerRadius}
            cornerRadius={3}
            padAngle={0.01}
            pieSortValues={() => -1} // Keep order from data array
            filter="url(#visxPieShadow)" // Apply filter
          >
            {(pie) =>
              pie.arcs.map((arc, index) => {
                const { name } = arc.data;
                const arcPath = pie.path(arc);
                const arcFill = getPieColor(name);
                const isActive = activeArc?.index === index;
                const percentage = ((arc.endAngle - arc.startAngle) / (2 * Math.PI)) * 100;

                return (
                  <g
                    key={`arc-${arc.data.name}-${index}`}
                    onMouseOver={(e) => handleMouseOver(e, arc)} // Simplified handler
                    onMouseOut={handleMouseOut} // Simplified handler
                    className="cursor-pointer"
                  >
                    <path d={arcPath} fill={arcFill} stroke={isActive ? 'white' : 'none'} strokeWidth={isActive ? 1 : 0} />
                     {/* Labels inside slices - basic example */}
                    {percentage > 5 && ( // Only show label for larger slices
                       (() => {
                         const [centroidX, centroidY] = pie.path.centroid(arc);
                         return (
                           <text
                             x={centroidX}
                             y={centroidY}
                             dy=".33em"
                             fill="#ffffff" // White text
                             fontSize={10}
                             fontWeight="bold"
                             textAnchor="middle"
                             pointerEvents="none"
                           >
                             {`${percentage.toFixed(0)}%`}
                           </text>
                         );
                       })()
                     )}
                  </g>
                );
              })
            }
          </Pie>
        </Group>
      </svg>

      {/* Legend */} 
      <div className="mt-2 text-center w-full">
           <LegendOrdinal scale={getPieColor} direction="row" labelMargin="0 5px 0 0" shape="circle" shapeWidth={10} shapeHeight={10} itemMargin="0 10px 0 0">
              {(labels) => (
                 <div style={{ display: 'flex', justifyContent: 'center', fontSize: '11px', color: '#d1d5db'}}>
                   {labels.map((label, i) => (
                      <div key={`legend-quantile-${i}`} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                          <svg width={10} height={10} style={{ marginRight: '4px' }}>
                             <circle r={5} cx={5} cy={5} fill={label.value} />
                          </svg>
                          {label.text}
                      </div>
                    ))}
                 </div>
              )}
           </LegendOrdinal>
      </div>
    </div>
  );
};

export default TokenDistributionChart;