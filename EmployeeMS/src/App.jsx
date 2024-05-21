
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { Routes, Route, BrowserRouter, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import Employeelogin from './Components/Employeelogin'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import SalarySection from './Components/SalarySection'
import EditSalary from './Components/EditSalary'
import SalarySlip from './Components/SalarySlip'
import Attendance from './Components/Attendance'




function App() {
 
 

  return (
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Start />}></Route>
    <Route path='/auth/adminlogin' element={<Login/>}></Route>
    <Route path='/employee_login' element={<Employeelogin/>}></Route>
    <Route path='/employee_detail/:id' element={<EmployeeDetail/>}></Route>
    <Route path='/auth/dashboard' element={
      <PrivateRoute>
    <Dashboard/>
    </PrivateRoute>
    }>
      <Route path='/auth/dashboard' element={<Home/>}></Route>
      <Route path='/auth/dashboard/employee' element={<Employee/>}></Route>
      <Route path='/auth/dashboard/category' element={<Category/>}></Route>
      <Route path='/auth/dashboard/profile' element={<Profile/>}></Route>
      <Route path='/auth/dashboard/add_category' element={<AddCategory/>}></Route>
      <Route path='/auth/dashboard/add_employee' element={<AddEmployee/>}></Route>
      <Route path='/auth/dashboard/edit_employee/:id' element={<EditEmployee/>}></Route>
      <Route path='/auth/dashboard/edit_salary/:id' element={<EditSalary/>}></Route>
      <Route path='/auth/dashboard/salary_slip/:id' element={<SalarySlip/>}></Route>
      <Route path='/auth/dashboard/attendance' element={<Attendance/>}></Route>




      <Route path='/auth/dashboard/manage_salary' element={<SalarySection/>}></Route>






    </Route>

   </Routes>
   </BrowserRouter>
  )
}

export default App
