import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const SalarySlip = () => {
    const [empData, setEmpData] = useState(null);
    const { id } = useParams();
    const componentRef = useRef();

    useEffect(() => {
        axios.post('http://localhost:3000/auth/salary_slip', { id })
            .then(resp => {
                setEmpData(resp.data.Result[0]);
            }).catch(err => console.log(err))
    }, [id]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const calculateNetPay = () => {
        if (!empData) return 0;
        return (
            empData.current_salary +
            empData.fuel_allowance +
            empData.healthcare_allowance +
            empData.present_allowance +
            empData.other_allowance -
            empData.deuction
        );
    };

    return (
        <div className="container mt-5">
            <button onClick={handlePrint} className="btn btn-primary mb-3">Print Slip</button>
            {empData &&
                <div className="card print-this-card-only" ref={componentRef}>
                    <div className="card-header text-center">
                        <h3>Logic Racks</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>Employee Name:</strong> {empData.name}</p>
                                <p><strong>Employee ID:</strong> {id}</p>
                            </div>
                            <div className="col-md-6 text-right">
                                <p><strong>Date:</strong> {new Date().toLocaleString().split(",")[0]}</p>
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
                                    <td>{empData.current_salary}</td>
                                </tr>
                                <tr>
                                    <td>Fuel Allowance</td>
                                    <td>{empData.fuel_allowance}</td>
                                </tr>
                                <tr>
                                    <td>Health Allowance</td>
                                    <td>{empData.healthcare_allowance}</td>
                                </tr>
                                <tr>
                                    <td>Present Allowance</td>
                                    <td>{empData.present_allowance}</td>
                                </tr>
                                <tr>
                                    <td>Other Allowance</td>
                                    <td>{empData.other_allowance}</td>
                                </tr>
                                <tr>
                                    <td>Tax Deduction</td>
                                    <td>{empData.deuction}</td>
                                </tr>
                                <tr>
                                    <td><strong>Net Pay</strong></td>
                                    <td><strong>{calculateNetPay()}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-center">
                        <p>Thank you for your hard work!</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default SalarySlip;
