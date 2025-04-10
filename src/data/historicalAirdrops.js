// src/data/historicalAirdrops.js

// Helper to parse currency string like "$6,432,614,493" into a number
const parseValue = (valueString) => {
    if (!valueString) return 0;
    return parseFloat(valueString.replace(/[^0-9.-]+/g,""));
};

export const historicalAirdrops = [
  { rank: 1, name: 'Uniswap', valueRaw: parseValue('$6,432,614,493'), date: 'Sep 2020' }, // Added example date
  { rank: 2, name: 'Apecoin', valueRaw: parseValue('$3,544,345,703'), date: 'Mar 2022' },
  { rank: 3, name: 'dYdX', valueRaw: parseValue('$2,009,935,493'), date: 'Sep 2021' },
  { rank: 4, name: 'Arbitrum', valueRaw: parseValue('$1,969,296,101'), date: 'Mar 2023' },
  { rank: 5, name: 'Ethereum Name Service', valueRaw: parseValue('$1,878,605,813'), date: 'Nov 2021' },
  { rank: 6, name: 'Internet Computer', valueRaw: parseValue('$1,737,391,583'), date: 'May 2021' }, // Approx date
  { rank: 7, name: 'Bonk', valueRaw: parseValue('$1,325,428,015'), date: 'Dec 2023' },
  { rank: 8, name: 'Celestia', valueRaw: parseValue('$728,380,235'), date: 'Oct 2023' },
  { rank: 9, name: 'LooksRare', valueRaw: parseValue('$712,335,336'), date: 'Jan 2022' },
  { rank: 10, name: '1inch Network (Airdrop 1)', valueRaw: parseValue('$670,872,722'), date: 'Dec 2020' }, // Approx date
  { rank: 11, name: 'Optimism (Airdrop 1)', valueRaw: parseValue('$666,493,792'), date: 'May 2022' }, // Approx date
  { rank: 12, name: 'Blur (Airdrop 1)', valueRaw: parseValue('$446,197,003'), date: 'Feb 2023' },
  { rank: 13, name: 'Aptos', valueRaw: parseValue('$431,977,140'), date: 'Oct 2022' },
  { rank: 14, name: 'Loot', valueRaw: parseValue('$387,786,055'), date: 'Sep 2021' }, // Approx date
  { rank: 15, name: 'Blur (Airdrop 2)', valueRaw: parseValue('$371,830,836'), date: 'Nov 2023' },
  { rank: 16, name: 'Jito', valueRaw: parseValue('$311,634,115'), date: 'Dec 2023' },
  { rank: 17, name: 'Gitcoin', valueRaw: parseValue('$283,807,338'), date: 'May 2021' },
  { rank: 18, name: 'ParaSwap', valueRaw: parseValue('$232,604,859'), date: 'Nov 2021' }, // Approx date
  { rank: 19, name: 'Tornado Cash', valueRaw: parseValue('$204,072,778'), date: 'May 2021' }, // Approx date
  { rank: 20, name: 'CoW Protocol', valueRaw: parseValue('$193,484,442'), date: 'Mar 2022' }, // Approx date
  { rank: 21, name: 'WorldCoin', valueRaw: parseValue('$181,911,990'), date: 'Jul 2023' },
  { rank: 22, name: 'Aidoge', valueRaw: parseValue('$174,850,390'), date: 'May 2023' }, // Approx date
  { rank: 23, name: 'The Graph', valueRaw: parseValue('$172,286,023'), date: 'Dec 2020' }, // Approx date
  { rank: 24, name: 'Memecoin', valueRaw: parseValue('$146,564,771'), date: 'Nov 2023' }, // Approx date
  { rank: 25, name: 'HashFlow', valueRaw: parseValue('$144,334,654'), date: 'Nov 2022' }, // Approx date
  { rank: 26, name: 'ZigZag', valueRaw: parseValue('$139,767,571'), date: 'Jun 2023' }, // Approx date
  { rank: 27, name: 'Instadapp', valueRaw: parseValue('$138,611,088'), date: 'Jun 2021' }, // Approx date
  { rank: 28, name: 'Ribbon Finance', valueRaw: parseValue('$132,370,223'), date: 'May 2022' }, // Approx date
  { rank: 29, name: 'Pyth Finance', valueRaw: parseValue('$124,533,425'), date: 'Nov 2023' },
  { rank: 30, name: '1inch Network (Airdrop 2)', valueRaw: parseValue('$111,812,120'), date: 'Sep 2021' }, // Approx date
  { rank: 31, name: 'Botto', valueRaw: parseValue('$111,695,841'), date: 'Oct 2021' }, // Approx date
  { rank: 32, name: 'Dogechain', valueRaw: parseValue('$95,542,882'), date: 'Aug 2022' }, // Approx date
  { rank: 33, name: 'Galxe', valueRaw: parseValue('$62,420,883'), date: 'May 2022' }, // Approx date
  { rank: 34, name: 'Optimism (Airdrop 3)', valueRaw: parseValue('$60,240,246'), date: 'Sep 2023' },
  { rank: 35, name: 'Bank (Airdrop 1)', valueRaw: parseValue('$46,784,703'), date: 'Apr 2021' }, // Approx date
  { rank: 36, name: 'Space ID', valueRaw: parseValue('$44,391,466'), date: 'Mar 2023' },
  { rank: 37, name: 'Sweat', valueRaw: parseValue('$38,863,539'), date: 'Sep 2022' }, // Approx date
  { rank: 38, name: 'Optimism (Airdrop 2)', valueRaw: parseValue('$36,440,485'), date: 'Feb 2023' },
  { rank: 39, name: 'CyberConnect', valueRaw: parseValue('$28,358,596'), date: 'Aug 2023' },
  { rank: 40, name: 'Arkham', valueRaw: parseValue('$18,983,672'), date: 'Jul 2023' },
  { rank: 41, name: 'Maverick Protocol', valueRaw: parseValue('$15,688,404'), date: 'Jun 2023' },
  { rank: 42, name: 'Notional Finance', valueRaw: parseValue('$14,846,311'), date: 'Nov 2021' }, // Approx date
  { rank: 43, name: 'Unlock Protocol', valueRaw: parseValue('$14,802,806'), date: 'Mar 2022' }, // Approx date
  { rank: 44, name: 'Forefront', valueRaw: parseValue('$14,799,284'), date: 'Mar 2021' }, // Approx date
  { rank: 45, name: 'Bank (Airdrop 2)', valueRaw: parseValue('$13,567,564'), date: 'Nov 2021' }, // Approx date
  { rank: 46, name: 'Hop Protocol', valueRaw: parseValue('$12,454,044'), date: 'Jun 2022' }, // Approx date
  { rank: 47, name: 'Index Cooperative', valueRaw: parseValue('$6,703,150'), date: 'Oct 2020' }, // Approx date
  { rank: 48, name: 'Spectra', valueRaw: parseValue('$3,188,386'), date: 'Apr 2023' }, // Approx date
  { rank: 49, name: 'Snowswap', valueRaw: parseValue('$2,307,087'), date: 'Sep 2020' }, // Approx date
  { rank: 50, name: 'DappRadar', valueRaw: parseValue('$500,814'), date: 'Dec 2021' }, // Approx date
]
.map(item => ({
    ...item,
    // Add valueBln for consistent chart usage & sorting
    valueBln: item.valueRaw / 1e9
}))
.sort((a, b) => b.valueBln - a.valueBln); // Ensure sorted by value descending


// Other data remains the same
export const airdropStats = {
  peakTiming: "46% of major airdrops saw their token price peak within 2 weeks of launch.",
  allocationRange: "Most protocols allocate between 5% and 15% of their total token supply to airdrops.",
  totalValueDistributed: "The top 50 airdrops distributed over $26.6 billion in tokens between 2020 and 2023.", // This stat still seems relevant
};

export const defaultDistribution = {
  team: 15,
  investors: 15,
  treasury: 20,
  ecosystem: 30, // This + team + investors + treasury should scale relative to (100 - airdrop %)
};