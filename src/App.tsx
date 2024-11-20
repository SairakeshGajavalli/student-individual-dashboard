import React from 'react';
import { GraduationCap } from 'lucide-react';
import { StudentDashboard } from './pages/StudentDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-green-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">Student Attendance Analytics</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <StudentDashboard />
      </main>
    </div>
  );
}

export default App;