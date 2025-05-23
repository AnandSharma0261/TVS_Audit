'use client';

import DonutChart from './DonutChart';

const StatusCharts = ({ auditorData, reviewerData, showCharts = false }) => {
  return (
    <div className="statusContainer">
      <div className="statusBox">
        <div className="statusTitle">Auditor Status</div>
        <div className={`chartContent ${showCharts ? 'visible' : 'hidden'}`}>
          <DonutChart data={auditorData} />
        </div>
      </div>
      <div className="statusBox">
        <div className="statusTitle">Reviewer Status</div>
        <div className={`chartContent ${showCharts ? 'visible' : 'hidden'}`}>
          <DonutChart data={reviewerData} />
        </div>
      </div>
      <style jsx>{`
        .statusContainer {
          display: flex;
          gap: 20px;
          margin: 20px 0;
          transition: all 0.3s ease;
        }

        .statusBox {
          flex: 1;
          min-height: 200px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .statusTitle {
          padding: 15px;
          font-weight: bold;
          border-bottom: 1px solid #e0e0e0;
          background-color: #f8f8f8;
          border-radius: 8px 8px 0 0;
          color: #333;
        }

        .chartContent {
          transition: opacity 0.3s ease;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chartContent.hidden {
          opacity: 0;
        }

        .chartContent.visible {
          opacity: 1;
        }

        @media (max-width: 1200px) {
          .statusContainer {
            flex-direction: column;
          }

          .statusBox {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default StatusCharts;
