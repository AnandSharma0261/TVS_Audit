'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Navbar from './components/Navbar';
import DashboardData from './components/DashboardData';
import { isAuthenticated } from './utils/auth';

export default function DashboardPage() {
  const router = useRouter();
  // State for the department dropdown
  const [department, setDepartment] = useState('SALES');
  // State for active view
  const [activeView, setActiveView] = useState('Dashboard');

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="container">
      <Header department={department} setDepartment={setDepartment} />
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      <main className="main">
        <DashboardData viewType={activeView} department={department} />
      </main>

      <style jsx>{`
        .container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f8f8f8;
          font-family: Arial, sans-serif;
        }

        .main {
          flex: 1;
          padding: 0;
          background-color: #f8f8f8;
        }

        @media (max-width: 768px) {
          .main {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}