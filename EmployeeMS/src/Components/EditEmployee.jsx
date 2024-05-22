import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
    DOJ: "",
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          toast.error(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee/' + id)
      .then(result => {
        console.log(result);
        // Parse received date into "YYYY-MM-DD" format
        const receivedDate = result.data.Result[0].DOJ;
        const parsedDate = receivedDate.split("-").map((part, index) => index === 0 ? part.padStart(4, "0") : part.padStart(2, "0")).join("-");
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          DOJ: parsedDate, // set parsed date here
          category_id: result.data.Result[0].category_id,
        });
      }).catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/auth/edit_employee/${id}`, employee)
      .then(result => {
        if (result.data.Status) {
          toast.success('Employee updated successfully!');
          setTimeout(() => navigate('/auth/dashboard/employee'), 2000); // Navigate after 2 seconds
        } else {
          toast.error(result.data.Error);
        }
      }).catch(err => {
        console.log(err);
        toast.error('An error occurred while updating the employee.');
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Edit Employee</h3>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form className="bg-light p-4 rounded" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter Name" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
              </div>
              <div className="col">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" placeholder="Enter Email" autoComplete="off" value={employee.email} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
              </div>
              <div className="col">
                <label htmlFor="inputSalary" className="form-label">Salary</label>
                <input type="text" className="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete="off" value={employee.salary} onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
              </div>
              <div className="col">
                <label htmlFor="inputDOJ" className="form-label">Date Of Joning</label>
                <input type="date" className="form-control" id="inputDOJ" placeholder="Enter DOJ" autoComplete="off" value={employee.DOJ} onChange={(e) => setEmployee({ ...employee, DOJ: e.target.value })} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="inputAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete="off" value={employee.address} onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
              </div>
              <div className="col">
                <label htmlFor="category" className="form-label">Category</label>
                <select name="category" id="category" className="form-select" value={employee.category_id} onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                  {category.map((c) => {
                    return <option key={c.id} value={c.id}>{c.name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-primary w-100">Edit Employee</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer /> {/* Toast container to show messages */}
    </div>
  );
};

export default EditEmployee;
