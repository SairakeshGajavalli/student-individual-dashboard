import React, { useState } from 'react';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { database } from '../firebase';
import { BookOpen } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

interface AttendanceRecord {
  name: string;
  SID: string;
  course: string;
  section: string;
  timings: string;
  timestamp: string;
}

export function StudentDashboard() {
  const [studentId, setStudentId] = useState('');
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentData = async (sid: string) => {
    if (!sid.trim()) {
      setError('Please enter a Student ID');
      return;
    }

    setLoading(true);
    setError(null);
    
    const attendanceRef = ref(database, 'student-details');
    const studentQuery = query(attendanceRef, orderByChild('SID'), equalTo(sid));
    
    onValue(studentQuery, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const records = Object.values(data) as AttendanceRecord[];
          setAttendanceData(records);
        } else {
          setAttendanceData([]);
          setError('No records found for this student ID');
        }
      } catch (err) {
        setError('Error fetching student data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    });
  };

  const courseAttendance = attendanceData.reduce((acc, record) => {
    if (!acc[record.course]) acc[record.course] = 0;
    acc[record.course]++;
    return acc;
  }, {} as Record<string, number>);

  const courseChartData = {
    labels: Object.keys(courseAttendance),
    datasets: [{
      data: Object.values(courseAttendance),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#47B39C'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20
        }
      },
      title: {
        display: true,
        font: {
          size: 16
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
        <div className="flex-1">
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
            Student ID
          </label>
          <input
            id="studentId"
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                fetchStudentData(studentId);
              }
            }}
          />
        </div>
        <button
          onClick={() => fetchStudentData(studentId)}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {attendanceData.length > 0 && (
        <div className="mx-auto max-w-2xl">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-blue-600" size={24} />
              <h3 className="text-lg font-semibold">Course Distribution</h3>
            </div>
            <div className="h-[500px]">
              <Pie 
                data={courseChartData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: `Total Courses: ${Object.keys(courseAttendance).length}`
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}