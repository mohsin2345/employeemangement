import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3000/employee/detail/${id}`)
        .then(result => {
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
        .then(result => {
            if(result.data.Status) {
                localStorage.removeItem("valid")
                navigate('/')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 p-2 d-flex justify-content-center shadow">
                    <h4>Employee Management System</h4>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12 d-flex justify-content-center align-items-center flex-column">
                    <img src={`http://localhost:3000/Images/${employee.image}`} alt="Employee" style={{ width: '300px', height: '300px' }} className="emp_det_image" />
                    <div className="mt-5">
                        <h3>Name: {employee.name}</h3>
                        <h3>Email: {employee.email}</h3>
                        <h3>Salary: ${employee.salary}</h3>
                    </div>
                    <div>
                        <button className="btn btn-primary me-2">Edit</button>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetail
