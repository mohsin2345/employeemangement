import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    DOJ: "",
    address: "",
    category_id: "",
    image: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('DOJ', employee.DOJ);
    formData.append('image', employee.image);
    formData.append('category_id', employee.category_id);

    axios.post('http://localhost:3000/auth/add_employee', formData)
      .then(result => {
        if (result.data.Status) {
          toast.success('Employee added successfully!');
          setTimeout(() => navigate('/auth/dashboard/employee'), 2000); // Navigate after 2 seconds
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while adding the employee.');
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Add Employee</h3>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
            <div className="row mb-3">
              <div className="col-12 col-md-4">
                <label htmlFor="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter Name" onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" placeholder="Enter Email" autoComplete="off" onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="inputPassword4" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword4" placeholder="Enter Password" onChange={(e) => setEmployee({ ...employee, password: e.target.value })} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-md-4">
                <label htmlFor="inputSalary" className="form-label">Salary</label>
                <input type="text" className="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete="off" onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="inputDOJ" className="form-label">Date of Joining</label>
                <input type="date" className="form-control" id="inputDOJ" placeholder="Enter DOJ" onChange={(e) => setEmployee({ ...employee, DOJ: e.target.value })} />
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="inputAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete="off" onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="category" className="form-label">Category</label>
                <select name="category" id="category" className="form-select" onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                  {category.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="form-label" htmlFor="inputGroupFile01">Select Image</label>
                <input type="file" className="form-control" id="inputGroupFile01" name="image" onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary">Add Employee</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer /> {/* Toast container to show messages */}
    </div>
  );
};

export default AddEmployee;
