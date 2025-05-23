'use client';

import { useState, useEffect } from 'react';

const DonutChart = ({ title, data }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const radius = 80;
  const strokeWidth = 30;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  return (
    <div className="chart-container">
      <div className="donut-chart">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {mounted && data.map((segment, index) => {
            const percentage = segment.value;
            const dashOffset = circumference * (1 - percentage / 100);
            const rotation = startAngle;
            startAngle += (percentage / 100) * 360;

            return (
              <circle
                key={index}
                cx="100"
                cy="100"
                r={normalizedRadius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={dashOffset}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: '100px 100px',
                  transition: 'stroke-dashoffset 0.5s ease'
                }}
              />
            );
          })}
          <circle
            cx="100"
            cy="100"
            r={radius - strokeWidth}
            fill="white"
          />
          {mounted && (
            <text
              x="100"
              y="105"
              textAnchor="middle"
              className="percentage-text"
              fill="#000"
              fontSize="18"
              fontWeight="bold"
            >
              {data[0]?.value.toFixed(1)}%
            </text>
          )}
        </svg>
      </div>
      <div className="legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: item.color }}></div>
            <div className="legend-name">{item.name}</div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .chart-container {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .donut-chart {
          position: relative;
        }
        .legend {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          max-width: 200px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          font-size: 12px;
        }
        .legend-color {
          width: 12px;
          height: 12px;
          margin-right: 8px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default DonutChart;
