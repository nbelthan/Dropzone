// src/App.js
import React, { useState, useMemo, useCallback } from 'react';
import SliderInput from './components/SliderInput';
import TokenDistributionChart from './components/TokenDistributionChart';
import ValueEstimationDashboard from './components/ValueEstimationDashboard';
import HistoricalComparisonChart from './components/HistoricalComparisonChart';
import { formatCurrency, formatLargeNumber } from './utils/formatters';
import { SlidersHorizontal, History, Github, AlertTriangle, PlusCircle, XCircle, Settings2, Sliders } from 'lucide-react'; // Added Settings2, Sliders
import logo from './assets/logo.png'; // Import the logo

// Placeholder for unique IDs - install uuid or use a simpler method
let nextId = 0;
const generateId = () => nextId++;

// ActivityRow: Improved styling, duplicate prevention, layout
const ActivityRow = ({ activity, onChange, onDelete, allActivities }) => { // Added allActivities prop
    const activityTypes = ["Transactions", "Liquidity Provision", "Staking", "Governance Participation", "Kaito Yaps", "Custom"]; // Renamed K2 Jabs
    const inputClasses = "w-full text-xs bg-gray-600 border border-gray-500 rounded p-1.5 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-500";
    const selectClasses = "w-full text-xs bg-gray-600 border border-gray-500 rounded p-1.5 text-gray-100 focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed";

    // Determine which non-'Custom' types are used by *other* activities
    const usedPredefinedTypesInOtherRows = useMemo(() => 
        new Set(allActivities
            .filter(a => a.id !== activity.id && a.type !== 'Custom') // Exclude self and 'Custom' type
            .map(a => a.type)),
        [allActivities, activity.id]
    );

    return (
    // Adjusted grid columns for better fit: 9 total spans
    <div className="grid grid-cols-1 md:grid-cols-9 gap-2 items-center mb-1 p-2 border border-gray-700 rounded bg-gray-900/30">
        {/* Type Dropdown (col-span-2) - Disable used options */}
        <select 
            value={activity.type} 
            onChange={e => onChange(activity.id, 'type', e.target.value)} 
            className={`${selectClasses} md:col-span-2`}
            title="Select the type of activity (e.g., Transactions, Staking)"
        >
            {activityTypes.map(type => (
                <option 
                    key={type} 
                    value={type} 
                    // Disable if it's a predefined type used in another row
                    disabled={type !== 'Custom' && usedPredefinedTypesInOtherRows.has(type)}
                >
                    {type}
                </option>
            ))}
        </select>
        {/* Your Metric Input (col-span-2) */}
        <input 
           type="number" 
           placeholder="Your Amount" 
           title="Your personal number/value for this activity type (e.g., 100 transactions, 500 tokens staked)"
           className={`${inputClasses} md:col-span-2`} 
           value={activity.userMetric} 
           min="0" 
           onChange={e => onChange(activity.id, 'userMetric', e.target.value)} 
         />
        {/* Unit Input (col-span-1) */}
        <input 
           type="text" 
           placeholder="Unit" 
           title="Unit of measurement for metrics (e.g., tx, USD, tokens, points)"
           className={`${inputClasses} md:col-span-1`} 
           value={activity.unit} 
           onChange={e => onChange(activity.id, 'unit', e.target.value)}
         />
        {/* Total Metric Input (col-span-2) */}
        <input 
           type="number" 
           placeholder="Protocol Total" 
           title="Estimated total amount/value for this activity across the entire protocol (e.g., 1,000,000 total transactions)"
           className={`${inputClasses} md:col-span-2`} 
           value={activity.totalMetric} 
           min="0" 
           onChange={e => onChange(activity.id, 'totalMetric', e.target.value)}
         />
        {/* Weight Input (col-span-1) */}
        <input 
           type="number" 
           placeholder="Wt." 
           title="Relative importance multiplier for this activity type (e.g., 1.0 = standard, 2.0 = double weight)"
           className={`${inputClasses} md:col-span-1`} 
           value={activity.weight} 
           step="0.1" 
           min="0" 
           onChange={e => onChange(activity.id, 'weight', e.target.value)}
         />
        {/* Delete Button (col-span-1) */}
        <button 
           onClick={() => onDelete(activity.id)} 
           className="text-red-500 hover:text-red-400 md:col-span-1 justify-self-end" 
           title="Delete this activity row"
           disabled={allActivities.length <= 1}
         >
            <XCircle size={16} />
        </button>
    </div>
)};

