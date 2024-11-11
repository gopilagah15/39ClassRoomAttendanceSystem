import React, { useState } from 'react';

const App = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', attendance: [] },
    { id: 2, name: 'Jane Smith', attendance: [] },
    { id: 3, name: 'Mike Johnson', attendance: [] },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const markAttendance = (studentId, status) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        const updatedAttendance = [...student.attendance, { date: selectedDate, status }];
        return { ...student, attendance: updatedAttendance };
      }
      return student;
    }));
  };

  const calculateAttendancePercentage = (student) => {
    const totalDays = student.attendance.length;
    const presentDays = student.attendance.filter(record => record.status === 'Present').length;
    return totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
  };

  return (
    <div>
      <h1>Classroom Attendance System</h1>

      <div>
        <h2>Mark Attendance</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {students.map(student => (
          <div key={student.id}>
            <span>{student.name}</span>
            <button onClick={() => markAttendance(student.id, 'Present')}>Present</button>
            <button onClick={() => markAttendance(student.id, 'Absent')}>Absent</button>
          </div>
        ))}
      </div>

      <h2>Attendance Report</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Attendance %</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{calculateAttendancePercentage(student)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
