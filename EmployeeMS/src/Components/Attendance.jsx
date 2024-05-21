import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AttendanceTable = () => {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John Doe', status: 'Present' },
        { id: 2, name: 'Jane Smith', status: 'Absent' },
        { id: 3, name: 'Alice Johnson', status: 'Present' },
        // Add more employees as needed
    ]);

    const toggleStatus = (id) => {
        setEmployees(employees.map(employee => 
            employee.id === id ? { ...employee, status: employee.status === 'Present' ? 'Absent' : 'Present' } : employee
        ));
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Attendance Table</h2>
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
        </div>
    );
};

export default AttendanceTable;
