"use client";

import React, { useEffect, useState } from "react";
import { Doughnut, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./DashboardPage.module.css";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  // Dummy data – replace with your real API calls.
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState({
    totalShares: 0,
    totalInvestment: 0,
    stakeholderCount: 0,
    avgSharePrice: 0,
    marketValuation: 0,
    fundingRounds: 0,
  });
  const [capTableChartData, setCapTableChartData] = useState({});
  const [investmentChartData, setInvestmentChartData] = useState({});
  const [valuationData, setValuationData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [currentStage, setCurrentStage] = useState("Series A");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const totalShares = 20000;
      const totalInvestment = 500000;
      const stakeholderCount = 10;
      const avgSharePrice = (totalInvestment / totalShares).toFixed(2);
      const marketValuation = totalInvestment * 5;
      const fundingRounds = 4;
      setSummaryData({ totalShares, totalInvestment, stakeholderCount, avgSharePrice, marketValuation, fundingRounds });

      // Cap Table Breakdown (Doughnut chart)
      const capLabels = ["Founders", "Investors", "Employees", "Advisors"];
      const capValues = [8000, 7000, 3000, 2000];
      setCapTableChartData({
        labels: capLabels,
        datasets: [
          {
            data: capValues,
            backgroundColor: ["#B500FF", "#FF6B6B", "#4ECDC4", "#FFD93D"],
          },
        ],
      });

      // Investment Breakdown (Pie chart)
      const invLabels = ["Angel", "VC", "Private Equity", "Others"];
      const invValues = [150000, 250000, 70000, 30000];
      setInvestmentChartData({
        labels: invLabels,
        datasets: [
          {
            data: invValues,
            backgroundColor: ["#B500FF", "#FF6B6B", "#4ECDC4", "#FFD93D"],
          },
        ],
      });

      // Valuation Progression (Line chart)
      const devLabels = ["Pre-seed", "Seed", "Series A", "Series B", "IPO"];
      const devValues = [1, 5, 20, 50, 200]; // in millions
      setValuationData({
        labels: devLabels,
        datasets: [
          {
            label: "Valuation (M USD)",
            data: devValues,
            borderColor: "#B500FF",
            backgroundColor: "rgba(181, 0, 255, 0.2)",
            tension: 0.3,
            fill: true,
          },
        ],
      });

      // Recent Transactions (dummy data)
      setTransactions([
        { date: "2023-06-01", type: "Buy", shares: 1000, price: 25, investor: "VC Fund A" },
        { date: "2023-06-15", type: "Sell", shares: 500, price: 27, investor: "Investor X" },
        { date: "2023-07-01", type: "Buy", shares: 1500, price: 26, investor: "Angel Y" },
        { date: "2023-07-10", type: "Buy", shares: 800, price: 24, investor: "VC Fund B" },
        { date: "2023-07-20", type: "Transfer", shares: 300, price: 0, investor: "Employee Z" },
      ]);

      // Set current development stage.
      setCurrentStage("Series A");

      setLoading(false);
    }, 1200);
  }, []);

  // Define development stages.
  const developmentSteps = ["Pre-seed", "Seed", "Series A", "Series B", "IPO"];
  const currentStageIndex = developmentSteps.indexOf(currentStage);

  if (loading) {
    return <div className={styles.dashboard}>Loading Dashboard...</div>;
  }

  return (
    <div className={styles.dashboard}>
      {/* Top Summary Row */}
      <section className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.cardLabel}>Total Shares</div>
          <div className={styles.cardValue}>{summaryData.totalShares.toLocaleString()}</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.cardLabel}>Total Investment</div>
          <div className={styles.cardValue}>${summaryData.totalInvestment.toLocaleString()}</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.cardLabel}>Stakeholders</div>
          <div className={styles.cardValue}>{summaryData.stakeholderCount}</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.cardLabel}>Avg. Share Price</div>
          <div className={styles.cardValue}>${summaryData.avgSharePrice}</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.cardLabel}>Market Valuation</div>
          <div className={styles.cardValue}>${summaryData.marketValuation.toLocaleString()}</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.cardLabel}>Funding Rounds</div>
          <div className={styles.cardValue}>{summaryData.fundingRounds}</div>
        </div>
      </section>

      {/* Middle Charts Section */}
      <section className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Cap Table Breakdown</div>
          <div className={styles.chartWrapper}>
            <Doughnut
              data={capTableChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Investment Breakdown</div>
          <div className={styles.chartWrapper}>
            <Pie
              data={investmentChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section className={styles.developmentSection}>
        <h3 className={styles.developmentTitle}>Development Stages</h3>
        <div className={styles.timeline}>
          {developmentSteps.map((step, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.stepLabel}>{step}</div>
              <div className={`${styles.circle} ${index <= currentStageIndex ? styles.active : ""}`}></div>
              {index < developmentSteps.length - 1 && <div className={styles.connector}></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Recent Transactions Table */}
      <section className={styles.tableSection}>
        <h3 className={styles.tableTitle}>Recent Transactions</h3>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Shares</th>
              <th>Price</th>
              <th>Investor</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx}>
                <td>{tx.date}</td>
                <td>{tx.type}</td>
                <td>{tx.shares.toLocaleString()}</td>
                <td>{tx.price > 0 ? `$${tx.price}` : "-"}</td>
                <td>{tx.investor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DashboardPage;
