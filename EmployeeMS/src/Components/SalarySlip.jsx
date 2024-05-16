// src/Payslip.js
import React from 'react';

const SalarySlip = () => {
    const employeeDetails = {
        name: 'mohsin',
        employeeId: 'EMP12345',
        department: 'IT Department',
        salary: 5000,
        deductions: 500,
        netPay: 4500,
        date: 'May 2024'
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header text-center">
                    <h3>Payslip</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Employee Name:</strong> {employeeDetails.name}</p>
                            <p><strong>Employee ID:</strong> {employeeDetails.employeeId}</p>
                            <p><strong>Department:</strong> {employeeDetails.department}</p>
                        </div>
                        <div className="col-md-6 text-right">
                            <p><strong>Date:</strong> {employeeDetails.date}</p>
                        </div>
                    </div>
                    <table className="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Basic Salary</td>
                                <td>${employeeDetails.salary}</td>
                            </tr>
                            <tr>
                                <td>Deductions</td>
                                <td>${employeeDetails.deductions}</td>
                            </tr>
                            <tr>
                                <td><strong>Net Pay</strong></td>
                                <td><strong>${employeeDetails.netPay}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-footer text-center">
                    <p>Thank you for your hard work!</p>
                </div>
            </div>
        </div>
    );
};

export default SalarySlip;