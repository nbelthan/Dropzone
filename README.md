# Drop Zone - Airdrop Value Projector

A React application built to help users estimate and project potential airdrop values based on various parameters and simulated activity.

## Features

*   **Basic Mode:** Simple estimation using sliders for total activities, user share percentage, and weight.
*   **Advanced Mode:** Detailed projection allowing users to define multiple custom activity types, assign individual metrics (user amount, protocol total), and set weights for each.
*   **Valuation Parameters:** Adjust projected FDV and the percentage of token supply allocated to the airdrop.
*   **Visualizations:**
    *   Token Allocation Pie Chart (using Visx)
    *   Historical Airdrop Comparison Bar Chart (using Recharts)
    *   Projected Outcome Summary
*   **Responsive Design:** Layout adjusts to different screen sizes.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nbelthan/Dropzone.git
    cd Dropzone
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm start
    # or
    # yarn start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

This project is configured for easy deployment on Vercel.

## Disclaimer

This tool provides estimations and projections based on user inputs & hypothetical weights/models. Actual airdrop values depend on numerous factors (final tokenomics, specific distribution criteria, market conditions, Sybil filtering) and can differ significantly. This is for educational & illustrative purposes only and is not financial advice. Do Your Own Research (DYOR). 