const ActivityInputTable = ({ activities, setActivities }) => {
     const addActivity = useCallback(() => {
         setActivities(prev => [...prev, { id: generateId(), type: 'Custom', userMetric: '', unit: '', totalMetric: '', weight: 1.0 }]);
     }, [setActivities]);
     const updateActivity = useCallback((id, field, value) => {
         setActivities(prev => prev.map(act => act.id === id ? { ...act, [field]: value } : act));
     }, [setActivities]);
     const deleteActivity = useCallback((id) => {
         // Prevent deleting the last activity row
         setActivities(prev => (prev.length > 1 ? prev.filter(act => act.id !== id) : prev));
     }, [setActivities]);

    return (
        <div className="mb-4">
             <h3 className="text-md font-semibold text-gray-200 mb-2">Define Activities & Weights</h3>
             {/* Header Row with Tooltips */}
             <div className="hidden md:grid md:grid-cols-9 gap-2 items-center mb-1 px-2 text-xs text-gray-400 font-medium">
                 <span className="md:col-span-2" title="Category of on-chain action (e.g., Transactions, Staking)">Type</span>
                 <span className="md:col-span-2" title="Your personal amount/value for this activity type">Your Metric</span>
                 <span className="md:col-span-1" title="Unit of measurement (e.g., tx, USD, tokens)">Unit</span>
                 <span className="md:col-span-2" title="Estimated total amount/value for this activity across the entire protocol">Total Metric</span>
                 <span className="md:col-span-1" title="Relative importance multiplier (higher means more impact)">Weight</span>
                 <span className="md:col-span-1 text-right">Action</span>
             </div>
             <div className="space-y-1 mb-3 pr-1 border-t border-b border-gray-700 py-2">
                 {activities.length === 0 && <p className="text-sm text-gray-500 text-center py-4">Please add at least one activity.</p>}
                 {activities.map(act => (
                     <ActivityRow 
                         key={act.id} 
                         activity={act} 
                         onChange={updateActivity} 
                         onDelete={deleteActivity} 
                         allActivities={activities} // Pass down all activities
                     />
                 ))}
             </div>
             <button onClick={addActivity} className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                 <PlusCircle size={16} className="mr-1" /> Add Custom Activity Type
             </button>
         </div>
    );
};

// Helper to generate unique IDs for default activities on each render/reset
const generateDefaultActivities = () => [
    // Update defaults: weight=1, userMetric=1, specific totalMetrics
    { id: generateId(), type: 'Transactions', userMetric: '1', unit: 'tx', totalMetric: '100000000', weight: 1.0 },          // 100 Million
    { id: generateId(), type: 'Liquidity Provision', userMetric: '1', unit: 'USD', totalMetric: '100000000', weight: 1.0 },     // 100 Million
    { id: generateId(), type: 'Staking', userMetric: '1', unit: 'tokens', totalMetric: '100000000', weight: 1.0 },         // 100 Million
    { id: generateId(), type: 'Governance Participation', userMetric: '1', unit: 'votes', totalMetric: '100000', weight: 1.0 },  // 100 Thousand
    { id: generateId(), type: 'Kaito Yaps', userMetric: '1', unit: 'yaps', totalMetric: '100000', weight: 1.0 },      // 100 Thousand
];

