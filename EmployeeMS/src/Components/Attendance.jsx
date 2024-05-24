import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttendanceTable = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [attendanceType, setAttendanceType] = useState('');

    // Fetch employees on component mount
    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    const updatedEmployees = result.data.Result.map(employee => ({
                        ...employee,
                        status: 'Present'
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

    // Handle select all checkbox
    const handleSelectAll = (status) => {
        const updatedEmployees = employees.map(employee => ({
            ...employee,
            status: status
        }));
        setEmployees(updatedEmployees);
    };

    // Save attendance data
    const saveAttendance = () => {
        if (!attendanceType) {
            toast.error('Please select attendance type.');
            return;
        }

        const attendanceData = employees.map(emp => ({
            employee_id: emp.id,
            status: emp.status,
            date: selectedDate.toISOString().split('T')[0],
            type: attendanceType
        }));

        axios.post('http://localhost:3000/auth/attendance', {
            date: selectedDate,
            attendance: attendanceData
        })
        .then(response => {
            console.log(response);
            if (response.data.Status) {
                toast.success('Attendance saved successfully!');
            } else {
                toast.error(`Error: ${response.data.Error}`);
            }
        })
        .catch(err => {
            console.error(err);
            toast.error('An error occurred while saving attendance.');
        });
    };

    return (
      
        <div className="container mt-5">
            <h2 className="mb-4">Attendance Table</h2>

            <div className="d-flex justify-content-between items-center">
                <div className='my-4'>
                    <p className='p-0 m-0'>Select date:</p>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="mt-2 p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className='mb-4'>
                    <label className="mb-2 d-block">Attendance Type: </label>
                    <div className="btn-group" role="group" aria-label="Attendance Type">
                        <button
                            type="button"
                            className={`btn btn-outline-primary ${attendanceType === 'Check In' ? 'active' : ''}`}
                            onClick={() => {
                                setAttendanceType('Check In');
                                handleSelectAll('Check In');
                            }}
                        >
                            Check In
                        </button>
                        <button
                            type="button"
                            className={`btn btn-outline-primary ${attendanceType === 'Check Out' ? 'active' : ''}`}
                            onClick={() => {
                                setAttendanceType('Check Out');
                                handleSelectAll('Check Out');
                            }}
                        >
                            Check Out
                        </button>
                    </div>
                </div>
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
            <ToastContainer />
        </div>
    );
};

export default AttendanceTable;