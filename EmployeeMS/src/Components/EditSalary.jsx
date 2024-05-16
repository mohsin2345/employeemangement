import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditSalary = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState({
    name: "",
    currentsalaryallowence: "",
    salary: "",
    presentallowence: "",
    Healthcareallowence: "",
    fuelallowence:"",
    otherallowence: "",

  });

  const [category, setCategory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          console.log(result.data.Error)
        }
      }).catch(err => console.log(err))

  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee/' + id)
      .then(result => {
        console.log(result);
        // Parse received date into "YYYY-MM-DD" forma
        const parsedDate = receivedDate.split("-").map((part, index) => index === 0 ? part.padStart(4, "0") : part.padStart(2, "0")).join("-");
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
        })
      }).catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:3000/auth/edit_salary`, { ...employee, id })
      .then(result => {
        if (result.data.Status) {
          navigate('/auth/dashboard/employee')
        } else {
          console.log(result.data.Error)
        }
      }).catch(err => console.log(err))
  }

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Salary Allowence</h3>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form className="bg-light p-4 rounded" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col col-lg-6">
                <label htmlFor="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter Name" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputSalary" className="form-label">Current Salary</label>
                <input type="text" className="form-control" id="inputSalary" placeholder="Enter Current Salary" autoComplete="off" value={employee.salary} onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputSalary" className="form-label">Healthcare Allowence </label>
                <input type="text" className="form-control" id="inputSalary" placeholder="Enter Healthcare" autoComplete="off" value={employee.Healthcareallowence} onChange={(e) => setEmployee({ ...employee, Healthcareallowence: e.target.value })} />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputSalary" className="form-label">Present Allowence</label>
                <input type="text" className="form-control" id="inputSalary" placeholder="Enter Present" autoComplete="off" value={employee.presentallowence} onChange={(e) => setEmployee({ ...employee, presentallowence: e.target.value })} />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputSalary" className="form-label">Fuel Allowence</label>
                <input type="text" className="form-control" id="inputSalary" placeholder="Enter Fuel" autoComplete="off" value={employee.fuelallowence} onChange={(e) => setEmployee({ ...employee, fuelallowence: e.target.value })} />
              </div>
              <div className="col col-lg-6">
                <label htmlFor="inputSalary" className="form-label">Other</label>
                <input type="text" className="form-control" id="inputSalary" placeholder="Enter other" autoComplete="off" value={employee.otherallowence} onChange={(e) => setEmployee({ ...employee, otherallowence: e.target.value })} />
              </div>

            </div>

            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-primary w-100">  Add Salary</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditSalary
