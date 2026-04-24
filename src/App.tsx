/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AttendancePage from './pages/AttendancePage';
import ExamPage from './pages/ExamPage';
import ExamResultPage from './pages/ExamResultPage';
import UserManagement from './pages/admin/UserManagement';
import StudentManagement from './pages/admin/StudentManagement';
import AttendanceRecap from './pages/recap/AttendanceRecap';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { User, Role } from './types';

// Mock Auth Context type logic
function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check for "remembered" user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsReady(true);
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (!isReady) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        
        {/* App Layout for authenticated users */}
        <Route 
          path="/app/*" 
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route path="/" element={<Dashboard user={user} />} />
                  <Route path="/attendance-staff" element={<AttendancePage user={user} type="staff" />} />
                  <Route path="/attendance-student" element={<AttendancePage user={user} type="student" />} />
                  <Route path="/exam" element={user.role === 'siswa' ? <ExamPage user={user} /> : <Navigate to="/app" />} />
                  <Route path="/exam-results" element={<ExamResultPage user={user} />} />
                  
                  {/* Admin Only */}
                  <Route path="/admin/users" element={user.role === 'admin' ? <UserManagement /> : <Navigate to="/app" />} />
                  <Route path="/admin/students" element={user.role === 'admin' ? <StudentManagement /> : <Navigate to="/app" />} />
                  
                  {/* Recap */}
                  <Route path="/recap" element={['admin', 'guru'].includes(user.role) ? <AttendanceRecap user={user} /> : <Navigate to="/app" />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

function Layout({ children, user, onLogout }: { children: React.ReactNode, user: User, onLogout: () => void }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar role={user.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default App;

