'use client';

const Navbar = ({ activeView, onViewChange }) => {
  // Handler for view changes
  const handleViewClick = (view) => {
    if (view !== activeView) {
      onViewChange(view);
    }
  };

  return (
    <nav className="navbar">
      <div 
        className={`navItem ${activeView === 'Dashboard' ? 'active' : ''}`}
        onClick={() => handleViewClick('Dashboard')}
      >
        Dashboard
      </div>
      <div className="dropdown">
        <div 
          className={`navItem ${activeView === 'Reports' ? 'active' : ''}`}
          onClick={() => handleViewClick('Reports')}
        >
          Reports <span>▼</span>
          <div className="dropdownContent">
            <div className="dropdownItem" onClick={() => handleViewClick('Dealer Score Report')}>Dealer Score Report</div>
            <div className="dropdownItem" onClick={() => handleViewClick('AM / ASM Report')}>AM / ASM Report</div>
            <div className="dropdownItem" onClick={() => handleViewClick('TM Report')}>TM Report</div>
            <div className="dropdownItem" onClick={() => handleViewClick('Img. Compliance Report')}>Img. Compliance Report</div>
            <div className="dropdownItem" onClick={() => handleViewClick('TM Vs Layered Audit')}>TM Vs Layered Audit</div>
          </div>
        </div>
      </div>
      <div 
        className={`navItem ${activeView === 'Management View' ? 'active' : ''}`}
        onClick={() => handleViewClick('Management View')}
      >
        Management View
      </div>
      <div className="dropdown">
        <div 
          className={`navItem ${activeView === 'Department View' ? 'active' : ''}`}
          onClick={() => handleViewClick('Department View')}
        >
          Department View <span>▼</span>
        </div>
      </div>
      <div 
        className={`navItem ${activeView === 'Login Reset' ? 'active' : ''}`}
        onClick={() => handleViewClick('Login Reset')}
      >
        Login Reset
      </div>
      <style jsx>{`        .navbar {
          display: flex;
          background-color: #0066cc;
          color: white;
          padding: 0;
          position: relative;
          height: 60px;
          align-items: stretch;
          gap: 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .navItem {
          height: 100%;
          padding: 0 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.2s ease;
          position: relative;
          font-size: 14px;
          letter-spacing: 0.2px;
          white-space: nowrap;
          border-right: 1px solid rgba(255,255,255,0.1);
        }

        .navItem:hover {
          background-color: rgba(255,255,255,0.1);
        }

        .dropdown {
          position: relative;
          height: 100%;
          display: flex;
          align-items: stretch;
        }

        .dropdownContent {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: white;
          min-width: 220px;
          border-radius: 4px;
          margin-top: 1px;          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          z-index: 1000;
          animation: dropdownFade 0.2s ease-out;
          border: 1px solid #eee;
        }

        .dropdown:hover .dropdownContent {
          display: block;
        }

        .dropdownItem {
          padding: 12px 24px;
          color: #333;
          transition: all 0.15s ease-out;
          cursor: pointer;
          position: relative;
          font-size: 13px;
        }

        .dropdownItem:hover {
          background-color: #f8f9fa;
          color: #0066cc;
        }

        .active {
          background-color: #005bb8;
          position: relative;
        }

        .active::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #fff;
          transform-origin: bottom;
          animation: slideIn 0.3s ease-out forwards;
        }

        .navItem span {
          margin-left: 6px;
          font-size: 10px;
          opacity: 0.8;
        }

        .active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: white;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
