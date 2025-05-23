'use client';
import * as XLSX from 'xlsx';

const DealerTable = ({ dealers, currentPage, goToPage, goToPrevious, goToNext }) => {
  const downloadExcel = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Convert dealers data to worksheet format
    const ws = XLSX.utils.json_to_sheet(dealers.map(dealer => ({
      'Dealer Code': dealer.code,
      'Dealer Name': dealer.name,
      'Reviewer Status': dealer.reviewerStatus,
      'Auditor Status': dealer.auditorStatus
    })));

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Dealer Status");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "OLAD_Status_Report.xlsx");
  };

  return (
    <div className="dealerStatusSection">
      <div className="header">
        <div className="selectContainer">
          <label htmlFor="status">Select Status</label>
          <div className="selectWrapper">
            <select id="status" className="selectStatus">
              <option value="all">All</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="pending">Approval Pending</option>
            </select>
          </div>
        </div>
        <button className="downloadButton" onClick={downloadExcel}>
          Download OLAD Status Report
        </button>
      </div>

      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th>Dealer Code</th>
              <th>Dealer Name</th>
              <th>Reviewer Status</th>
              <th>Auditor Status</th>
            </tr>
          </thead>
          <tbody>
            {dealers.map((dealer) => (
              <tr key={dealer.code}>
                <td>{dealer.code}</td>
                <td>{dealer.name}</td>
                <td>{dealer.reviewerStatus}</td>
                <td>{dealer.auditorStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="paginationItem" onClick={goToPrevious}>« Previous</span>
        {[1, 2, 3, 4, 5].map((page) => (
          <span 
            key={page}
            className={`paginationItem ${currentPage === page ? 'active' : ''}`}
            onClick={() => goToPage(page)}
          >
            {page}
          </span>
        ))}
        <span className="paginationEllipsis">...</span>
        <span 
          className={`paginationItem ${currentPage === 8 ? 'active' : ''}`}
          onClick={() => goToPage(8)}
        >
          88
        </span>
        <span className="paginationItem" onClick={goToNext}>Next »</span>
      </div>

      <style jsx>{`
        .dealerStatusSection {
          margin-top: 30px;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          animation: slideIn 0.3s ease-out;
        }

        .tableContainer {
          margin-top: 20px;
          overflow-x: auto;
        }

        .table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          color: #333;
        }

        .table th, .table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
          transition: background-color 0.2s;
        }

        .table th {
          background-color: #f8f8f8;
          font-weight: 600;
          color: #444;
          position: sticky;
          top: 0;
          z-index: 1;
        }

        .table tr:hover td {
          background-color: #f5f8ff;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .paginationItem {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          min-width: 32px;
          height: 32px;
          padding: 0 12px;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .paginationItem:hover {
          background-color: #f0f0f0;
          border-color: #d0d0d0;
        }

        .paginationItem.active {
          background-color: #0066ff;
          color: white;
          border-color: #0066ff;
        }

        .paginationEllipsis {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          min-width: 32px;
          height: 32px;
          font-size: 14px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .selectContainer {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .selectStatus {
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          min-width: 150px;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        .selectStatus:focus {
          border-color: #0066ff;
          outline: none;
        }

        .downloadButton {
          padding: 8px 16px;
          background-color: #0066cc;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
          font-size: 14px;
        }

        .downloadButton:hover {
          background-color: #0052a3;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 15px;
          }

          .selectContainer {
            width: 100%;
          }

          .selectStatus {
            width: 100%;
          }

          .downloadButton {
            width: 100%;
          }

          .table {
            font-size: 14px;
          }

          .pagination {
            gap: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default DealerTable;
