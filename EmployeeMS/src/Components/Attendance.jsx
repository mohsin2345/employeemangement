import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Attendance = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    date: '',
    month: '',
    checkIn: false,
    checkOut: false
  });

  const [errors, setErrors] = useState({
    month: false
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!formData.month) {
      setErrors({
        ...errors,
        month: true
      });
      return;
    }

    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Employee Attendance Sheet</h2>
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="employeeId" className="col-form-label">Employee ID</label>
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="employeeId"
                  placeholder="Enter Employee ID"
                  value={formData.employeeId}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="employeeName" className="col-form-label">Employee Name</label>
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  placeholder="Enter Employee Name"
                  value={formData.employeeName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="date" className="col-form-label">Date</label>
              </th>
              <td>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="month" className="col-form-label">Month</label>
              </th>
              <td>
                <select
                  className={`form-control ${errors.month ? 'is-invalid' : ''}`}
                  id="month"
                  value={formData.month}
                  onChange={handleChange}
                >
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                {errors.month && <div className="invalid-feedback">Please select a month.</div>}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="checkIn" className="col-form-label">Check-In</label>
              </th>
              <td>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="checkIn"
                    checked={formData.checkIn}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="checkIn">Check-In</label>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="checkOut" className="col-form-label">Check-Out</label>
              </th>
              <td>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="checkOut"
                    checked={formData.checkOut}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="checkOut">Check-Out</label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Attendance;
