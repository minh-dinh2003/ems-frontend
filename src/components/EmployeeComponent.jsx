import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')


  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')


  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
      }).catch(errror => {
        console.error(error)
      })
    }
  }, [id])
  function backtoHome(){
    navigator('/employees')
  }
  function createOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      if(id){
        updateEmployee({id, firstName, lastName, email}).then((response)=>{
          console.log(response.data)
          navigator('/employees')
        }).catch(error =>{
          console.error(error)
        })
      }else{
        createEmployee({firstName, lastName, email}).then((response) => {
          console.log(response.data);
          navigator('/employees')
        }).catch(error=>{
          console.error(error)
        })
      }
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Update Employee</h2>
    } else {
      return <h2 className='text-center'>Add Employee</h2>
    }
  }
  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors }
    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }


    const emailRegex = /^(?!.*\.\.)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    if (email.trim() && emailRegex.test(email)) {
      errorsCopy.email = '';
    } else if (!email.trim()) {
      errorsCopy.email = 'Email is required';
      valid = false;
    } else {
      {
        errorsCopy.email = 'Please enter the right format';
        valid = false;
      }
    }
    setErrors(errorsCopy)
    return valid
  }


  return (
    <div className='container'>
      <br /><br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name</label>
                <input
                  type='text'
                  placeholder='Enter Employee First Name'
                  name='firstName' value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}></input>
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Last Name</label>
                <input type='text'
                  placeholder='Enter Employee Last Name'
                  name='lastName' value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}></input>
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Email</label>
                <input type='text'
                  placeholder='Enter Employee Email'
                  name='email' value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}></input>
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
              <button className='btn btn-success' onClick={createOrUpdateEmployee}>Submit</button>
              <button style={{marginLeft:'1%'}} className='btn btn-danger' onClick={backtoHome}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent