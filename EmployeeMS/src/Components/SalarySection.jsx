
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const SalarySection = () => {

  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        console.log(result);
        if (result.data.Status) {
          setEmployee(result.data.Result);

        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/' + id)
      .then(result => {

        if (result.data.Status) {
          window.location.reload()

        } else {
          alert(result.data.Error)
        }
      })
  }

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Salary Manage</h3>
      </div>


      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              {/* <th>Address</th>
              <th>Salary</th>
              <th>Date</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map(e => (
                <tr>
                  <td>{e.name}</td>
                  <td><img src={'http://localhost:3000/Images/' + e.image} className="employee_image" /></td>
                  <td>{e.email}</td>
                  {/* <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>{e.DOJ.split("T")[0]}</td> */}
                  <td>
                    <Link to={`/auth/dashboard/edit_salary/${e.id}`} className="btn btn-info btn-sm me-2">Add Salary</Link>
                    <Link to={`/auth/dashboard/salary_slip/${e.id}`} className="btn btn-info btn-sm me-2">Salary Slip</  Link>

                    {/* <button className="btn btn-warning btn-sm" onClick={()=>handleDelete(e.id)}>Delete</button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalarySection;