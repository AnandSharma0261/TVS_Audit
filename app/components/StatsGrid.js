'use client';

const StatsGrid = ({ department, viewType = 'Dashboard' }) => {
  // Stats data by view type and department
  const statsByViewAndDepartment = {
    Dashboard: {
      SALES: {
        totalDealers: 150,
        notStarted: 30,
        techIssue: 5,
        started: 45,
        inProgress: 25,
        actionPending: 15,
        dataSyncInProgress: 10,
        approvalPending: 12,
        approvalInProgress: 5,
        appDataSyncInProgress: 2,
        approved: 1
      },
      MARKETING: {
        totalDealers: 120,
        notStarted: 20,
        techIssue: 3,
        started: 35,
        inProgress: 30,
        actionPending: 12,
        dataSyncInProgress: 8,
        approvalPending: 7,
        approvalInProgress: 3,
        appDataSyncInProgress: 1,
        approved: 1
      },
      SERVICE: {
        totalDealers: 180,
        notStarted: 40,
        techIssue: 8,
        started: 50,
        inProgress: 35,
        actionPending: 20,
        dataSyncInProgress: 12,
        approvalPending: 8,
        approvalInProgress: 5,
        appDataSyncInProgress: 1,
        approved: 1
      }
    },
    Reports: {
      SALES: {
        totalDealers: 200,
        notStarted: 45,
        techIssue: 8,
        started: 60,
        inProgress: 35,
        actionPending: 20,
        dataSyncInProgress: 15,
        approvalPending: 10,
        approvalInProgress: 5,
        appDataSyncInProgress: 1,
        approved: 1
      },
      MARKETING: {
        totalDealers: 150,
        notStarted: 30,
        techIssue: 5,
        started: 45,
        inProgress: 25,
        actionPending: 15,
        dataSyncInProgress: 12,
        approvalPending: 10,
        approvalInProgress: 6,
        appDataSyncInProgress: 1,
        approved: 1
      },
      SERVICE: {
        totalDealers: 220,
        notStarted: 50,
        techIssue: 10,
        started: 65,
        inProgress: 40,
        actionPending: 25,
        dataSyncInProgress: 15,
        approvalPending: 8,
        approvalInProgress: 5,
        appDataSyncInProgress: 1,
        approved: 1
      }
    },
    "Management View": {
      SALES: {
        totalDealers: 180,
        notStarted: 35,
        techIssue: 6,
        started: 50,
        inProgress: 30,
        actionPending: 25,
        dataSyncInProgress: 15,
        approvalPending: 10,
        approvalInProgress: 7,
        appDataSyncInProgress: 1,
        approved: 1
      },
      MARKETING: {
        totalDealers: 140,
        notStarted: 25,
        techIssue: 4,
        started: 40,
        inProgress: 30,
        actionPending: 15,
        dataSyncInProgress: 10,
        approvalPending: 8,
        approvalInProgress: 6,
        appDataSyncInProgress: 1,
        approved: 1
      },
      SERVICE: {
        totalDealers: 200,
        notStarted: 45,
        techIssue: 8,
        started: 55,
        inProgress: 35,
        actionPending: 25,
        dataSyncInProgress: 15,
        approvalPending: 10,
        approvalInProgress: 5,
        appDataSyncInProgress: 1,
        approved: 1
      }
    },
    "Department View": {
      SALES: {
        totalDealers: 160,
        notStarted: 35,
        techIssue: 5,
        started: 45,
        inProgress: 28,
        actionPending: 18,
        dataSyncInProgress: 12,
        approvalPending: 9,
        approvalInProgress: 6,
        appDataSyncInProgress: 1,
        approved: 1
      },
      MARKETING: {
        totalDealers: 130,
        notStarted: 25,
        techIssue: 4,
        started: 38,
        inProgress: 25,
        actionPending: 15,
        dataSyncInProgress: 10,
        approvalPending: 7,
        approvalInProgress: 4,
        appDataSyncInProgress: 1,
        approved: 1
      },
      SERVICE: {
        totalDealers: 190,
        notStarted: 42,
        techIssue: 7,
        started: 52,
        inProgress: 38,
        actionPending: 22,
        dataSyncInProgress: 13,
        approvalPending: 9,
        approvalInProgress: 6,
        appDataSyncInProgress: 1,
        approved: 1
      }
    }
  };

  // Get stats for current view type and department or default to zeros
  const stats = statsByViewAndDepartment[viewType]?.[department] || {
    totalDealers: 0,
    notStarted: 0,
    techIssue: 0,
    started: 0,
    inProgress: 0,
    actionPending: 0,
    dataSyncInProgress: 0,
    approvalPending: 0,
    approvalInProgress: 0,
    appDataSyncInProgress: 0,
    approved: 0
  };

  return (
    <div className="statsContainer">
      <div className="statItem">
        <div className="statLabel">Total Dealers</div>
        <div className="statValue">{stats.totalDealers} <span className="arrow">↘</span></div>
      </div>
      <div className="statItem">
        <div className="statLabel">Audit Not Started</div>
        <div className="statValue">{stats.notStarted} <span className="arrow">↘</span></div>
      </div>
      <div className="statItem">
        <div className="statLabel">Not Started Tech. Issue</div>
        <div className="statValue">{stats.techIssue} <span className="arrow">↘</span></div>
      </div>
      <div className="statItem">
        <div className="statLabel">Audit Started</div>
        <div className="statValue">{stats.started} <span className="arrow">↘</span></div>
      </div>
      <div className="statItem">
        <div className="statLabel">Audit Inprogress</div>
        <div className="statValueHighlighted">{stats.inProgress} <span className="arrow">→</span></div>
      </div>
      <div className="statItem">
        <div className="statLabel">Action Plan Pending</div>
        <div className="statValueGreen">{stats.actionPending} <span className="arrow">↘</span></div>
      </div>
      <div className="statItem">
        <div className="statLabel">Data Sync Inprog.</div>
        <div className="statValue">{stats.dataSyncInProgress} <span className="arrow">↘</span></div>
      </div>
      <div className="statItem">
        <div className="statLabel">Completed & Approval Pending</div>
        <div className="statValueBlue">{stats.approvalPending} <span className="arrow">↘</span></div>
      </div>
      <div className="statItem">
        <div className="statLabel">Approval Inprogress</div>
        <div className="statValueOrange">{stats.approvalInProgress} <span className="arrow">↘</span></div>
      </div>
      <div className="statItem">
        <div className="statLabel">App. Data Sync Inprog.</div>
        <div className="statValueOrange">{stats.appDataSyncInProgress} <span className="arrow">↘</span></div>
      </div>
      <div className="statItem">
        <div className="statLabel">Approved</div>
        <div className="statValueGreen">{stats.approved} <span className="arrow">↘</span></div>
      </div>
      <style jsx>{`
        .statsContainer {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
        }

        .statItem {
          flex: 1;
          min-width: 100px;
          text-align: center;
        }

        .statLabel {
          font-size: 13px;
          margin-bottom: 5px;
          color: #333;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .statValue, .statValueHighlighted, .statValueGreen, .statValueBlue, .statValueOrange {
          font-size: 22px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .statValue {
          color: #333;
        }

        .statValueHighlighted {
          color: #0066cc;
        }

        .statValueGreen {
          color: green;
        }

        .statValueBlue {
          color: #0066cc;
        }

        .statValueOrange {
          color: #ff6600;
        }

        .arrow {
          font-size: 14px;
          margin-left: 5px;
        }
      `}</style>
    </div>
  );
};

export default StatsGrid;