import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditSalary = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    currentsalaryallowence: "",
    presentallowence: "",
    Healthcareallowence: "",
    fuelallowence: "",
    otherallowence: "",
    deuction: "",
    absentleave: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/employee/${id}`)
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Result[0]);
        } else {
          console.log(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/edit_salary', { ...employee, id })
      .then(result => {
        if (result.data.Status) {
          toast.success('Salary updated successfully!');
          setTimeout(() => navigate('/auth/dashboard/employee'), 2000); // Navigate after 2 seconds
        } else {
          toast.error(`Error: ${result.data.Error}`);
        }
      })
      .catch(err => {
        console.error(err);
        toast.error('An error occurred while updating the salary.');
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Salary Allowence</h3>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form className="bg-light p-4 rounded" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col col-lg-6">
                <label htmlFor="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter Name" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} required />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputSalary" className="form-label">Current Salary</label>
                <input type="text" className="form-control" id="inputSalary" placeholder="Enter Current Salary" autoComplete="off" value={employee.currentsalaryallowence} onChange={(e) => setEmployee({ ...employee, currentsalaryallowence: e.target.value })} required />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputHealthcare" className="form-label">Healthcare Allowence</label>
                <input type="text" className="form-control" id="inputHealthcare" placeholder="Enter Healthcare" autoComplete="off" value={employee.Healthcareallowence} onChange={(e) => setEmployee({ ...employee, Healthcareallowence: e.target.value })} required />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputPresent" className="form-label">Present Allowence</label>
                <input type="text" className="form-control" id="inputPresent" placeholder="Enter Present" autoComplete="off" value={employee.presentallowence} onChange={(e) => setEmployee({ ...employee, presentallowence: e.target.value })} required />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputFuel" className="form-label">Fuel Allowence</label>
                <input type="text" className="form-control" id="inputFuel" placeholder="Enter Fuel" autoComplete="off" value={employee.fuelallowence} onChange={(e) => setEmployee({ ...employee, fuelallowence: e.target.value })} required />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputOther" className="form-label">Other</label>
                <input type="text" className="form-control" id="inputOther" placeholder="Enter other" autoComplete="off" value={employee.otherallowence} onChange={(e) => setEmployee({ ...employee, otherallowence: e.target.value })} required />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputDeduction" className="form-label">Deduction</label>
                <input type="text" className="form-control" id="inputDeduction" placeholder="Enter deduction" autoComplete="off" value={employee.deuction} onChange={(e) => setEmployee({ ...employee, deuction: e.target.value })} required />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputAbsent" className="form-label">Absent Leave</label>
                <input type="text" className="form-control" id="inputAbsent" placeholder="Enter Absent leave" autoComplete="off" value={employee.absentleave} onChange={(e) => setEmployee({ ...employee, absentleave: e.target.value })} required />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-primary w-100">Add Salary</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer /> {/* Toast container to show messages */}
    </div>
  );
};

export default EditSalary;
