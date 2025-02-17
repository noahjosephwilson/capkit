import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./DashboardPage.css";

// InfoCard: Displays a quick metric with an animated number.
const InfoCard = ({ title, value, details }) => {
  return (
    <div className="info-card">
      <div className="info-card-title">{title}</div>
      <div className="info-card-value">
        <span className="animated-number">{value}</span>
      </div>
      {details && <div className="info-card-details">{details}</div>}
    </div>
  );
};

// RingPieChart: A sample donut chart showing equity distribution.
// The animation makes each segment appear in a clockwise sequence.
// Each segment starts with a full offset (none visible) and animates to its final value.
// RingPieChart: A sample donut chart showing equity distribution.
// The graph simply fades in on page load.
const RingPieChart = () => {
  const segments = [
    { label: 'Founders', percentage: 30, color: '#6A0DAD' },
    { label: 'Investors', percentage: 20, color: '#8A2BE2' },
    { label: 'Employees', percentage: 15, color: '#B19CD9' },
    { label: 'Ex-Employees', percentage: 5, color: '#D8BFD8' },
    { label: 'Advisors', percentage: 10, color: '#9370DB' },
    { label: 'Consultants', percentage: 5, color: '#663399' },
    { label: 'Other', percentage: 10, color: '#836FFF' },
    { label: 'Unallocated', percentage: 5, color: '#E6E6FA' }
  ];

  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="ring-pie-chart">
      <div className="box-header">
        <h3 className="chart-title">Equity Distribution</h3>
        <a href="#" className="show-more">Show More</a>
      </div>
      <div className="ring-chart-container animate-fadeIn">
        <svg viewBox="0 0 300 300" className="ring-svg">
          {/* Background ring */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            fill="none"
            stroke="#eee"
            strokeWidth="25"
          />
          {segments.map((segment, index) => {
            const segmentLength = (segment.percentage / 100) * circumference;
            const dashArray = `${segmentLength} ${circumference}`;
            const finalDashOffset = -offset;
            offset += segmentLength;
            return (
              <circle
                key={index}
                cx="150"
                cy="150"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="25"
                strokeDasharray={dashArray}
                strokeDashoffset={finalDashOffset}
                transform="rotate(-90 150 150)"
                strokeLinecap="butt"
              />
            );
          })}
        </svg>
        <div className="ring-legend">
          {segments.map((seg, idx) => (
            <div key={idx}>
              <span className="legend-color" style={{ background: seg.color }}></span>
              {seg.label} ({seg.percentage}%)
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// GuidesBox: Displays four clickable square boxes side by side.
const GuidesBox = () => {
  const guides = [
    { label: "Getting Started", color: "#E6E6FA" },
    { label: "Equity 101", color: "#D8BFD8" },
    { label: "Advanced Tips", color: "#9370DB" },
    { label: "FAQ", color: "#9966CC" }
  ];

  return (
    <div className="guides-box">
      <h3>Guides</h3>
      <div className="guide-squares">
        {guides.map((guide, idx) => (
          <div
            key={idx}
            className="guide-box"
            style={{ backgroundColor: guide.color }}
            onClick={() => alert(`Clicked on: ${guide.label}`)}
          >
            {guide.label}
          </div>
        ))}
      </div>
    </div>
  );
};

// ActivityBox: A box displaying recent activity as a simple bulleted list.
// Includes a header with a "Show More" link.
const ActivityBox = () => {
  const activities = [
    "User A updated their profile.",
    "User B issued new shares.",
    "Quarterly funding round completed.",
    "New guide added: 'Equity Management 101'"
  ];
  return (
    <div className="activity-box">
      <div className="box-header">
        <h3>Recent Activity</h3>
        <a href="#" className="show-more">Show More</a>
      </div>
      <ul>
        {activities.slice(0, 3).map((activity, idx) => (
          <li key={idx}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

const DashboardPage = () => {
  const { currentUser } = useAuth();

  const data = {
    sharesIssued: 1500000,
    shareholders: 75,
    valuation: "$30,000,000"
  };

  return (
    <div className="dashboard-page">
      <div className="top-row">
        <InfoCard
          title="Shares Issued"
          value={data.sharesIssued.toLocaleString()}
          details="Total shares issued"
        />
        <InfoCard
          title="Shareholders"
          value={data.shareholders}
          details="Active investors"
        />
        <InfoCard
          title="Latest Valuation"
          value={data.valuation}
          details="Based on recent funding"
        />
      </div>
      <div className="bottom-row">
        <div className="left-bottom">
          <RingPieChart />
        </div>
        <div className="right-bottom">
          <GuidesBox />
          <ActivityBox />
        </div>
      </div>
      {currentUser && (
        <div className="dashboard-footer">
          <p>
            Logged in as: <strong>{currentUser.displayName}</strong> ({currentUser.email})
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
