'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../utils/auth';

const Header = ({ department, setDepartment }) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <header className="header">
      <div className="leftSection">
        <div className="logo">TVS QLQD</div>
        <div className="separator"></div>
        <div className="departmentContainer">
          <select 
            className="departmentSelect"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="SALES">SALES</option>
            <option value="MARKETING">MARKETING</option>
            <option value="SERVICE">SERVICE</option>
          </select>
        </div>
      </div>
      <div className="userActions">
        <div className="userIconContainer" onClick={() => setShowDropdown(!showDropdown)}>
          <span className="userIcon">👤</span>
          {showDropdown && (
            <div className="dropdown">
              <button onClick={handleLogout} className="dropdownItem">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          background-color: white;
          border-bottom: 1px solid #e0e0e0;
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .leftSection {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logo {
          font-weight: 600;
          font-size: 20px;
          color: #00008B;
          letter-spacing: 0.5px;
        }

        .separator {
          width: 1px;
          height: 24px;
          background-color: #e0e0e0;
          margin: 0 4px;
        }

        .departmentContainer {
          display: flex;
          align-items: center;
        }

        .departmentSelect {
          padding: 6px 32px 6px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: white;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-size: 12px;
          cursor: pointer;
          transition: border-color 0.2s;
        }

        .departmentSelect:hover {
          border-color: #bbb;
        }

        .departmentSelect:focus {
          outline: none;
          border-color: #999;
        }

        .userIconContainer {
          position: relative;
          cursor: pointer;
        }

        .userIcon {
          font-size: 20px;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-color: #f0f0f0;
          transition: background-color 0.2s;
        }

        .userIcon:hover {
          background-color: #e5e5e5;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: white;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          min-width: 120px;
          z-index: 1000;
          border: 1px solid #eee;
        }

        .dropdownItem {
          padding: 8px 16px;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #333;
          transition: background-color 0.2s;
        }

        .dropdownItem:hover {
          background-color: #f5f5f5;
        }

        @media (max-width: 768px) {
          .header {
            padding: 12px 16px;
          }
          
          .leftSection {
            gap: 12px;
          }
          
          .logo {
            font-size: 18px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
