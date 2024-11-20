import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface FilterBarProps {
  onDateChange: (date: string) => void;
  onCourseChange: (course: string) => void;
  selectedDate: string;
  selectedCourse: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onDateChange,
  onCourseChange,
  selectedDate,
  selectedCourse,
}) => {
  const courses = [
    'All Courses',
    'Android',
    'Patterns',
    'GDP-1',
    'Java',
    'iOS',
    'Web Applications',
    'ADB',
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-2">
        <Calendar className="text-green-600" size={20} />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <Clock className="text-green-600" size={20} />
        <select
          value={selectedCourse}
          onChange={(e) => onCourseChange(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};