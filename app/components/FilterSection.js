'use client';
import { useState, useEffect } from 'react';

const FilterSection = ({ onFilterChange }) => {
  const [selectedAudit, setSelectedAudit] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTerritory, setSelectedTerritory] = useState('');

  useEffect(() => {
    onFilterChange?.({
      audit: selectedAudit,
      month: selectedMonth,
      zone: selectedZone,
      area: selectedArea,
      territory: selectedTerritory
    });
  }, [selectedAudit, selectedMonth, selectedZone, selectedArea, selectedTerritory, onFilterChange]);

  return (
    <div className="filterContainer">
      <div className="filterItem">
        <select 
          className="filterSelect"
          value={selectedAudit}
          onChange={(e) => setSelectedAudit(e.target.value)}
        >
          <option value="">Select Audit</option>
          <option value="qlqd_24_25_h2">QLQD Sales Audit(24-25 H2)</option>
          <option value="qlqd_23_24_h2">QLQD Sales Audit(23-24 H2)</option>
          <option value="qlqd_24_25_h1">QLQD Sales Audit(24-25 H1)</option>
          <option value="mystery_24_25_h1">Mystery QLQD Sales Audit (24-25 H1)</option>
          <option value="qlqd_23_24_q1">QLQD Audit - Sales (23-24 Q1)</option>
          <option value="qlqd_22_23_q4">QLQD Audit - Sales (22-23 Q4)</option>
        </select>
      </div>
      <div className="filterItem">
        <select 
          className="filterSelect"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Audit Month</option>
          <option value="hrd_24_25">HRD(2024-25)</option>
        </select>
      </div>
      <div className="filterItem">
        <select 
          className="filterSelect"
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
        >
          <option value="">Select Zone</option>
          <option value="north">North Zone</option>
          <option value="south">South Zone</option>
          <option value="east">East Zone</option>
          <option value="west">West Zone</option>
          <option value="central">Central Zone</option>
        </select>
      </div>
      <div className="filterItem">
        <select 
          className="filterSelect"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">Select Area</option>
          <option value="delhi_ncr">Delhi NCR</option>
          <option value="mumbai">Mumbai Metropolitan</option>
          <option value="bangalore">Bangalore Urban</option>
          <option value="chennai">Chennai</option>
          <option value="kolkata">Kolkata</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="pune">Pune</option>
          <option value="ahmedabad">Ahmedabad</option>
        </select>
      </div>
      <div className="filterItem">
        <select 
          className="filterSelect"
          value={selectedTerritory}
          onChange={(e) => setSelectedTerritory(e.target.value)}
        >
          <option value="">Select Territory</option>
          <option value="t1">Territory 1</option>
          <option value="t2">Territory 2</option>
          <option value="t3">Territory 3</option>
          <option value="t4">Territory 4</option>
          <option value="t5">Territory 5</option>
          <option value="t6">Territory 6</option>
        </select>
      </div>
      <style jsx>{`
        .filterContainer {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 30px;
        }

        .filterItem {
          flex: 1;
          min-width: 150px;
        }

        .filterSelect {
          width: 100%;
          padding: 10px 35px 10px 0px;
          border: none;
          border-bottom: 2px solid #e0e0e0;
          background-color: white;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%234a90e2' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0px center;
          background-size: 12px;
          padding-right: 20px;
          cursor: pointer;
          font-size: 14px;
          color: #2c3e50;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .filterSelect:hover {
          border-bottom-color: #4a90e2;
        }

        .filterSelect:focus {
          outline: none;
          border-bottom-color: #4a90e2;
        }

        .filterSelect option {
          padding: 10px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default FilterSection;