function App() {
  const [activeTab, setActiveTab] = useState('protocol');
  const [isAdvancedMode, setIsAdvancedMode] = useState(false); // <<< ADVANCED MODE STATE

  // --- State for Value Estimation --- (Common to both modes)
  const [airdropPercentage, setAirdropPercentage] = useState(7.5); // 1-30%
  const [fdv, setFdv] = useState(5 * 1e9); // 1B - 50B USD
  const [totalParticipants, setTotalParticipants] = useState(100000); // <<< NEW STATE (Default: 100k)

  // --- State for Basic Mode --- <<< REINTRODUCED
  const [basicTotalActivities, setBasicTotalActivities] = useState(1.5 * 1e6); // 100K - 100M
  const [basicUserActivityPercentage, setBasicUserActivityPercentage] = useState(0.01); // 0.0001% to 1%
  const [basicActivityWeight, setBasicActivityWeight] = useState(1.0); // 0.5x - 3x

  // --- State for Advanced Mode --- (Activities Array Only)
  const [activities, setActivities] = useState(() => generateDefaultActivities());

  // --- Combined Calculation Logic (Conditional) ---
  const shareCalculations = useMemo(() => {
    const safeTotalParticipants = Math.max(1, totalParticipants || 1); // Calculate safe participants once

    if (isAdvancedMode) {
        // --- Advanced Mode Calculation (Weighted Sum + Participant Dilution) ---
        let totalWeightedUserSum = 0;
        let totalWeightedProtocolSum = 0;
        let rawTotalProtocolActivities = 0;
        const breakdown = {};

        activities.forEach(act => {
            const userMetric = parseFloat(act.userMetric) || 0;
            const totalMetric = parseFloat(act.totalMetric) || 0;
            const weight = parseFloat(act.weight);
            if (isNaN(weight) || weight < 0 || totalMetric <= 0) return;

            const weightedUser = userMetric * weight;
            const weightedTotal = totalMetric * weight;
            totalWeightedUserSum += weightedUser;
            totalWeightedProtocolSum += weightedTotal;
            rawTotalProtocolActivities += totalMetric;

            const typeKey = act.type || 'Custom';
            if (!breakdown[typeKey]) {
                breakdown[typeKey] = { weightedUser: 0 };
            }
            breakdown[typeKey].weightedUser += weightedUser;
        });

        // 1. Calculate share based purely on weighted activity
        const activityBasedShare = totalWeightedProtocolSum > 0 ? (totalWeightedUserSum / totalWeightedProtocolSum) : 0;

        // 2. Dilute by the number of participants (handle division by zero)
        const userShare = activityBasedShare / safeTotalParticipants;

        const shareBreakdown = Object.entries(breakdown).map(([type, data]) => {
            // Calculate contribution relative to the *activity pool* before participant division
            const directShareContribution = totalWeightedProtocolSum > 0 ? (data.weightedUser / totalWeightedProtocolSum) * 100 : 0;
            return { type, percentage: directShareContribution };
        }).filter(item => item.percentage > 0.00001); // Filter out negligible contributions

        return {
            rawTotalProtocolActivities, // Display raw sum from advanced inputs
            userShare: userShare, // Final diluted share (0 to 1)
            shareBreakdown, // Array of { type, percentage } - based on activity pool
            mode: 'Advanced'
        };

    } else {
        // --- Basic Mode Calculation (Sliders + Participant Dilution) ---
        const safeTotalActivities = Math.max(basicTotalActivities, 1); 
        // Base share is simply the user's percentage of total activities
        const baseShare = (basicUserActivityPercentage / 100); 
        // Apply weight multiplier to the base share, capped at 1 (100%)
        const weightedShare = Math.min(1, baseShare * basicActivityWeight); 
        
        // Dilute by the number of participants
        const userShare = weightedShare / safeTotalParticipants; // Use safeTotalParticipants

        return {
            rawTotalProtocolActivities: basicTotalActivities,
            userShare: userShare, // Final diluted share
            shareBreakdown: [],
            mode: 'Basic'
        };
    }
  }, [isAdvancedMode, activities, totalParticipants, basicTotalActivities, basicUserActivityPercentage, basicActivityWeight]); // Dependencies for both modes

  // --- Value Estimation Calculations (Uses calculated share from either mode) ---
  const valueCalculations = useMemo(() => {
    const totalAirdropValue = fdv * (airdropPercentage / 100);
    const estimatedUserAirdrop = totalAirdropValue * shareCalculations.userShare;
    const minEstimate = estimatedUserAirdrop * 0.5;
    const maxEstimate = estimatedUserAirdrop * 1.5;
    return {
      totalAirdropValue,
      estimatedUserAirdrop,
      minEstimate,
      maxEstimate,
    };
  }, [fdv, airdropPercentage, shareCalculations.userShare]);


  const currentTime = useMemo(() => new Date(), []);

  // --- Reset Function (Resets both modes and mode itself) ---
   const handleReset = useCallback(() => {
       setIsAdvancedMode(false); // Reset to basic mode
       // Reset basic mode state
       setBasicTotalActivities(1.5 * 1e6);
       setBasicUserActivityPercentage(0.01);
       setBasicActivityWeight(1.0);
       // Reset advanced mode state using the helper function to get fresh IDs
       setActivities(generateDefaultActivities());
       // Reset common state
       setAirdropPercentage(7.5);
       setFdv(5 * 1e9);
       setTotalParticipants(100000); // Reset total participants
   }, []); // No dependencies needed as it uses setters only

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <header className="flex justify-between items-center mb-6 sm:mb-8">
        {/* Logo and Title Container */}
         <div className="flex items-center space-x-3">
             <img src={logo} alt="Drop Zone Logo" className="h-12 w-auto" />
             <div> {/* Wrap title and tagline */}
                 <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Drop Zone
                 </h1>
                 {/* Added Tagline */}
                 <p className="text-xs sm:text-sm text-gray-400 italic">
                     Project your drop, reap the reward.
                 </p>
             </div>
         </div>
         {/* GitHub Link */}
         <a
            href="https://github.com/nbelthan/Dropzone"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            title="View Source on GitHub"
          >
             <Github size={24} />
         </a>
      </header>

      {/* Disclaimer */}
      <div className="mb-6 p-3 bg-yellow-900/40 border border-yellow-700/80 rounded-lg text-yellow-200 text-xs sm:text-sm flex items-start shadow-md">
        <AlertTriangle size={20} className="mr-3 flex-shrink-0 mt-0.5 text-yellow-400" />
        <div>
          <strong className="font-semibold">Disclaimer:</strong> This tool provides projections based on user inputs & hypothetical weights. Actual airdrop values depend on numerous factors (final tokenomics, specific distribution criteria, market conditions, Sybil filtering) and <strong className="underline">can differ significantly</strong>. This is for educational & illustrative purposes only and is <strong className="underline">not financial advice</strong>. DYOR.
        </div>
      </div>


      {/* Tabs */}
      <div className="mb-6 sm:mb-8 border-b border-gray-700 flex space-x-1 sm:space-x-2">
        <button
          onClick={() => setActiveTab('protocol')}
          className={`flex items-center px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 ${
            activeTab === 'protocol'
              ? 'border-b-2 border-blue-500 text-white bg-gray-800/50'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
          }`}
        >
          <SlidersHorizontal size={16} className="mr-1.5 sm:mr-2" />
          Projection Setup
        </button>
        <button
          onClick={() => setActiveTab('historical')}
          className={`flex items-center px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 ${
            activeTab === 'historical'
              ? 'border-b-2 border-blue-500 text-white bg-gray-800/50'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
          }`}
        >
          <History size={16} className="mr-1.5 sm:mr-2" />
          Historical Context
        </button>
      </div>

      {/* Content Area */}
      <main>
        {activeTab === 'protocol' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* --- Column 1: Setup (Conditional) --- */}
            <section className="lg:col-span-1 bg-gray-800/60 p-5 rounded-lg shadow-lg border border-gray-700/80 backdrop-blur-sm flex flex-col">
              {/* Header Section */}
              <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                 <h2 className="text-lg font-semibold text-white">Projection Setup</h2>
                 {/* Mode Toggle Button */}
                 <button
                    onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                    title={isAdvancedMode ? "Switch to Basic Mode (Sliders)" : "Switch to Advanced Mode (Table)"}
                    className={`flex items-center px-2 py-1 rounded text-xs transition-colors ${isAdvancedMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
                 >
                    {isAdvancedMode ? <Sliders size={14} className="mr-1"/> : <Settings2 size={14} className="mr-1"/>}
                    {isAdvancedMode ? 'Switch to Basic' : 'Switch to Advanced'}
                 </button>
              </div>

              {/* Participant Slider - Moved Here (Common to both modes) */}
              <div className="mb-4">
                  <SliderInput
                      label="Estimated Total Participants"
                      value={totalParticipants}
                      min={10000}       // Min: 10k
                      max={10000000}    // Max: 10 Million
                      step={1000} 
                      onChange={setTotalParticipants}
                      tooltipText="Estimated total number of unique wallets receiving the airdrop (10k to 10M). Used to dilute the calculated share in BOTH Basic and Advanced Modes."
                      formatDisplayValue={formatLargeNumber}
                  />
              </div>

              {/* Container for Mode-Specific Content */}
              <div className="flex-grow">
                  {/* --- Basic Mode Inputs & Formula --- */}
                  {!isAdvancedMode && (
                      <div className="space-y-4">
                          {/* Basic Sliders */}
                          <SliderInput
                              label="Total Protocol Activities"
                              value={basicTotalActivities}
                              min={100000} max={100000000} step={10000}
                              onChange={setBasicTotalActivities}
                              tooltipText="Estimated total eligible actions across all potential recipients (used to calculate % share)."
                              formatDisplayValue={formatLargeNumber}
                          />
                          <SliderInput
                              label="Your Share of Activities"
                              value={basicUserActivityPercentage}
                              min={0.0001} max={1.0} step={0.0001}
                              onChange={setBasicUserActivityPercentage}
                              unit="%"
                              tooltipText="Estimate your share of total activities as a percentage."
                              formatDisplayValue={(v) => v.toFixed(4)}
                          />
                          <SliderInput
                              label="Activity Weight Multiplier"
                              value={basicActivityWeight}
                              min={0.5} max={3.0} step={0.1}
                              onChange={setBasicActivityWeight}
                              unit="x"
                              tooltipText="Overall multiplier based on activity type/value/timing (e.g., early user = 2x)."
                              formatDisplayValue={(v) => v.toFixed(1)}
                          />

                          {/* Basic Formula Display - Added Here */}
                          <div className="mt-4 pt-3 border-t border-gray-700/50">
                              <h4 className="text-xs font-semibold text-gray-400 mb-1">Calculation Formula (Basic):</h4>
                              <p className="text-xs text-gray-100 italic" title="Combines your estimated share percentage with the weight multiplier.">
                                  Weighted Share = (Your Share % / 100) * Activity Weight
                              </p>
                              <p className="text-xs text-gray-100 italic mt-1" title="Dilutes the weighted share by the total participants.">
                                  Final User Share = Weighted Share / Total Participants
                              </p>
                          </div>
                      </div>
                  )}

                  {/* --- Advanced Mode Inputs & Formula --- */}
                  {isAdvancedMode && (
                      <div>
                          {/* Advanced Activity Table */}
                          <ActivityInputTable activities={activities} setActivities={setActivities} />
                          
                          {/* Advanced Formula Display */}
                          <div className="mt-4 pt-3 border-t border-gray-700/50">
                              <h4 className="text-xs font-semibold text-gray-400 mb-1">Calculation Formula (Advanced):</h4>
                              <p className="text-xs text-gray-100 italic" title="Calculates your proportional share of the total weighted activity pool.">
                                  Weighted Activity Share = Sum (Your Metric × Weight) / Sum (Total Metric × Weight)
                              </p>
                              <p className="text-xs text-gray-100 italic mt-1" title="Dilutes the activity share by the total participants, assuming an even split of the activity-based pool.">
                                  Final User Share = Weighted Activity Share / Total Participants
                              </p>
                          </div>
                      </div>
                  )}
               </div>

               {/* Reset Button */}
               <div className="mt-8 pt-4 border-t border-gray-700 text-center">
                    <button onClick={handleReset} className="text-sm text-gray-400 hover:text-red-400 transition-colors">Reset All Inputs</button>
               </div>
            </section>

            {/* --- Column 2: Simulation & Value Params --- */}
            <section className="lg:col-span-2 space-y-6">
               {/* Display Calculated Totals (Shows different raw total based on mode) */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                   <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                       <label className="text-xs text-gray-400 block mb-1" title={shareCalculations.mode === 'Advanced' ? "Simple sum of 'Total Metric' values. Units might differ." : "Value from 'Total Protocol Activities' slider."}>
                           Est. Total Protocol Activities ({shareCalculations.mode === 'Advanced' ? 'Raw Sum' : 'Basic'})
                        </label>
                       <p className="text-lg font-semibold text-white">{formatLargeNumber(shareCalculations.rawTotalProtocolActivities)}</p>
                   </div>
                   <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                       <label className="text-xs text-gray-400 block mb-1" title={shareCalculations.mode === 'Advanced' ? "Your calculated share AFTER diluting your activity-based share by the total number of participants. Assumes the activity pool is split evenly." : "Your calculated share AFTER diluting your slider-based share by the total number of participants."} >
                           Your Calculated Share ({shareCalculations.mode})
                        </label>
                       <p className="text-lg font-semibold text-white">{(shareCalculations.userShare * 100).toFixed(6)}%</p>
                       {/* Share Breakdown Display (Only shows in Advanced mode) */}
                       {isAdvancedMode && shareCalculations.shareBreakdown.length > 0 && (
                           <div className="mt-2 space-y-0.5 text-xs text-gray-400 pr-2">
                                <h4 className="text-xs font-semibold text-gray-300 mb-1">Share Contribution by Type:</h4>
                                {shareCalculations.shareBreakdown.map(item => (
                                    <div key={item.type} className="flex justify-between">
                                        <span className="truncate pr-2">{item.type}:</span>
                                        <span className="flex-shrink-0">{item.percentage.toFixed(6)}%</span>
                                    </div>
                                ))}
                            </div>
                       )}
                   </div>
               </div>

               {/* Value Estimation Parameters (Sliders - Common) */}
               <div className="bg-gray-800/60 p-5 rounded-lg shadow-lg border border-gray-700/80 backdrop-blur-sm">
                    <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-3">Set Valuation Parameters</h2>
                    <SliderInput
                        label="Airdrop Allocation"
                        value={airdropPercentage}
                        min={1} max={30} step={0.1} // Slightly increased max allocation
                        onChange={setAirdropPercentage}
                        unit="%"
                        tooltipText="Percentage of total token supply allocated to the airdrop."
                        formatDisplayValue={(v) => v.toFixed(1)}
                    />
                    <SliderInput
                        label="Projected Fully Diluted Valuation (FDV)"
                        value={fdv}
                        min={1e8} // Changed min to 100 Million
                        max={20e9} // Changed max to 20 Billion
                        step={1e7} // Adjusted step (e.g., 10 Million)
                        onChange={setFdv}
                        unit=""
                        tooltipText="Estimated total value of all tokens if they were in circulation (hypothetical). Range: 100M - 20B"
                        formatDisplayValue={(v) => formatCurrency(v, 0)}
                    />
               </div>

               {/* Token Distribution Chart */}
               <div className="bg-gray-800/60 p-5 rounded-lg shadow-lg border border-gray-700/80 backdrop-blur-sm">
                   <h2 className="text-lg font-semibold text-white mb-2">Token Allocation Breakdown</h2>
                   <TokenDistributionChart airdropPercentage={airdropPercentage} />
               </div>

               {/* Value Estimation Dashboard */}
               <div className="bg-gray-800/60 p-5 rounded-lg shadow-lg border border-gray-700/80 backdrop-blur-sm">
                   <h2 className="text-lg font-semibold text-white mb-2">Projected Outcome Simulation</h2>
                   <ValueEstimationDashboard
                      estimatedValue={valueCalculations.estimatedUserAirdrop}
                      minValue={valueCalculations.minEstimate}
                      maxValue={valueCalculations.maxEstimate}
                      userShare={shareCalculations.userShare} // Pass the newly calculated share
                      totalAirdropValue={valueCalculations.totalAirdropValue}
                      fdv={fdv}
                      airdropPercentage={airdropPercentage}
                    />
               </div>
            </section>
          </div>
        )}

        {/* Historical Tab */}
        {activeTab === 'historical' && (
          <section className="bg-gray-800/60 p-5 rounded-lg shadow-lg border border-gray-700/80 backdrop-blur-sm">
             {/* Pass totalAirdropValue which now depends on valueCalculations */}
            <HistoricalComparisonChart currentAirdropValue={valueCalculations.totalAirdropValue} />
          </section>
        )}
      </main>
         {/* Footer */}
         <footer className="text-center mt-12 text-xs text-white">
            <p>Simulations based on user inputs. Not financial advice. DYOR.</p>
            <p>Current Time (Local): {currentTime.toLocaleString()}</p>
         </footer>
    </div>
  );
}

export default App;