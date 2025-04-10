// src/App.js
import React, { useState, useMemo, useCallback } from 'react';
// ... other imports ...
import { Settings2, Sliders, PlusCircle, XCircle } from 'lucide-react'; // Ensure needed icons are here

let nextId = 0;
const generateId = () => nextId++;

// --- Placeholder Components ---
// Remove ProtocolSelector and TimePeriodSelector definitions

// ActivityRow: (Ensure tooltips are descriptive)
const ActivityRow = ({ activity, onChange, onDelete, allActivities }) => {
    const activityTypes = ["Transactions", "Liquidity Provision", "Staking", "Governance Participation", "Kaito Yaps", "Custom"];
    const inputClasses = "w-full text-xs bg-gray-600 border border-gray-500 rounded p-1.5 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-500";
    const selectClasses = "w-full text-xs bg-gray-600 border border-gray-500 rounded p-1.5 text-gray-100 focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed";

    const usedTypesInOtherRows = useMemo(() =>
        new Set(allActivities.filter(a => a.id !== activity.id).map(a => a.type)),
        [allActivities, activity.id]
    );

    return (
    <div className="grid grid-cols-1 md:grid-cols-9 gap-2 items-center mb-1 p-2 border border-gray-700 rounded bg-gray-900/30">
        <select
            value={activity.type}
            onChange={e => onChange(activity.id, 'type', e.target.value)}
            className={`${selectClasses} md:col-span-2`}
            title="Select the type of activity. Each type can only be used once (except 'Custom')."
            // Disable type change for non-custom rows if desired? Or just disable used options?
            // disabled={activity.type !== 'Custom'} // Example: Lock predefined types?
        >
            {activityTypes.map(type => (
                <option
                    key={type}
                    value={type}
                    // Disable selection if type is already used by another row, unless it's 'Custom'
                    disabled={type !== 'Custom' && usedTypesInOtherRows.has(type)}
                >
                    {type}
                </option>
            ))}
        </select>
        <input
           type="number"
           placeholder="Your Amount"
           title="Your personal number/value for this activity type (e.g., 100 transactions, 5000 USD staked)"
           className={`${inputClasses} md:col-span-2`}
           value={activity.userMetric}
           min="0"
           onChange={e => onChange(activity.id, 'userMetric', e.target.value)}
         />
        <input
           type="text"
           placeholder="Unit"
           title="Unit for Your/Total Metric (e.g., tx, USD, ETH, votes)"
           className={`${inputClasses} md:col-span-1`}
           value={activity.unit}
           onChange={e => onChange(activity.id, 'unit', e.target.value)}
         />
        <input
           type="number"
           placeholder="Protocol Total"
           title="Estimated total amount for this metric across the entire protocol (e.g., 1,000,000 total transactions)"
           className={`${inputClasses} md:col-span-2`}
           value={activity.totalMetric}
           min="0"
           onChange={e => onChange(activity.id, 'totalMetric', e.target.value)}
         />
        <input
           type="number"
           placeholder="Wt."
           title="Weight multiplier reflecting the importance of this activity type (e.g., 1.0 for standard, 2.0 for high importance)"
           className={`${inputClasses} md:col-span-1`}
           value={activity.weight}
           step="0.1"
           min="0"
           onChange={e => onChange(activity.id, 'weight', e.target.value)}
         />
        <button
           onClick={() => onDelete(activity.id)}
           className="text-red-500 hover:text-red-400 md:col-span-1 justify-self-end"
           title="Delete this Activity Row"
         >
            <XCircle size={16} />
        </button>
    </div>
)};

// ActivityInputTable: Modified addActivity function
const ActivityInputTable = ({ activities, setActivities }) => {
     // Modify addActivity to only add 'Custom' type
     const addActivity = useCallback(() => {
         setActivities(prev => [...prev, { id: generateId(), type: 'Custom', userMetric: '', unit: '', totalMetric: '', weight: 1.0 }]);
     }, [setActivities]);

     const updateActivity = useCallback((id, field, value) => {
         setActivities(prev => prev.map(act => act.id === id ? { ...act, [field]: value } : act));
     }, [setActivities]);

     const deleteActivity = useCallback((id) => {
         setActivities(prev => prev.filter(act => act.id !== id));
     }, [setActivities]);

    return (
        <div className="mb-4">
             <h3 className="text-md font-semibold text-gray-200 mb-2">Define Activities & Weights</h3>
             {/* Header Row with Tooltips (ensure titles are clear) */}
             <div className="hidden md:grid md:grid-cols-9 gap-2 items-center mb-1 px-2 text-xs text-gray-400 font-medium">
                 <span className="md:col-span-2" title="Category of on-chain action">Type</span>
                 <span className="md:col-span-2" title="Your personal amount for this activity type">Your Metric</span>
                 <span className="md:col-span-1" title="Unit of measurement (e.g., tx, USD)">Unit</span>
                 <span className="md:col-span-2" title="Estimated total amount for the entire protocol">Total Metric</span>
                 <span className="md:col-span-1" title="Relative importance multiplier (>=0)">Weight</span>
                 <span className="md:col-span-1 text-right">Action</span>
             </div>
             <div className="space-y-1 mb-3 max-h-60 overflow-y-auto pr-1 border-t border-b border-gray-700 py-2">
                 {activities.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No activities defined.</p>}
                 {activities.map(act => (
                     <ActivityRow
                         key={act.id}
                         activity={act}
                         onChange={updateActivity}
                         onDelete={deleteActivity}
                         allActivities={activities}
                     />
                 ))}
             </div>
             {/* Button now specifically adds 'Custom' */}
             <button onClick={addActivity} className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                 <PlusCircle size={16} className="mr-1" /> Add Custom Activity
             </button>
         </div>
    );
};
// --- End Placeholders ---


function App() {
  const [activeTab, setActiveTab] = useState('protocol');
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  // --- Common State ---
  const [airdropPercentage, setAirdropPercentage] = useState(7.5);
  const [fdv, setFdv] = useState(5 * 1e9);

  // --- Basic Mode State ---
  const [basicTotalActivities, setBasicTotalActivities] = useState(1.5 * 1e6);
  const [basicUserActivityPercentage, setBasicUserActivityPercentage] = useState(0.01);
  const [basicActivityWeight, setBasicActivityWeight] = useState(1.0);

  // --- Advanced Mode State ---
  // Removed protocolName, startDate, endDate
  // Initialize with default activity types
  const initialActivities = [
    { id: generateId(), type: 'Transactions', userMetric: '', unit: 'tx', totalMetric: '', weight: 1.0 },
    { id: generateId(), type: 'Liquidity Provision', userMetric: '', unit: 'USD', totalMetric: '', weight: 1.5 },
    { id: generateId(), type: 'Staking', userMetric: '', unit: 'tokens', totalMetric: '', weight: 1.2 },
    { id: generateId(), type: 'Governance Participation', userMetric: '', unit: 'votes', totalMetric: '', weight: 0.8 },
    { id: generateId(), type: 'Kaito Yaps', userMetric: '', unit: 'yaps', totalMetric: '', weight: 1.0 },
];
  const [activities, setActivities] = useState(initialActivities);

  // --- Combined Calculation Logic (Conditional) --- 
  // ... remains the same ...
  const shareCalculations = useMemo(() => {
     // ... logic using either basic or advanced state ...
  }, [isAdvancedMode, activities, basicTotalActivities, basicUserActivityPercentage, basicActivityWeight]);

  // --- Value Estimation Calculations --- 
  // ... remains the same ...
  const valueCalculations = useMemo(() => {
      // ... logic ...
  }, [fdv, airdropPercentage, shareCalculations.userShare]);

  // --- Reset Function (Updated) ---
   const handleReset = useCallback(() => {
       setIsAdvancedMode(false);
       // Reset basic mode state
       setBasicTotalActivities(1.5 * 1e6);
       setBasicUserActivityPercentage(0.01);
       setBasicActivityWeight(1.0);
       // Reset advanced mode state to initial defaults
       setActivities(initialActivities.map(a => ({...a, id: generateId()}))); // Generate new IDs on reset
       // Reset common state
       setAirdropPercentage(7.5);
       setFdv(5 * 1e9);
   }, []); // No dependencies needed (sets state directly)

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      {/* ... Header ... */}
      {/* ... Disclaimer ... */}
      {/* ... Tabs ... */}

      <main>
        {activeTab === 'protocol' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* --- Column 1: Setup (Conditional) --- */}
            <section className="lg:col-span-1 bg-gray-800/60 p-5 rounded-lg shadow-lg border border-gray-700/80 backdrop-blur-sm flex flex-col">
                {/* ... Mode Toggle ... */}

                <div className="flex-grow">
                    {/* --- Basic Mode Inputs --- */}
                    {!isAdvancedMode && (
                       // ... basic sliders ...
                    )}

                    {/* --- Advanced Mode Inputs (Simplified) --- */}
                    {isAdvancedMode && (
                        <div>
                            {/* Removed ProtocolSelector and TimePeriodSelector */}
                            <ActivityInputTable activities={activities} setActivities={setActivities} />
                            <div className="mt-4 pt-3 border-t border-gray-700/50">
                                <h4 className="text-xs font-semibold text-gray-400 mb-1">Calculation Formula:</h4>
                                <p className="text-xs text-gray-500 italic">
                                    User Share = Sum (Your Metric × Weight) / Sum (Total Metric × Weight)
                                </p>
                            </div>
                        </div>
                    )}
                 </div>

               {/* ... Reset Button ... */}
            </section>

            {/* --- Column 2: Simulation & Value Params --- */}
            <section className="lg:col-span-2 space-y-6">
               {/* ... Column 2 content ... */}
            </section>
          </div>
        )}

        {/* ... Historical Tab ... */}
      </main>
      {/* ... Footer ... */}
    </div>
  );
}

export default App;
