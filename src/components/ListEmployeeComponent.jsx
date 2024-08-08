import React, { useEffect, useState } from 'react'
import { logout, deleteEmployee, listEmployees } from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployee()
    }, [])
    function getAllEmployee() {
        listEmployees().then((response) => {
            setEmployees(response.data)
        }).catch(error => {
            console.error(error);
        })
    }
    function addNewEmployee() {
        navigator('/add-employee')
    }
    function updateEmployee(id) {
        navigator(`/update?id=${id}`)
    }
    function removeEmployee(id) {
        deleteEmployee(id).then((response) => {
            getAllEmployee()
        }).catch(error => {
            console.error(error)
        })
    }

    // Assuming you have the JWT token stored in a variable
    const token = localStorage.getItem('authToken');

    // Decode the token
    const decodedToken = jwtDecode(token);

    // Access specific data
    const roles = decodedToken.roles;

    return (

        <div className='container'>
            <h1 className='text-center'>List of Employees</h1>
            {roles[0] === 'ADMIN' && (
                <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            )}
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        {roles[0] === 'ADMIN' && (
                            <th>Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                {roles[0] === 'ADMIN' && (
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                        <button style={{ marginLeft: '5%' }} className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default ListEmployeeComponent