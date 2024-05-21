import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';

const AttendanceTable = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Fetch employees on component mount
    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    const updatedEmployees = result.data.Result.map(employee => ({
                        ...employee,
                        status: 'Present' // Default status
                    }));
                    setEmployees(updatedEmployees);
                } else {
                    console.log(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    // Toggle attendance status
    const toggleStatus = (id) => {
        const updatedEmployees = employees.map(employee =>
            employee.id === id ? { ...employee, status: employee.status === 'Present' ? 'Absent' : 'Present' } : employee
        );
        setEmployees(updatedEmployees);
    };

    // Save attendance data
    const saveAttendance = () => {
        const attendanceData = employees.map(emp => ({
            employee_id: emp.id,
            status: emp.status,
            date: selectedDate.toISOString().split('T')[0]
        }));

        console.log(attendanceData);

        axios.post('http://localhost:3000/auth/attendance', {
            date: selectedDate,
            attendance: attendanceData
        })
        .then(response => {
            console.log(response);
            if (response.data.Status) {
                console.log('Attendance saved successfully!');
            } else {
                console.log(response.data.Error);
            }
        })
        .catch(err => {
            console.error(err);
            console.log('An error occurred while saving attendance.');
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Attendance Table</h2>
            <div className='my-4'>
                <p className='p-0 m-0'>Select date:</p>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                />
            </div>
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Status</th>
                        <th>Toggle Status</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.status}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={employee.status === 'Present'}
                                    onChange={() => toggleStatus(employee.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary mt-4" onClick={saveAttendance}>
                Save Attendance
            </button>
        </div>
    );
};

export default AttendanceTable;
