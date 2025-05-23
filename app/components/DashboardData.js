'use client';

import { useState, useEffect, useCallback } from 'react';
import FilterSection from './FilterSection';
import StatsGrid from './StatsGrid';
import StatusCharts from './StatusCharts';
import DealerTable from './DealerTable';
import LoginReset from './LoginReset';

const DashboardData = ({ viewType, department }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterSelection, setFilterSelection] = useState({
    audit: '',
    month: ''
  });
  const [showContent, setShowContent] = useState(false);

  // Add loading effect when viewType or department changes
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [viewType, department]);

  // Memoize the handleFilterChange function
  const handleFilterChange = useCallback((filters) => {
    setFilterSelection(filters);
    setShowContent(!!filters.audit && !!filters.month);
  }, []); // Empty dependency array since it only uses setState functions which are stable

  // Mock data for the dealers based on department
  const dealersByDepartment = {
    SALES: [
      { code: '1000002', name: 'DEMO DEALER TWO', reviewerStatus: 'In Progress', auditorStatus: 'In Progress' },
      { code: '1000003', name: 'DEMO DEALER THREE', reviewerStatus: 'TM Inprogress', auditorStatus: 'TM Inprogress' },
      { code: '10015', name: 'PAWAN SEKHAR AUTOMOBILES', reviewerStatus: 'Approved', auditorStatus: 'Approved' }
    ],
    MARKETING: [
      { code: '10032', name: 'ASIAN AGENCIES', reviewerStatus: 'ASM Approval Pending', auditorStatus: 'AM Approval Pending' },
      { code: '10047', name: 'MGR ENTERPRISES', reviewerStatus: 'Not Started', auditorStatus: 'Not Started' },
      { code: '10066', name: 'OCEANIC MOTORS PVT.LTD', reviewerStatus: 'In Progress', auditorStatus: 'In Progress' }
    ],
    SERVICE: [
      { code: '10080', name: 'ARYA MOTORS', reviewerStatus: 'Approved', auditorStatus: 'Approved' },
      { code: '10082', name: 'BHARATH TRACTORS', reviewerStatus: 'Not Started', auditorStatus: 'Not Started' },
      { code: '10083', name: 'GREEN AUTOS', reviewerStatus: 'In Progress', auditorStatus: 'In Progress' }
    ]
  };

  const dealers = dealersByDepartment[department] || [];

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= 8) {
      setCurrentPage(page);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < 8) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Chart data by department
  const chartDataByDepartment = {
    SALES: {
      auditor: [
        { name: 'Not Started', value: 60, color: '#0052FF' },
        { name: 'Audit Inprogress', value: 10, color: '#FF6B00' },
        { name: 'Action Plan Pending', value: 20, color: '#FFD600' },
        { name: 'Completed', value: 10, color: '#007F00' }
      ],
      reviewer: [
        { name: 'Approval Pending', value: 60, color: '#0052FF' },
        { name: 'Approval Inprogress', value: 30, color: '#FF6B00' },
        { name: 'Approved', value: 10, color: '#00A300' }
      ]
    },
    MARKETING: {
      auditor: [
        { name: 'Not Started', value: 35, color: '#0052FF' },
        { name: 'Audit Inprogress', value: 30, color: '#FF6B00' },
        { name: 'Action Plan Pending', value: 20, color: '#FFD600' },
        { name: 'Completed', value: 15, color: '#007F00' }
      ],
      reviewer: [
        { name: 'Approval Pending', value: 45, color: '#0052FF' },
        { name: 'Approval Inprogress', value: 40, color: '#FF6B00' },
        { name: 'Approved', value: 15, color: '#00A300' }
      ]
    },
    SERVICE: {
      auditor: [
        { name: 'Not Started', value: 15, color: '#0052FF' },
        { name: 'Audit Inprogress', value: 25, color: '#FF6B00' },
        { name: 'Action Plan Pending', value: 40, color: '#FFD600' },
        { name: 'Completed', value: 20, color: '#007F00' }
      ],
      reviewer: [
        { name: 'Approval Pending', value: 30, color: '#0052FF' },
        { name: 'Approval Inprogress', value: 45, color: '#FF6B00' },
        { name: 'Approved', value: 25, color: '#00A300' }
      ]
    }
  };

  // Use department-specific chart data or fallback to default
  const { auditor: auditorData, reviewer: reviewerData } = chartDataByDepartment[department] || { 
    auditor: [], 
    reviewer: [] 
  };

  if (viewType === 'Login Reset') {
    return <LoginReset />;
  }

  if (isLoading) {
    return (
      <div className="loadingContainer">
        <div className="loader"></div>
        <div className="loadingText">Loading {viewType}...</div>
        <style jsx>{`
          .loadingContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
          }

          .loader {
            border: 4px solid #f3f3f3;
            border-radius: 50%;
            border-top: 4px solid #0066cc;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }

          .loadingText {
            color: #666;
            font-size: 16px;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboardData">
      <div className="sectionTitle">{viewType} View - {department}</div>
      <FilterSection onFilterChange={handleFilterChange} />
      <StatsGrid department={department} viewType={viewType} />
      <StatusCharts 
        auditorData={showContent ? auditorData : []} 
        reviewerData={showContent ? reviewerData : []} 
        showCharts={showContent}
      />
      {showContent && (
        <DealerTable 
          dealers={dealers}
          currentPage={currentPage}
          goToPage={goToPage}
          goToPrevious={goToPrevious}
          goToNext={goToNext}
        />
      )}
      <style jsx>{`
        .dashboardData {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          animation: fadeIn 0.3s ease-in;
          margin: 20px;
        }
        
        .sectionTitle {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 24px;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 2px solid #f0f0f0;
        }

        .contentContainer {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease;
        }

        .contentContainer.visible {
          opacity: 1;
          visibility: visible;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardData;
