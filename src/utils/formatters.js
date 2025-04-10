// src/utils/formatters.js
export const formatCurrency = (value, maximumFractionDigits = 0) => {
    if (value === null || value === undefined || isNaN(value)) {
      return '$--';
    }
    // Handle very large numbers that might lose precision with default toLocaleString
    if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
        return `$${(value / 1e6).toFixed(2)}M`;
    }
     if (value >= 1e3) {
        return `$${(value / 1e3).toFixed(1)}K`;
    }
  
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: 0, // Avoid .00 for whole numbers by default if maxFractionDigits is 0
    });
  };
  
  export const formatNumber = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return '--';
    }
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(2)}M`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`; // Changed to 1 decimal for K
    }
    return value.toString();
  };
  
  export const formatLargeNumber = (num) => {
      if (num === null || num === undefined || isNaN(num)) return '--';
      return num.toLocaleString('en-US');
  };